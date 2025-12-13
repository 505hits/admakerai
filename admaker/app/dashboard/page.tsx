'use client';

import { useState } from 'react';
import styles from './Dashboard.module.css';
import ScriptEditor from '@/components/dashboard/ScriptEditor';
import VideoSettings from '@/components/dashboard/VideoSettings';
import ProductImageUpload from '@/components/dashboard/ProductImageUpload';
import AIActorSelector from '@/components/dashboard/AIActorSelector';
import { AIActor } from '@/lib/types/veo';
import { generateVideoWithDuration } from '@/lib/api/veo';

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
    const [showCreditsModal, setShowCreditsModal] = useState(false);
    const [showCreateActorModal, setShowCreateActorModal] = useState(false);
    const [actorReferenceImage, setActorReferenceImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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
            setError('Please write a script');
            return;
        }

        if (!sceneDescription.trim()) {
            setError('Please add a scene description');
            return;
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
            const result = await generateVideoWithDuration(
                selectedActor.imageUrl,
                script,
                sceneDescription,
                format,
                duration,
                productImageUrl || undefined
            );

            // Deduct credits
            setCredits(prev => prev - cost);

            // In production, you'd poll for video completion or use webhooks
            // For now, simulate completion
            setTimeout(() => {
                setIsGenerating(false);
                setGeneratedVideo('/videos/example-video.mp4');
            }, 5000);

        } catch (err: any) {
            setIsGenerating(false);
            setError(err.message || 'Failed to generate video');
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
                <div className={styles.sidebarHeader}>
                    <a href="/" className={styles.logo}>
                        <img src="/logo.png" alt="AdMaker AI" />
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
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
                        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <div>
                        <span className={styles.creditsLabel}>Credits</span>
                        <span className={styles.creditsValue}>{credits}</span>
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
                                <ScriptEditor
                                    showSceneDescription={true}
                                    duration={duration}
                                    onScriptChange={setScript}
                                    onSceneChange={setSceneDescription}
                                />

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
                                    <button className={styles.downloadBtn}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 3v10m0 0l-4-4m4 4l4-4M3 17h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Download
                                    </button>
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
                        <div className={styles.emptyState}>
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                <path d="M32 56a24 24 0 100-48 24 24 0 000 48z" stroke="currentColor" strokeWidth="2" />
                                <path d="M26 28l12 8-12 8V28z" fill="currentColor" />
                            </svg>
                            <h3>No videos yet</h3>
                            <p>Create your first video to see it here</p>
                        </div>
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
                            <button
                                className={styles.createActorBtn}
                                onClick={() => setShowCreateActorModal(true)}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                Create Actor
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

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Reference Image</label>
                                <div className={styles.imageUploadContainer}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleActorImageUpload}
                                        className={styles.fileInput}
                                        id="actorImageInput"
                                    />
                                    <label htmlFor="actorImageInput" className={styles.uploadLabel}>
                                        {actorReferenceImage ? (
                                            <div className={styles.imagePreview}>
                                                <img src={actorReferenceImage} alt="Actor reference" />
                                                <div className={styles.imageOverlay}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <span>Change Image</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={styles.uploadPlaceholder}>
                                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                                    <path d="M42 30v8a4 4 0 01-4 4H10a4 4 0 01-4-4v-8M34 16l-10-10-10 10M24 6v24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className={styles.uploadText}>Upload Reference Image</span>
                                                <span className={styles.uploadHint}>PNG, JPG up to 5MB</span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Actor & Scene Description</label>
                                <textarea
                                    className={styles.formTextarea}
                                    placeholder="Describe the actor's appearance, clothing, setting, and decor... Example: Professional woman in her 30s, wearing business attire, modern office background with plants and natural lighting"
                                    rows={3}
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
