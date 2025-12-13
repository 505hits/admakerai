'use client';

import styles from './VideoSettings.module.css';

interface VideoSettingsProps {
    format: '16:9' | '9:16';
    duration: 8 | 16;
    onFormatChange: (format: '16:9' | '9:16') => void;
    onDurationChange: (duration: 8 | 16) => void;
}

export default function VideoSettings({
    format,
    duration,
    onFormatChange,
    onDurationChange
}: VideoSettingsProps) {
    const getCreditCost = () => {
        // Credits based only on duration
        return duration === 8 ? 1 : 2;
    };

    return (
        <div className={styles.settingsContainer}>
            <h3 className={styles.settingsTitle}>Video Settings</h3>

            <div className={styles.settingsGrid}>
                {/* Format Selector */}
                <div className={styles.settingGroup}>
                    <label className={styles.settingLabel}>Format</label>
                    <div className={styles.formatButtons}>
                        <button
                            className={`${styles.formatButton} ${format === '16:9' ? styles.active : ''}`}
                            onClick={() => onFormatChange('16:9')}
                        >
                            <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
                                <rect x="1" y="1" width="30" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>16:9</span>
                        </button>
                        <button
                            className={`${styles.formatButton} ${format === '9:16' ? styles.active : ''}`}
                            onClick={() => onFormatChange('9:16')}
                        >
                            <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
                                <rect x="1" y="1" width="18" height="30" rx="2" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span>9:16</span>
                        </button>
                    </div>
                </div>

                {/* Duration Selector */}
                <div className={styles.settingGroup}>
                    <label className={styles.settingLabel}>Duration</label>
                    <div className={styles.durationButtons}>
                        <button
                            className={`${styles.durationButton} ${duration === 8 ? styles.active : ''}`}
                            onClick={() => onDurationChange(8)}
                        >
                            <span className={styles.durationTime}>8s</span>
                            <span className={styles.durationCost}>1 credit</span>
                        </button>
                        <button
                            className={`${styles.durationButton} ${duration === 16 ? styles.active : ''}`}
                            onClick={() => onDurationChange(16)}
                        >
                            <span className={styles.durationTime}>16s</span>
                            <span className={styles.durationCost}>2 credits</span>
                        </button>
                    </div>
                    <p className={styles.durationNote}>
                        16s videos are created by extending 8s videos
                    </p>
                </div>

                {/* Credit Cost Summary */}
                <div className={styles.settingGroup}>
                    <label className={styles.settingLabel}>Total Cost</label>
                    <div className={styles.creditCost}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className={styles.costValue}>{getCreditCost()}</span>
                        <span className={styles.costLabel}>credit{getCreditCost() > 1 ? 's' : ''}</span>
                    </div>
                </div>
            </div>

            <div className={styles.modelInfo}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 4v4M8 10h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>Using Veo 3.1 Fast model for quick generation</span>
            </div>
        </div>
    );
}
