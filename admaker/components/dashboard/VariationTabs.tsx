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
    visibleVariations: number;
    onVariationChange: (index: number) => void;
    onAddVariation: () => void;
    onRemoveVariation: (index: number) => void;
}

export default function VariationTabs({
    variations,
    activeVariation,
    visibleVariations,
    onVariationChange,
    onAddVariation,
    onRemoveVariation
}: VariationTabsProps) {
    const maxVariations = 4;
    const canAddMore = visibleVariations < maxVariations;
    const remainingSlots = maxVariations - visibleVariations;

    return (
        <div className={styles.variationTabs}>
            <div className={styles.tabsHeader}>
                <div>
                    <h3 className={styles.tabsTitle}>Video Variations</h3>
                    <p className={styles.tabsSubtitle}>Create multiple variations with different actors and scripts - Perfect for A/B testing</p>
                </div>
                {canAddMore && (
                    <button
                        className={styles.addVariationBtn}
                        onClick={onAddVariation}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Add Variation ({remainingSlots} remaining)
                    </button>
                )}
            </div>

            <div className={styles.tabsContainer}>
                {variations.slice(0, visibleVariations).map((variation, index) => {
                    const isActive = activeVariation === index;
                    const isConfigured = variation.selectedActor && variation.script.trim().length > 0;

                    return (
                        <div
                            key={variation.id}
                            className={`${styles.tab} ${isActive ? styles.active : ''} ${isConfigured ? styles.configured : ''}`}
                            onClick={() => onVariationChange(index)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Variation ${index + 1}${isConfigured ? ' (configured)' : ''}`}
                            aria-pressed={isActive}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onVariationChange(index);
                                }
                            }}
                        >
                            {visibleVariations > 1 && (
                                <button
                                    className={styles.removeBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveVariation(index);
                                    }}
                                    title="Remove variation"
                                    aria-label={`Remove variation ${index + 1}`}
                                >
                                    ×
                                </button>
                            )}

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
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
