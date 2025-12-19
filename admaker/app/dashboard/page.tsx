'use client';

import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import ScriptEditor from '@/components/dashboard/ScriptEditor';
import VideoSettings from '@/components/dashboard/VideoSettings';
import CustomUploads from '@/components/dashboard/CustomUploads';
import AIActorSelector from '@/components/dashboard/AIActorSelector';
import VideoGenerationLoader from '@/components/dashboard/VideoGenerationLoader';
import { AIActor } from '@/lib/types/veo';
import { generateVideoWithDuration, veoClient } from '@/lib/api/veo';
import { getMediaUrl } from '@/lib/cloudflare-config';
import { saveVideo, getUserVideos } from '@/lib/api/videos';
import { createClient } from '@/lib/supabase/client';

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('create');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Video generation state
    const [selectedActor, setSelectedActor] = useState<AIActor | null>(null);
    const [script, setScript] = useState('');
    const [sceneDescription, setSceneDescription] = useState('');
    const [productImageUrl, setProductImageUrl] = useState<string | null>(null);
    const [virtualTryOnImageUrl, setVirtualTryOnImageUrl] = useState<string | null>(null);
    const [format, setFormat] = useState<'16:9' | '9:16'>('16:9');
    const [duration, setDuration] = useState<8 | 16>(8);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
    const [credits, setCredits] = useState(10);
    const [actorCredits, setActorCredits] = useState(10); // AI Actor credits
    const [showCreditsModal, setShowCreditsModal] = useState(false);
    const [showCreateActorModal, setShowCreateActorModal] = useState(false);
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [actorReferenceImage, setActorReferenceImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [videoHistory, setVideoHistory] = useState<any[]>([]);
    const [isLoadingVideos, setIsLoadingVideos] = useState(false);
    const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);

    // Custom Actor creation state
    const [customActors, setCustomActors] = useState<any[]>([]);
    const [actorName, setActorName] = useState('');
    const [actorPrompt, setActorPrompt] = useState('');
    const [actorAspectRatio, setActorAspectRatio] = useState<'1:1' | '9:16' | '16:9'>('9:16'); // Default to mobile format
    const [personImage, setPersonImage] = useState<File | null>(null);
    const [objectImage, setObjectImage] = useState<File | null>(null);
    const [decorImage, setDecorImage] = useState<File | null>(null);
    const [personImagePreview, setPersonImagePreview] = useState<string | null>(null);
    const [objectImagePreview, setObjectImagePreview] = useState<string | null>(null);
    const [decorImagePreview, setDecorImagePreview] = useState<string | null>(null);
    const [isCreatingActor, setIsCreatingActor] = useState(false);
    const [actorCreationError, setActorCreationError] = useState<string | null>(null);
    const [viewActorImageUrl, setViewActorImageUrl] = useState<string | null>(null); // For viewing actor in modal

    // Load video history and custom actors from Supabase on mount
    useEffect(() => {
        const loadData = async () => {
            const videos = await getUserVideos(20);
            setVideoHistory(videos);

            // Load custom actors
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: actors } = await supabase
                    .from('custom_actors')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });
                if (actors) {
                    setCustomActors(actors);
                }
            }
        };
        loadData();
    }, []);

    // Save video to history (Supabase)
    const saveVideoToHistory = async (video: any) => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            console.error('No user found, cannot save video');
            return;
        }

        // Save to Supabase
        const savedVideo = await saveVideo({
            user_id: user.id,
            task_id: video.id,
            video_url: video.videoUrl,
            actor_name: video.actorName,
            actor_image_url: video.actorImage,
            script: video.script,
            scene_description: sceneDescription,
            duration: video.duration,
            format: video.format,
            status: 'completed',
        });

        if (savedVideo) {
            // Update local state
            const newHistory = [savedVideo, ...videoHistory].slice(0, 20);
            setVideoHistory(newHistory);
        }
    };

    const getCreditCost = () => {
        // Credits based only on duration
        return duration === 8 ? 20 : 40;
    };

    const handleActorImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'person' | 'object' | 'decor') => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setActorCreationError('Please upload an image file');
                return;
            }

            // Validate file size (max 30MB as per Nano Banana spec)
            if (file.size > 30 * 1024 * 1024) {
                setActorCreationError('Image size must be less than 30MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const preview = reader.result as string;
                if (type === 'person') {
                    setPersonImage(file);
                    setPersonImagePreview(preview);
                } else if (type === 'object') {
                    setObjectImage(file);
                    setObjectImagePreview(preview);
                } else if (type === 'decor') {
                    setDecorImage(file);
                    setDecorImagePreview(preview);
                }
                setActorCreationError(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateActor = async () => {
        try {
            setActorCreationError(null);

            // Validate inputs
            if (!personImage) {
                setActorCreationError('Please upload a person image');
                return;
            }

            if (!actorPrompt.trim()) {
                setActorCreationError('Please provide a description');
                return;
            }

            // Check credits
            if (actorCredits < 1) {
                setActorCreationError('Insufficient AI Actor credits');
                return;
            }

            setIsCreatingActor(true);

            // Get user
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                throw new Error('Not authenticated');
            }

            // Upload reference images to temporary storage (we'll use base64 for now)
            // In production, you might want to upload to R2 first
            const personImageUrl = personImagePreview;
            const objectImageUrl = objectImagePreview;
            const decorImageUrl = decorImagePreview;

            // Call create actor API
            const response = await fetch('/api/kie/nano-banana/create-actor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    actorName: actorName || 'Custom Actor',
                    prompt: actorPrompt,
                    personImageUrl,
                    objectImageUrl,
                    decorImageUrl,
                    aspectRatio: actorAspectRatio,
                    resolution: '1K'
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ API Error:', errorText);
                try {
                    const error = JSON.parse(errorText);
                    throw new Error(error.error || 'Failed to create actor');
                } catch (e) {
                    throw new Error(`Failed to create actor: ${response.status} ${response.statusText}`);
                }
            }

            const responseData = await response.json();
            console.log('📦 API Response:', responseData);

            if (!responseData || !responseData.taskId) {
                console.error('❌ Invalid response:', responseData);
                throw new Error('Invalid response from server: missing taskId');
            }

            const taskId = responseData.taskId;
            console.log('🍌 Actor generation started:', taskId);

            // Deduct credits
            setActorCredits(prev => prev - 1);

            // Poll for completion (or wait for webhook)
            // Nano Banana can take 2-5 minutes, so we poll for up to 5 minutes
            let attempts = 0;
            const maxAttempts = 300; // 300 seconds = 5 minutes

            const pollStatus = async () => {
                if (attempts >= maxAttempts) {
                    console.log('⏱️ Polling timeout reached after 5 minutes');
                    setIsCreatingActor(false);
                    setActorCreationError('Generation is taking longer than expected. The actor will appear in "My Actors" when ready (usually within 5-10 minutes).');

                    // Close modal and switch to actors tab so user can see when it appears
                    setShowCreateActorModal(false);
                    setActiveTab('actors');
                    return;
                }

                attempts++;

                const statusResponse = await fetch(`/api/kie/nano-banana/check-status?taskId=${taskId}`);
                const statusData = await statusResponse.json();

                if (statusData.state === 'success' && statusData.imageUrl) {
                    console.log('✅ Actor created successfully!');
                    console.log('📸 Image URL:', statusData.imageUrl);

                    // Save actor directly to custom_actors table (in case webhook didn't fire)
                    console.log('💾 Saving actor to database...');
                    const { error: saveError } = await supabase
                        .from('custom_actors')
                        .insert({
                            user_id: user.id,
                            name: actorName || 'Custom Actor',
                            description: actorPrompt || '',
                            reference_image_url: statusData.imageUrl,
                            metadata: {
                                task_id: taskId,
                                prompt: actorPrompt,
                                image_url: statusData.imageUrl,
                                person_reference_url: personImagePreview,
                                object_reference_url: objectImagePreview,
                                decor_reference_url: decorImagePreview,
                                aspect_ratio: actorAspectRatio,
                                resolution: '1K',
                                generated_at: new Date().toISOString()
                            }
                        });

                    if (saveError) {
                        console.error('❌ Error saving actor:', saveError);
                        // Check if it's a duplicate key error
                        if (saveError.code === '23505') {
                            console.log('⚠️ Actor was already saved (race condition with webhook)');
                        } else {
                            setActorCreationError('Failed to save actor: ' + saveError.message);
                            setIsCreatingActor(false);
                            return;
                        }
                    } else {
                        console.log('💾 Actor saved to database successfully');
                    }

                    // Reload custom actors
                    const { data: actors } = await supabase
                        .from('custom_actors')
                        .select('*')
                        .eq('user_id', user.id)
                        .order('created_at', { ascending: false });
                    if (actors) {
                        setCustomActors(actors);
                    }

                    setIsCreatingActor(false);
                    setShowCreateActorModal(false);

                    // Reset form
                    setActorName('');
                    setActorPrompt('');
                    setActorAspectRatio('9:16');
                    setPersonImage(null);
                    setObjectImage(null);
                    setDecorImage(null);
                    setPersonImagePreview(null);
                    setObjectImagePreview(null);
                    setDecorImagePreview(null);

                    // Switch to actors tab
                    setActiveTab('actors');

                } else if (statusData.state === 'fail') {
                    setIsCreatingActor(false);
                    setActorCreationError(statusData.failMsg || 'Generation failed');
                } else {
                    // Still waiting, poll again in 1 second
                    setTimeout(pollStatus, 1000);
                }
            };

            // Start polling after 2 seconds
            setTimeout(pollStatus, 2000);

        } catch (error: any) {
            console.error('❌ Error creating actor:', error);
            setActorCreationError(error.message || 'Failed to create actor');
            setIsCreatingActor(false);
        }
    };

    const handleGenerateVideo = async () => {
        if (!selectedActor) {
            setError('Please select an AI actor first');
            return;
        }

        if (!script.trim()) {
            setError('Please describe your video and script');
            return;
        }

        // Parse the combined script to extract script and scene description
        // Expected format: "Script: ... \n\nScene: ..."
        let actualScript = script;
        let actualScene = sceneDescription || 'Professional video presentation';

        // Try to parse if user followed the format
        const scriptMatch = script.match(/Script:\s*([^]*?)(?=\n\nScene:|$)/i);
        const sceneMatch = script.match(/Scene:\s*([^]*)$/i);

        if (scriptMatch && scriptMatch[1]) {
            actualScript = scriptMatch[1].trim();
        }
        if (sceneMatch && sceneMatch[1]) {
            actualScene = sceneMatch[1].trim();
        }

        // If no explicit format, use the whole text as script and default scene
        if (!scriptMatch && !sceneMatch) {
            actualScript = script.trim();
        }

        const cost = getCreditCost();
        if (credits < cost) {
            setShowCreditsModal(true);
            return;
        }

        setIsGenerating(true);
        setError(null);
        setGeneratedVideo(null);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            // Require authentication
            if (!user) {
                setError('You must be logged in to generate videos');
                setIsGenerating(false);
                return;
            }

            const userId = user.id;

            // Call Veo API (simplified - only returns taskId)
            const result = await generateVideoWithDuration(
                selectedActor.imageUrl,
                actualScript,
                actualScene,
                format,
                duration,
                productImageUrl || undefined,
                virtualTryOnImageUrl || undefined
            );

            console.log('✅ Video generation started, taskId:', result.taskId);

            // Store metadata for webhook
            try {
                await fetch('/api/veo/store-metadata', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        taskId: result.taskId,
                        userId: userId,
                        actorName: selectedActor.name,
                        actorImageUrl: selectedActor.thumbnailUrl,
                        script: actualScript,
                        sceneDescription: actualScene,
                        duration,
                        format
                    })
                });
            } catch (metaErr) {
                console.error('❌ Metadata storage error:', metaErr);
            }

            // Deduct credits immediately
            setCredits(prev => prev - cost);

            // Show success message and switch to Video History
            setError(null);
            setIsGenerating(false);

            // Switch to Video History tab
            setActiveTab('history');

            // Show success notification
            setShowSuccessNotification(true);

            // Auto-hide notification after 5 seconds
            setTimeout(() => {
                setShowSuccessNotification(false);
            }, 5000);

            // Reload videos after 2 minutes to catch the new video
            setTimeout(async () => {
                const videos = await getUserVideos(20);
                setVideoHistory(videos);
            }, 120000); // 2 minutes

            console.log('💡 Video will appear in history in 1-3 minutes');

        } catch (err: any) {
            console.error('❌ Generation error:', err);
            setError(err.message || 'Failed to start video generation');
            setIsGenerating(false);
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            {/* Video Modal */}
            {videoModalUrl && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.95)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                    onClick={() => setVideoModalUrl(null)}
                >
                    <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
                        <button
                            onClick={() => setVideoModalUrl(null)}
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '0',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: 'none',
                                color: 'white',
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                fontSize: '20px'
                            }}
                        >
                            ×
                        </button>
                        <video
                            src={videoModalUrl}
                            controls
                            autoPlay
                            style={{
                                maxWidth: '100%',
                                maxHeight: '90vh',
                                borderRadius: '12px'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}

            {/* Sidebar Overlay */}
            <div
                className={`${styles.sidebarOverlay} ${sidebarOpen ? styles.open : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
                <div className={styles.sidebarHeader}>
                    <a href="/" className={styles.logo}>
                        <img src={getMediaUrl('logo.png')} alt="AdMaker AI" />
                    </a>
                </div>

                <nav className={styles.sidebarNav}>
                    <button
                        className={`${styles.navItem} ${activeTab === 'create' ? styles.active : ''}`}
                        onClick={() => setActiveTab('create')}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Create Video
                    </button>

                    <button
                        className={`${styles.navItem} ${activeTab === 'history' ? styles.active : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" stroke="currentColor" strokeWidth="2" />
                            <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Video History
                    </button>

                    <button
                        className={`${styles.navItem} ${activeTab === 'actors' ? styles.active : ''}`}
                        onClick={() => setActiveTab('actors')}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 10a3 3 0 100-6 3 3 0 000 6zM4 18a6 6 0 0112 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        My Actors
                    </button>

                    <button
                        className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="2" />
                            <path d="M16 10a6 6 0 11-12 0 6 6 0 0112 0z" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        Settings
                    </button>

                    <a href="/#pricing" className={`${styles.navItem} ${styles.upgradeItem}`}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" fill="currentColor" />
                        </svg>
                        Upgrade Plan
                    </a>
                </nav>

                <div className={styles.creditsDisplay}>
                    <div className={styles.creditItem}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" fill="currentColor" />
                        </svg>
                        <div>
                            <span className={styles.creditsLabel}>Video Credits</span>
                            <span className={styles.creditsValue}>{credits}</span>
                        </div>
                    </div>
                    <div className={styles.creditItem}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 10a3 3 0 100-6 3 3 0 000 6zM4 18a6 6 0 0112 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <div>
                            <span className={styles.creditsLabel}>AI Actor Credits</span>
                            <span className={styles.creditsValue}>{actorCredits}</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Menu Toggle */}
            <button
                className={styles.mobileMenuBtn}
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {activeTab === 'create' && (
                    <div className={styles.createSection}>
                        <h1 className={styles.pageTitle}>Create Your Video</h1>
                        <p className={styles.pageSubtitle}>
                            Select an AI actor, add your script, and generate professional videos in seconds
                        </p>

                        {/* AI Actor Selection */}
                        <AIActorSelector onActorSelect={setSelectedActor} customActors={customActors} />

                        {/* Show rest of form only if actor is selected */}
                        {selectedActor && (
                            <>
                                {/* Script Editor */}
                                <div data-next-section>
                                    <ScriptEditor
                                        showSceneDescription={true}
                                        duration={duration}
                                        onScriptChange={setScript}
                                        onSceneChange={setSceneDescription}
                                    />
                                </div>

                                {/* Optional Product and Virtual Try-On Images */}
                                <CustomUploads
                                    onProductImageChange={setProductImageUrl}
                                    onVirtualTryOnImageChange={setVirtualTryOnImageUrl}
                                />

                                {/* Video Settings */}
                                <VideoSettings
                                    format={format}
                                    duration={duration}
                                    onFormatChange={setFormat}
                                    onDurationChange={setDuration}
                                />

                                {/* Error Display */}
                                {error && (
                                    <div className={styles.errorBox}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
                                            <path d="M10 6v4M10 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                        <span>{error}</span>
                                    </div>
                                )}

                                {/* Generate Button */}
                                <div className={styles.generateSection}>
                                    <button
                                        className={styles.generateBtn}
                                        onClick={handleGenerateVideo}
                                        disabled={isGenerating}
                                    >
                                        {isGenerating ? (
                                            <>
                                                <div className={styles.spinner}></div>
                                                Generating {duration}s video...
                                            </>
                                        ) : (
                                            <>
                                                Generate Video
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M5 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Video Result */}
                        {generatedVideo && (
                            <div className={styles.videoResult}>
                                <h3 className={styles.resultTitle}>Your Video is Ready!</h3>
                                <div className={styles.videoPlayer}>
                                    <video controls className={styles.video}>
                                        <source src={generatedVideo} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <div className={styles.resultActions}>
                                    <a
                                        href={generatedVideo}
                                        download="admaker-video.mp4"
                                        className={styles.downloadBtn}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 3v10m0 0l-4-4m4 4l4-4M3 17h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Download
                                    </a>
                                    <button className={styles.shareBtn}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M15 7a3 3 0 100-6 3 3 0 000 6zM5 13a3 3 0 100-6 3 3 0 000 6zM15 19a3 3 0 100-6 3 3 0 000 6zM6.5 11.5l7-3M6.5 14.5l7 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Share
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className={styles.historySection}>
                        <h1 className={styles.pageTitle}>Video History</h1>

                        {/* Generation in Progress Indicator */}
                        {isGenerating && (
                            <div style={{
                                padding: '16px 20px',
                                background: 'linear-gradient(135deg, rgba(255, 8, 68, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 8, 68, 0.3)',
                                marginBottom: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    border: '3px solid rgba(255, 8, 68, 0.3)',
                                    borderTop: '3px solid #ff0844',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#e5e7eb', marginBottom: '4px' }}>
                                        Génération en cours...
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                                        Votre vidéo sera prête dans 1-2 minutes et apparaîtra automatiquement ici
                                    </div>
                                </div>
                            </div>
                        )}

                        {videoHistory.length === 0 ? (
                            <div className={styles.emptyState}>
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                    <path d="M32 56a24 24 0 100-48 24 24 0 000 48z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M26 28l12 8-12 8V28z" fill="currentColor" />
                                </svg>
                                <h3>No videos yet</h3>
                                <p>Create your first video to see it here</p>
                            </div>
                        ) : (
                            <div className={styles.videoGrid}>
                                {videoHistory.map((video) => {
                                    // Calculate days until expiration
                                    const expiresAt = video.expires_at ? new Date(video.expires_at) : null;
                                    const now = new Date();
                                    const daysUntilExpiration = expiresAt
                                        ? Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                                        : null;
                                    const isExpiringSoon = daysUntilExpiration !== null && daysUntilExpiration <= 7;
                                    const isExpired = daysUntilExpiration !== null && daysUntilExpiration <= 0;

                                    return (
                                        <div key={video.id} className={styles.videoCard}>
                                            <div className={styles.videoThumbnail}>
                                                {/* Video Preview - Clearer Image */}
                                                <div style={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '12px',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer'
                                                }}
                                                    onClick={() => setVideoModalUrl(video.video_url)}
                                                >
                                                    {/* Actor Image - Less Blur, More Visible */}
                                                    <img
                                                        src={video.actor_image_url}
                                                        alt={video.actor_name}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover'
                                                        }}
                                                    />

                                                    {/* Dark Overlay for Better Contrast */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)'
                                                    }} />

                                                    {/* Play Button */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        zIndex: 2,
                                                        width: '64px',
                                                        height: '64px',
                                                        borderRadius: '50%',
                                                        background: 'rgba(255, 8, 68, 0.9)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 4px 16px rgba(255, 8, 68, 0.4)',
                                                        transition: 'transform 0.2s ease, background 0.2s ease'
                                                    }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
                                                            e.currentTarget.style.background = 'rgba(255, 8, 68, 1)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                                                            e.currentTarget.style.background = 'rgba(255, 8, 68, 0.9)';
                                                        }}
                                                    >
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                            <path d="M8 5l13 7-13 7V5z" fill="white" />
                                                        </svg>
                                                    </div>

                                                    {/* Expiration Badge */}
                                                    {isExpired && (
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '12px',
                                                            right: '12px',
                                                            padding: '6px 12px',
                                                            background: '#ef4444',
                                                            borderRadius: '6px',
                                                            fontSize: '12px',
                                                            fontWeight: 600,
                                                            color: 'white',
                                                            zIndex: 3
                                                        }}>
                                                            Expired
                                                        </div>
                                                    )}
                                                    {!isExpired && isExpiringSoon && (
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '12px',
                                                            right: '12px',
                                                            padding: '6px 12px',
                                                            background: '#f59e0b',
                                                            borderRadius: '6px',
                                                            fontSize: '12px',
                                                            fontWeight: 600,
                                                            color: 'white',
                                                            zIndex: 3
                                                        }}>
                                                            {daysUntilExpiration}d left
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Video Info - Simplified */}
                                            <div className={styles.videoInfo}>
                                                <p className={styles.videoScript} style={{
                                                    fontSize: '14px',
                                                    lineHeight: '1.5',
                                                    marginBottom: '8px',
                                                    color: '#e5e7eb'
                                                }}>
                                                    {video.script}
                                                </p>

                                                {/* Expiration Date */}
                                                {expiresAt && (
                                                    <div style={{
                                                        fontSize: '12px',
                                                        color: '#9ca3af',
                                                        marginBottom: '12px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}>
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                                                            <path d="M7 3v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        </svg>
                                                        Expires {expiresAt.toLocaleDateString()}
                                                    </div>
                                                )}

                                                {/* Action Buttons */}
                                                <div className={styles.videoActions}>
                                                    <button
                                                        onClick={() => setVideoModalUrl(video.video_url)}
                                                        className={styles.viewBtn}
                                                        disabled={isExpired}
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M8 3C4.5 3 1.7 5.3 1 8c.7 2.7 3.5 5 7 5s6.3-2.3 7-5c-.7-2.7-3.5-5-7-5z" stroke="currentColor" strokeWidth="2" />
                                                            <circle cx="8" cy="8" r="2" fill="currentColor" />
                                                        </svg>
                                                        View
                                                    </button>
                                                    <a
                                                        href={video.video_url}
                                                        download={`video-${video.task_id}.mp4`}
                                                        className={styles.downloadBtn}
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M8 2v8m0 0l-3-3m3 3l3-3M2 14h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                        </svg>
                                                        Download
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {
                    activeTab === 'actors' && (
                        <div className={styles.actorsSection}>
                            <div className={styles.actorsHeader}>
                                <div>
                                    <h1 className={styles.pageTitle}>My Actors</h1>
                                    <p className={styles.pageSubtitle}>
                                        Create custom AI actors with your own images and settings
                                    </p>
                                </div>
                                <div className={styles.actorCreditsInfo}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 10a3 3 0 100-6 3 3 0 000 6zM4 18a6 6 0 0112 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <span>{actorCredits} AI Actor Credits Remaining</span>
                                </div>
                                <button
                                    className={styles.createActorBtn}
                                    onClick={() => setShowCreateActorModal(true)}
                                    disabled={actorCredits < 1}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    Create Actor (1 credit)
                                </button>
                            </div>

                            {/* User's custom actors */}
                            {customActors.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                        <path d="M32 32a10 10 0 100-20 10 10 0 000 20zM12 52a20 20 0 0140 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <h3>No custom actors yet</h3>
                                    <p>Click "Create Actor" to add your first custom AI actor</p>
                                </div>
                            ) : (
                                <div className={styles.videoGrid}>
                                    {customActors.map((actor) => (
                                        <div key={actor.id} className={styles.videoCard}>
                                            <div className={styles.videoThumbnail} style={{ position: 'relative' }}>
                                                <img
                                                    src={actor.reference_image_url}
                                                    alt={actor.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: '12px'
                                                    }}
                                                />
                                                {/* Action Buttons */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '8px',
                                                    right: '8px',
                                                    display: 'flex',
                                                    gap: '8px'
                                                }}>
                                                    {/* View Button */}
                                                    <button
                                                        onClick={() => setViewActorImageUrl(actor.reference_image_url)}
                                                        style={{
                                                            width: '36px',
                                                            height: '36px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: 'rgba(0, 0, 0, 0.7)',
                                                            backdropFilter: 'blur(8px)',
                                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                                            borderRadius: '8px',
                                                            color: '#fff',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s',
                                                            opacity: 0.8
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.opacity = '1';
                                                            e.currentTarget.style.background = 'rgba(102, 126, 234, 0.9)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.opacity = '0.8';
                                                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                                                        }}
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                            <path d="M10 3C5 3 1.73 6.11 1 10c.73 3.89 4 7 9 7s8.27-3.11 9-7c-.73-3.89-4-7-9-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                                                        </svg>
                                                    </button>

                                                    {/* Download Button */}
                                                    <a
                                                        href={actor.reference_image_url}
                                                        download={`${actor.name || 'actor'}.png`}
                                                        style={{
                                                            width: '36px',
                                                            height: '36px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: 'rgba(0, 0, 0, 0.7)',
                                                            backdropFilter: 'blur(8px)',
                                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                                            borderRadius: '8px',
                                                            color: '#fff',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s',
                                                            opacity: 0.8,
                                                            textDecoration: 'none'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.opacity = '1';
                                                            e.currentTarget.style.background = 'rgba(102, 126, 234, 0.9)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.opacity = '0.8';
                                                            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                                                        }}
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                            <path d="M10 3v10M10 13l-3-3M10 13l3-3M4 17h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className={styles.videoInfo}>
                                                <p className={styles.videoScript} style={{
                                                    fontSize: '14px',
                                                    fontWeight: 600,
                                                    marginBottom: '4px',
                                                    color: '#e5e7eb'
                                                }}>
                                                    {actor.name}
                                                </p>
                                                <p style={{
                                                    fontSize: '12px',
                                                    color: '#9ca3af',
                                                    marginBottom: '12px'
                                                }}>
                                                    {actor.description || actor.prompt}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                }

                {
                    activeTab === 'settings' && (
                        <div className={styles.settingsSection}>
                            <h1 className={styles.pageTitle}>Settings</h1>
                            <p className={styles.comingSoon}>Coming soon...</p>
                        </div>
                    )
                }
            </main >

            {/* Credits Modal */}
            {
                showCreditsModal && (
                    <div className={styles.modalOverlay} onClick={() => setShowCreditsModal(false)}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalIcon}>
                                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3" />
                                    <path d="M32 16v16l12 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h2 className={styles.modalTitle}>Out of Credits!</h2>
                            <p className={styles.modalDescription}>
                                You need {getCreditCost()} credits to generate this video. Upgrade your plan to get more credits.
                            </p>
                            <div className={styles.modalActions}>
                                <a href="/#pricing" className={styles.modalUpgradeBtn}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" fill="currentColor" />
                                    </svg>
                                    Upgrade Plan
                                </a>
                                <button onClick={() => setShowCreditsModal(false)} className={styles.modalCloseBtn}>
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Create Actor Modal */}
            {
                showCreateActorModal && (
                    <div className={styles.modalOverlay} onClick={() => setShowCreateActorModal(false)}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalHeader}>
                                <h2 className={styles.modalTitle}>Create Custom AI Actor</h2>
                                <button
                                    className={styles.closeBtn}
                                    onClick={() => setShowCreateActorModal(false)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M5 5l10 10M5 15L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className={styles.modalBody}>
                                {/* Generation Time Info */}
                                <div style={{
                                    padding: '12px 16px',
                                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
                                    border: '1px solid rgba(59, 130, 246, 0.3)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '12px',
                                    marginBottom: '20px'
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                                        <circle cx="10" cy="10" r="8" stroke="#60a5fa" strokeWidth="2" />
                                        <path d="M10 6v4l2 2" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <div style={{ flex: 1 }}>
                                        <p style={{
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            color: '#93c5fd',
                                            marginBottom: '4px'
                                        }}>
                                            Generation Time: 2-3 minutes
                                        </p>
                                        <p style={{
                                            fontSize: '12px',
                                            color: '#9ca3af',
                                            lineHeight: '1.5',
                                            margin: 0
                                        }}>
                                            AI actor generation takes time. Please be patient while we create your custom actor with the reference images.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Actor Name</label>
                                    <input
                                        type="text"
                                        className={styles.formInput}
                                        placeholder="e.g., John Smith"
                                        value={actorName}
                                        onChange={(e) => setActorName(e.target.value)}
                                        disabled={isCreatingActor}
                                    />
                                </div>

                                {/* Aspect Ratio Selector */}
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Image Format</label>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: '12px'
                                    }}>
                                        <button
                                            type="button"
                                            onClick={() => setActorAspectRatio('1:1')}
                                            disabled={isCreatingActor}
                                            style={{
                                                padding: '12px',
                                                background: actorAspectRatio === '1:1' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.05)',
                                                border: actorAspectRatio === '1:1' ? '2px solid #667eea' : '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '8px',
                                                color: '#fff',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                cursor: isCreatingActor ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.2s',
                                                opacity: isCreatingActor ? 0.5 : 1
                                            }}
                                        >
                                            1:1<br /><span style={{ fontSize: '11px', opacity: 0.7 }}>Square</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActorAspectRatio('9:16')}
                                            disabled={isCreatingActor}
                                            style={{
                                                padding: '12px',
                                                background: actorAspectRatio === '9:16' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.05)',
                                                border: actorAspectRatio === '9:16' ? '2px solid #667eea' : '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '8px',
                                                color: '#fff',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                cursor: isCreatingActor ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.2s',
                                                opacity: isCreatingActor ? 0.5 : 1
                                            }}
                                        >
                                            9:16<br /><span style={{ fontSize: '11px', opacity: 0.7 }}>Mobile</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActorAspectRatio('16:9')}
                                            disabled={isCreatingActor}
                                            style={{
                                                padding: '12px',
                                                background: actorAspectRatio === '16:9' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255, 255, 255, 0.05)',
                                                border: actorAspectRatio === '16:9' ? '2px solid #667eea' : '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '8px',
                                                color: '#fff',
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                cursor: isCreatingActor ? 'not-allowed' : 'pointer',
                                                transition: 'all 0.2s',
                                                opacity: isCreatingActor ? 0.5 : 1
                                            }}
                                        >
                                            16:9<br /><span style={{ fontSize: '11px', opacity: 0.7 }}>Landscape</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Image Uploads Grid */}
                                <div className={styles.imageUploadsGrid}>
                                    {/* Person Reference Image */}
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>
                                            Person *
                                        </label>
                                        <div className={styles.imageUploadContainer}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleActorImageUpload(e, 'person')}
                                                className={styles.fileInput}
                                                id="personImageInput"
                                                disabled={isCreatingActor}
                                            />
                                            <label htmlFor="personImageInput" className={styles.uploadLabel}>
                                                {personImagePreview ? (
                                                    <div className={styles.imagePreview}>
                                                        <img src={personImagePreview} alt="Person reference" />
                                                        <div className={styles.imageOverlay}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            <span>Change</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={styles.uploadPlaceholder}>
                                                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                                            <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="2" />
                                                            <path d="M12 40a12 12 0 0124 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                        </svg>
                                                        <span className={styles.uploadText}>Upload Person</span>
                                                        <span className={styles.uploadHint}>PNG, JPG 30MB</span>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    {/* Object Reference Image */}
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>
                                            Object
                                        </label>
                                        <div className={styles.imageUploadContainer}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleActorImageUpload(e, 'object')}
                                                className={styles.fileInput}
                                                id="objectImageInput"
                                                disabled={isCreatingActor}
                                            />
                                            <label htmlFor="objectImageInput" className={styles.uploadLabel}>
                                                {objectImagePreview ? (
                                                    <div className={styles.imagePreview}>
                                                        <img src={objectImagePreview} alt="Object reference" />
                                                        <div className={styles.imageOverlay}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            <span>Change</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={styles.uploadPlaceholder}>
                                                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                                            <rect x="12" y="12" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
                                                        </svg>
                                                        <span className={styles.uploadText}>Upload Object</span>
                                                        <span className={styles.uploadHint}>PNG, JPG 30MB</span>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    {/* Decor Reference Image */}
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>
                                            Decor
                                        </label>
                                        <div className={styles.imageUploadContainer}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleActorImageUpload(e, 'decor')}
                                                className={styles.fileInput}
                                                id="decorImageInput"
                                                disabled={isCreatingActor}
                                            />
                                            <label htmlFor="decorImageInput" className={styles.uploadLabel}>
                                                {decorImagePreview ? (
                                                    <div className={styles.imagePreview}>
                                                        <img src={decorImagePreview} alt="Decor reference" />
                                                        <div className={styles.imageOverlay}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            <span>Change</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={styles.uploadPlaceholder}>
                                                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                                            <path d="M8 8h32v32H8z" stroke="currentColor" strokeWidth="2" />
                                                            <path d="M16 16h16v16H16z" stroke="currentColor" strokeWidth="2" />
                                                        </svg>
                                                        <span className={styles.uploadText}>Upload Decor</span>
                                                        <span className={styles.uploadHint}>PNG, JPG 30MB</span>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Actor & Scene Description *</label>
                                    <textarea
                                        className={styles.formTextarea}
                                        placeholder="Describe the actor's appearance, clothing, setting, and decor... Example: Professional woman in her 30s, wearing business attire, modern office background with plants and natural lighting"
                                        rows={4}
                                        value={actorPrompt}
                                        onChange={(e) => setActorPrompt(e.target.value)}
                                        disabled={isCreatingActor}
                                    />
                                </div>

                                {/* Error Display */}
                                {actorCreationError && (
                                    <div style={{
                                        padding: '12px',
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                        borderRadius: '8px',
                                        color: '#f87171',
                                        fontSize: '14px',
                                        marginBottom: '16px'
                                    }}>
                                        {actorCreationError}
                                    </div>
                                )}

                                <div className={styles.modalActions}>
                                    <button
                                        className={styles.createBtn}
                                        onClick={handleCreateActor}
                                        disabled={isCreatingActor}
                                    >
                                        {isCreatingActor ? (
                                            <>
                                                <div className={styles.spinner}></div>
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                                Create Actor
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setShowCreateActorModal(false)}
                                        className={styles.cancelBtn}
                                        disabled={isCreatingActor}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Actor Image View Modal */}
            {
                viewActorImageUrl && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.95)',
                            zIndex: 4000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                        onClick={() => setViewActorImageUrl(null)}
                    >
                        <button
                            onClick={() => setViewActorImageUrl(null)}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                width: '48px',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '50%',
                                color: '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                zIndex: 4001
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                        <img
                            src={viewActorImageUrl}
                            alt="Actor preview"
                            style={{
                                maxWidth: '90%',
                                maxHeight: '90%',
                                objectFit: 'contain',
                                borderRadius: '12px',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )
            }

            {/* Success Notification */}
            {
                showSuccessNotification && (
                    <div style={{
                        position: 'fixed',
                        top: '24px',
                        right: '24px',
                        zIndex: 3000,
                        animation: 'slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '16px',
                            padding: '20px 24px',
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: '16px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                            backdropFilter: 'blur(12px)',
                            minWidth: '360px',
                            maxWidth: '420px'
                        }}>
                            <div style={{ flexShrink: 0 }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" fill="#10b981" />
                                    <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#10b981', margin: '0 0 6px 0', lineHeight: 1.4 }}>
                                    Vidéo en cours de génération !
                                </h3>
                                <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.5 }}>
                                    Votre vidéo apparaîtra dans l'historique dans 1-2 minutes.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowSuccessNotification(false)}
                                style={{
                                    flexShrink: 0,
                                    width: '28px',
                                    height: '28px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M5 5l10 10M5 15L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
