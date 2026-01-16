'use client';

import styles from './VideoSettings.module.css';

interface VideoSettingsProps {
    format: '16:9' | '9:16';
    duration: 8; // Only 8s videos supported
    onFormatChange: (format: '16:9' | '9:16') => void;
    onDurationChange: (duration: 8) => void; // Keep for compatibility but only accepts 8
    lang?: 'en' | 'fr';
}

export default function VideoSettings({
    format,
    duration,
    onFormatChange,
    onDurationChange,
    lang = 'en'
}: VideoSettingsProps) {
    const translations = {
        en: {
            title: 'Video Settings',
            format: 'Format',
            duration: 'Duration',
            credits: 'credits',
            credit: 'credit',
            totalCost: 'Total Cost',
            durationNote: '16s videos are created by extending 8s videos',
            modelInfo: 'Using Veo 3.1 Fast model for quick generation'
        },
        fr: {
            title: 'Paramètres Vidéo',
            format: 'Format',
            duration: 'Durée',
            credits: 'crédits',
            credit: 'crédit',
            totalCost: 'Coût Total',
            durationNote: 'Les vidéos de 16s sont créées en étendant les vidéos de 8s',
            modelInfo: 'Utilisation du modèle Veo 3.1 Fast pour une génération rapide'
        }
    };
    const t = translations[lang];
    const getCreditCost = () => {
        // Only 8s videos supported = 20 credits
        return 20;
    };

    return (
        <div className={styles.settingsContainer}>
            <h3 className={styles.settingsTitle}>{t.title}</h3>

            <div className={styles.settingsGrid}>
                {/* Format Selector */}
                <div className={styles.settingGroup}>
                    <label className={styles.settingLabel}>{t.format}</label>
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
                    <label className={styles.settingLabel}>{t.duration}</label>
                    <div className={styles.durationButtons}>
                        <button
                            className={`${styles.durationButton} ${styles.active}`}
                            disabled
                        >
                            <span className={styles.durationTime}>8s</span>
                            <span className={styles.durationCost}>20 {t.credits}</span>
                        </button>
                    </div>
                </div>

                {/* Credit Cost Summary */}
                <div className={styles.settingGroup}>
                    <label className={styles.settingLabel}>{t.totalCost}</label>
                    <div className={styles.creditCost}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className={styles.costValue}>{getCreditCost()}</span>
                        <span className={styles.costLabel}>{getCreditCost() > 1 ? t.credits : t.credit}</span>
                    </div>
                </div>
            </div>

            <div className={styles.modelInfo}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 4v4M8 10h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>{t.modelInfo}</span>
            </div>
        </div>
    );
}
