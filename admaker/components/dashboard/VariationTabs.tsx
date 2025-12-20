'use client';

import { useState } from 'react';
import styles from './VariationTabs.module.css';

export interface VideoVariation {
    id: number;
    script: string;
    sceneDescription: string;
    selectedActor: any | null;
    productImageUrl: string | null;
    virtualTryOnImageUrl: string | null;
    format: '16:9' | '9:16';
    duration: 8 | 16;
    status: 'empty' | 'configured' | 'generating' | 'complete' | 'error';
}

interface VariationTabsProps {
    variations: VideoVariation[];
    activeVariation: number;
    onVariationChange: (index: number) => void;
}

export default function VariationTabs({ variations, activeVariation, onVariationChange }: VariationTabsProps) {
    return (
        <div className={styles.variationTabs}>
            <div className={styles.tabsHeader}>
                <h3 className={styles.tabsTitle}>Video Variations</h3>
                <p className={styles.tabsSubtitle}>Create up to 4 variations with different actors and scripts</p>
            </div>

            <div className={styles.tabsContainer}>
                {variations.map((variation, index) => {
                    const isActive = activeVariation === index;
                    const isConfigured = variation.selectedActor && variation.script.trim().length > 0;

                    return (
                        <button
                            key={variation.id}
                            className={`${styles.tab} ${isActive ? styles.active : ''} ${isConfigured ? styles.configured : ''}`}
                            onClick={() => onVariationChange(index)}
                        >
                            <div className={styles.tabContent}>
                                <div className={styles.tabHeader}>
                                    <span className={styles.tabNumber}>Variation {index + 1}</span>
                                    {variation.status === 'generating' && (
                                        <div className={styles.spinner}></div>
                                    )}
                                    {variation.status === 'complete' && (
                                        <svg className={styles.checkIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                    {variation.status === 'error' && (
                                        <svg className={styles.errorIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M8 3v5M8 11h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    )}
                                </div>

                                {variation.selectedActor && (
                                    <div className={styles.actorPreview}>
                                        <img
                                            src={variation.selectedActor.thumbnailUrl || variation.selectedActor.imageUrl}
                                            alt={variation.selectedActor.name}
                                            className={styles.actorThumbnail}
                                        />
                                        <span className={styles.actorName}>{variation.selectedActor.name}</span>
                                    </div>
                                )}

                                {!variation.selectedActor && (
                                    <div className={styles.emptyState}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
                                        </svg>
                                        <span>Not configured</span>
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
