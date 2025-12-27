'use client';

import { useState, useEffect } from 'react';
import styles from './AIActorSelector.module.css';
import { AIActor } from '@/lib/types/veo';
import { getMediaUrl } from '@/lib/cloudflare-config';

interface AIActorSelectorProps {
    onActorSelect: (actor: AIActor) => void;
    customActors?: any[]; // Custom actors from Supabase
    lang?: 'en' | 'fr';
}

export default function AIActorSelector({ onActorSelect, customActors = [], lang = 'en' }: AIActorSelectorProps) {
    const translations = {
        en: {
            title: 'Select Your AI Actor',
            description: 'Choose from our library of pre-made AI actors with professional scenes',
            loading: 'Loading AI actors...',
            all: 'All',
            myActors: 'My Actors',
            noActors: 'No actors found in this category'
        },
        fr: {
            title: 'Sélectionnez Votre Acteur IA',
            description: 'Choisissez parmi notre bibliothèque d\'acteurs IA pré-faits avec des scènes professionnelles',
            loading: 'Chargement des acteurs IA...',
            all: 'Tous',
            myActors: 'Mes Acteurs',
            noActors: 'Aucun acteur trouvé dans cette catégorie'
        }
    };
    const t = translations[lang];

    const [actors, setActors] = useState<AIActor[]>([]);
    const [selectedActor, setSelectedActor] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>(t.all);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<string[]>([t.all, t.myActors]);

    useEffect(() => {
        // Load actors from JSON file
        fetch('/data/ai-actors.json')
            .then(res => res.json())
            .then(data => {
                // Convert custom actors to AIActor format
                const customAIActors: AIActor[] = customActors.map(actor => ({
                    id: actor.id,
                    name: actor.name,
                    category: 'Custom' as const,
                    imageUrl: actor.reference_image_url,
                    thumbnailUrl: actor.reference_image_url,
                    sceneDescription: actor.description || actor.prompt || '',
                    description: actor.description || actor.prompt || '',
                    tags: ['custom', 'user-created'],
                    gender: 'neutral' as const,
                    ageRange: 'adult',
                    style: 'custom'
                }));

                // Merge JSON actors with custom actors
                setActors([...customAIActors, ...data.actors]);

                // Set categories dynamically from JSON
                if (data.categories) {
                    setCategories([t.all, t.myActors, ...data.categories]);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to load actors:', error);
                setLoading(false);
            });
    }, [customActors]);

    const filteredActors = selectedCategory === t.all
        ? actors
        : selectedCategory === t.myActors
            ? actors.filter(actor => actor.category === 'Custom') // Custom actors created by user
            : actors.filter(actor => actor.category === selectedCategory);

    const handleActorClick = (actor: AIActor) => {
        setSelectedActor(actor.id);
        onActorSelect(actor);
    };

    if (loading) {
        return (
            <div className={styles.selectorContainer}>
                <div className={styles.loading}>{t.loading}</div>
            </div>
        );
    }

    return (
        <div className={styles.selectorContainer}>
            <div className={styles.selectorHeader}>
                <div>
                    <h3 className={styles.selectorTitle}>{t.title}</h3>
                    <p className={styles.selectorDescription}>
                        {t.description}
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
                                    src={actor.thumbnailUrl.startsWith('http') ? actor.thumbnailUrl : (actor.thumbnailUrl.startsWith('/') ? actor.thumbnailUrl : getMediaUrl(actor.thumbnailUrl))}
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
                    <p>{t.noActors}</p>
                </div>
            )}
        </div>
    );
}
