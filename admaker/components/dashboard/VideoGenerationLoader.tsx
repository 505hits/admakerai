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
    const progressPercent = Math.min(100, (elapsedTime / 120) * 100);

    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loaderContent}>
                {/* Spinner */}
                <div className={styles.spinner}></div>

                {/* Progress Text */}
                <div className={styles.progressText}>
                    <h3 className={styles.title}>Generating Video</h3>
                    <p className={styles.subtitle}>{progress}</p>
                </div>

                {/* Time Display */}
                <div className={styles.timeDisplay}>
                    <div className={styles.timeBox}>
                        <span className={styles.timeLabel}>Elapsed</span>
                        <span className={styles.timeValue}>{elapsedTime}s</span>
                    </div>
                    <div className={styles.timeBox}>
                        <span className={styles.timeLabel}>Remaining</span>
                        <span className={styles.timeValue}>~{estimatedRemaining}s</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className={styles.progressBar}>
                    <div
                        className={styles.progressFill}
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>

                {/* Loading Steps */}
                <div className={styles.steps}>
                    <div className={`${styles.step} ${elapsedTime > 5 ? styles.stepComplete : styles.stepActive}`}>
                        Analyzing
                    </div>
                    <div className={`${styles.step} ${elapsedTime > 30 ? styles.stepComplete : elapsedTime > 5 ? styles.stepActive : ''}`}>
                        Generating
                    </div>
                    <div className={`${styles.step} ${elapsedTime > 90 ? styles.stepComplete : elapsedTime > 30 ? styles.stepActive : ''}`}>
                        Rendering
                    </div>
                    <div className={`${styles.step} ${elapsedTime > 110 ? styles.stepActive : ''}`}>
                        Finalizing
                    </div>
                </div>
            </div>
        </div>
    );
}
