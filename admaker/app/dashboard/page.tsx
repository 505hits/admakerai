'use client';

import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import ScriptEditor from '@/components/dashboard/ScriptEditor';
import VideoSettings from '@/components/dashboard/VideoSettings';
import ProductImageUpload from '@/components/dashboard/ProductImageUpload';
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
    const [format, setFormat] = useState<'16:9' | '9:16'>('16:9');
    const [duration, setDuration] = useState<8 | 16>(8);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
    const [credits, setCredits] = useState(10);
    const [actorCredits, setActorCredits] = useState(10); // AI Actor credits
    const [showCreditsModal, setShowCreditsModal] = useState(false);
    const [showCreateActorModal, setShowCreateActorModal] = useState(false);
    const [actorReferenceImage, setActorReferenceImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loadingProgress, setLoadingProgress] = useState<string>('Initializing...');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [videoHistory, setVideoHistory] = useState<any[]>([]);

    // Load video history from Supabase on mount
    useEffect(() => {
        const loadVideos = async () => {
            const videos = await getUserVideos(20);
            setVideoHistory(videos);
        };
        loadVideos();
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
        return duration === 8 ? 1 : 2;
    };

    const handleActorImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setActorReferenceImage(reader.result as string);
                setError(null);
            };
            reader.readAsDataURL(file);
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
                productImageUrl || undefined
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
            alert('✅ Vidéo en cours de génération !\n\nVotre vidéo apparaîtra dans l\'historique dans 1-3 minutes.');

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
            {/* Video Generation Loader */}
            {isGenerating && (
                <VideoGenerationLoader
                    progress={loadingProgress}
                    elapsedTime={elapsedTime}
                    estimatedRemaining={Math.max(0, 120 - elapsedTime)}
                />
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
                        <AIActorSelector onActorSelect={setSelectedActor} />

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

                                {/* Optional Product Image */}
                                <ProductImageUpload onImageChange={setProductImageUrl} />

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
                                                <video
                                                    src={video.videoUrl}
                                                    className={styles.thumbnailVideo}
                                                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                                                    onMouseLeave={(e) => {
                                                        const vid = e.target as HTMLVideoElement;
                                                        vid.pause();
                                                        vid.currentTime = 0;
                                                    }}
                                                    muted
                                                    loop
                                                />
                                                <div className={styles.videoOverlay}>
                                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                                        <circle cx="24" cy="24" r="20" fill="rgba(0,0,0,0.5)" />
                                                        <path d="M18 14l16 10-16 10V14z" fill="white" />
                                                    </svg>
                                                </div>
                                                {/* Expiration warning badge */}
                                                {isExpired && (
                                                    <div className={styles.expiredBadge}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <circle cx="8" cy="8" r="7" fill="#ef4444" />
                                                            <path d="M8 4v4M8 10h.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                                        </svg>
                                                        Expired
                                                    </div>
                                                )}
                                                {!isExpired && isExpiringSoon && (
                                                    <div className={styles.expiringSoonBadge}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <circle cx="8" cy="8" r="7" fill="#f59e0b" />
                                                            <path d="M8 4v4l2 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                                        </svg>
                                                        {daysUntilExpiration}d left
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.videoInfo}>
                                                <div className={styles.actorInfo}>
                                                    <img src={video.actorImage} alt={video.actorName} className={styles.actorThumb} />
                                                    <span className={styles.actorName}>{video.actorName}</span>
                                                </div>
                                                <p className={styles.videoScript}>{video.script}</p>
                                                <div className={styles.videoMeta}>
                                                    <span className={styles.videoDuration}>{video.duration}s</span>
                                                    <span className={styles.videoFormat}>{video.format}</span>
                                                    <span className={styles.videoDate}>
                                                        {new Date(video.createdAt).toLocaleDateString()}
                                                    </span>
                                                    {expiresAt && (
                                                        <span className={styles.videoExpires} title={`Expires on ${expiresAt.toLocaleDateString()}`}>
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight: '4px' }}>
                                                                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                                                                <path d="M7 3v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                            </svg>
                                                            Expires {expiresAt.toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                                {isExpiringSoon && !isExpired && (
                                                    <div className={styles.expirationWarning}>
                                                        ⚠️ Download soon! This video expires in {daysUntilExpiration} day{daysUntilExpiration !== 1 ? 's' : ''}.
                                                    </div>
                                                )}
                                                {isExpired && (
                                                    <div className={styles.expiredWarning}>
                                                        ❌ This video URL has expired and is no longer accessible.
                                                    </div>
                                                )}
                                                <div className={styles.videoActions}>
                                                    <a
                                                        href={video.videoUrl}
                                                        download={`video-${video.task_id}.mp4`}
                                                        className={styles.downloadBtn}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M8 2v8m0 0l-3-3m3 3l3-3M2 14h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                        </svg>
                                                        Download
                                                    </a>
                                                    <button
                                                        onClick={() => {
                                                            setGeneratedVideo(video.videoUrl);
                                                            setActiveTab('create');
                                                        }}
                                                        className={styles.viewBtn}
                                                        disabled={isExpired}
                                                    >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M8 3C4.5 3 1.7 5.3 1 8c.7 2.7 3.5 5 7 5s6.3-2.3 7-5c-.7-2.7-3.5-5-7-5z" stroke="currentColor" strokeWidth="2" />
                                                            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
                                                        </svg>
                                                        View
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'actors' && (
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

                        {/* User's custom actors will be displayed here */}
                        <div className={styles.emptyState}>
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                <path d="M32 32a10 10 0 100-20 10 10 0 000 20zM12 52a20 20 0 0140 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <h3>No custom actors yet</h3>
                            <p>Click "Create Actor" to add your first custom AI actor</p>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className={styles.settingsSection}>
                        <h1 className={styles.pageTitle}>Settings</h1>
                        <p className={styles.comingSoon}>Coming soon...</p>
                    </div>
                )}
            </main>

            {/* Credits Modal */}
            {showCreditsModal && (
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
            )}

            {/* Create Actor Modal */}
            {showCreateActorModal && (
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
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Actor Name</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    placeholder="e.g., John Smith"
                                />
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
                                            onChange={handleActorImageUpload}
                                            className={styles.fileInput}
                                            id="personImageInput"
                                        />
                                        <label htmlFor="personImageInput" className={styles.uploadLabel}>
                                            {actorReferenceImage ? (
                                                <div className={styles.imagePreview}>
                                                    <img src={actorReferenceImage} alt="Person reference" />
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
                                                    <span className={styles.uploadHint}>PNG, JPG 5MB</span>
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
                                            className={styles.fileInput}
                                            id="objectImageInput"
                                        />
                                        <label htmlFor="objectImageInput" className={styles.uploadLabel}>
                                            <div className={styles.uploadPlaceholder}>
                                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                                    <rect x="12" y="12" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                                <span className={styles.uploadText}>Upload Object</span>
                                                <span className={styles.uploadHint}>PNG, JPG 5MB</span>
                                            </div>
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
                                            className={styles.fileInput}
                                            id="decorImageInput"
                                        />
                                        <label htmlFor="decorImageInput" className={styles.uploadLabel}>
                                            <div className={styles.uploadPlaceholder}>
                                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                                    <path d="M8 8h32v32H8z" stroke="currentColor" strokeWidth="2" />
                                                    <path d="M16 16h16v16H16z" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                                <span className={styles.uploadText}>Upload Decor</span>
                                                <span className={styles.uploadHint}>PNG, JPG 5MB</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Actor & Scene Description</label>
                                <textarea
                                    className={styles.formTextarea}
                                    placeholder="Describe the actor's appearance, clothing, setting, and decor... Example: Professional woman in her 30s, wearing business attire, modern office background with plants and natural lighting"
                                    rows={2}
                                />
                            </div>

                            <div className={styles.modalActions}>
                                <button className={styles.createBtn}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    Create Actor
                                </button>
                                <button onClick={() => setShowCreateActorModal(false)} className={styles.cancelBtn}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
