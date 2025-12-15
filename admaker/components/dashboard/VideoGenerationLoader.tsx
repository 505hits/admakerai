import React from 'react';
import styles from './VideoGenerationLoader.module.css';

interface VideoGenerationLoaderProps {
    progress: string;
    elapsedTime: number;
    estimatedRemaining: number;
}

export default function VideoGenerationLoader({
    progress,
    elapsedTime,
    estimatedRemaining
}: VideoGenerationLoaderProps) {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loaderContent}>
                {/* Animated Film Reel */}
                <div className={styles.filmReel}>
                    <div className={styles.filmStrip}>
                        <div className={styles.filmFrame}></div>
                        <div className={styles.filmFrame}></div>
                        <div className={styles.filmFrame}></div>
                        <div className={styles.filmFrame}></div>
                    </div>
                    <div className={styles.filmStrip}>
                        <div className={styles.filmFrame}></div>
                        <div className={styles.filmFrame}></div>
                        <div className={styles.filmFrame}></div>
                        <div className={styles.filmFrame}></div>
                    </div>
                </div>

                {/* Pulsing AI Icon */}
                <div className={styles.aiIcon}>
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="35" className={styles.aiCircle} />
                        <path
                            d="M30 35L40 25L50 35M40 25V55M25 50L40 55L55 50"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={styles.aiPath}
                        />
                    </svg>
                </div>

                {/* Progress Text */}
                <div className={styles.progressText}>
                    <h3 className={styles.title}>Creating Your Video</h3>
                    <p className={styles.subtitle}>{progress}</p>
                </div>

                {/* Time Display */}
                <div className={styles.timeDisplay}>
                    <div className={styles.timeBox}>
                        <span className={styles.timeLabel}>Elapsed</span>
                        <span className={styles.timeValue}>{elapsedTime}s</span>
                    </div>
                    <div className={styles.timeDivider}></div>
                    <div className={styles.timeBox}>
                        <span className={styles.timeLabel}>Remaining</span>
                        <span className={styles.timeValue}>~{estimatedRemaining}s</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{
                            width: `${Math.min(100, (elapsedTime / 120) * 100)}%`
                        }}
                    ></div>
                </div>

                {/* Loading Steps */}
                <div className={styles.steps}>
                    <div className={`${styles.step} ${elapsedTime > 5 ? styles.stepComplete : styles.stepActive}`}>
                        <div className={styles.stepIcon}>✓</div>
                        <span>Analyzing script</span>
                    </div>
                    <div className={`${styles.step} ${elapsedTime > 30 ? styles.stepComplete : elapsedTime > 5 ? styles.stepActive : ''}`}>
                        <div className={styles.stepIcon}>✓</div>
                        <span>Generating frames</span>
                    </div>
                    <div className={`${styles.step} ${elapsedTime > 90 ? styles.stepComplete : elapsedTime > 30 ? styles.stepActive : ''}`}>
                        <div className={styles.stepIcon}>✓</div>
                        <span>Rendering video</span>
                    </div>
                    <div className={`${styles.step} ${elapsedTime > 110 ? styles.stepActive : ''}`}>
                        <div className={styles.stepIcon}>✓</div>
                        <span>Finalizing</span>
                    </div>
                </div>

                {/* Fun Fact */}
                <div className={styles.funFact}>
                    <span className={styles.funFactIcon}>💡</span>
                    <p>Did you know? AI-generated videos can save up to 90% of production time!</p>
                </div>
            </div>
        </div>
    );
}
