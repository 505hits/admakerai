'use client';

import { useState } from 'react';
import styles from './ModeSelector.module.css';

export type CreationMode = 'ai-creation' | 'ai-actor';

interface ModeSelectorProps {
    selectedMode: CreationMode;
    onModeChange: (mode: CreationMode) => void;
}

export default function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
    return (
        <div className={styles.modeSelectorContainer}>
            <div className={styles.modeSelector}>
                <button
                    className={`${styles.modeButton} ${selectedMode === 'ai-creation' ? styles.active : ''}`}
                    onClick={() => onModeChange('ai-creation')}
                >
                    <div className={styles.modeIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className={styles.modeContent}>
                        <h3 className={styles.modeTitle}>AI Creation</h3>
                        <p className={styles.modeDescription}>Create from scratch with custom elements</p>
                    </div>
                </button>

                <button
                    className={`${styles.modeButton} ${selectedMode === 'ai-actor' ? styles.active : ''}`}
                    onClick={() => onModeChange('ai-actor')}
                >
                    <div className={styles.modeIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM6 20a6 6 0 0112 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M15 8l4-4M19 8l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className={styles.modeContent}>
                        <h3 className={styles.modeTitle}>AI Actor Animation</h3>
                        <p className={styles.modeDescription}>Animate existing AI actors</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
