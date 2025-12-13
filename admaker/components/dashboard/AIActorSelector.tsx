'use client';

import { useState, useEffect } from 'react';
import styles from './AIActorSelector.module.css';
import { AIActor } from '@/lib/types/veo';

interface AIActorSelectorProps {
    onActorSelect: (actor: AIActor) => void;
}

export default function AIActorSelector({ onActorSelect }: AIActorSelectorProps) {
    const [actors, setActors] = useState<AIActor[]>([]);
    const [selectedActor, setSelectedActor] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load actors from JSON file
        fetch('/data/ai-actors.json')
            .then(res => res.json())
            .then(data => {
                setActors(data.actors);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to load actors:', error);
                setLoading(false);
            });
    }, []);

    const categories = ['All', 'My Actors', 'Business', 'Casual', 'Lifestyle', 'Product Demo', 'Sport', 'Beauty', 'Vlog', 'Originals'];

    const filteredActors = selectedCategory === 'All'
        ? actors
        : selectedCategory === 'My Actors'
            ? actors.filter(actor => actor.category === 'Custom') // Custom actors created by user
            : actors.filter(actor => actor.category === selectedCategory);

    const handleActorClick = (actor: AIActor) => {
        setSelectedActor(actor.id);
        onActorSelect(actor);
    };

    if (loading) {
        return (
            <div className={styles.selectorContainer}>
                <div className={styles.loading}>Loading AI actors...</div>
            </div>
        );
    }

    return (
        <div className={styles.selectorContainer}>
            <div className={styles.selectorHeader}>
                <div>
                    <h3 className={styles.selectorTitle}>Select Your AI Actor</h3>
                    <p className={styles.selectorDescription}>
                        Choose from our library of pre-made AI actors with professional scenes
                    </p>
                </div>
                <div className={styles.categoryTabs}>
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`${styles.categoryTab} ${selectedCategory === category ? styles.active : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.actorsGrid}>
                {filteredActors.map(actor => (
                    <button
                        key={actor.id}
                        className={`${styles.actorCard} ${selectedActor === actor.id ? styles.selected : ''}`}
                        onClick={() => handleActorClick(actor)}
                    >
                        <div className={styles.actorImageWrapper}>
                            {actor.thumbnailUrl ? (
                                <img
                                    src={actor.thumbnailUrl}
                                    alt={actor.name}
                                    className={styles.actorImage}
                                />
                            ) : (
                                <div className={styles.actorImagePlaceholder}>
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="2" />
                                        <path d="M12 40a12 12 0 0124 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                            )}
                            {selectedActor === actor.id && (
                                <div className={styles.selectedBadge}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {filteredActors.length === 0 && (
                <div className={styles.emptyState}>
                    <p>No actors found in this category</p>
                </div>
            )}
        </div>
    );
}
