'use client';

import { useState } from 'react';
import styles from './ActorSelector.module.css';

const actorCategories = [
    'All',
    'Business',
    'Sport',
    'Podcast',
    'Beauty',
    'Fashion',
    'Tech',
    'Food',
    'Travel',
    'Fitness',
    'Education',
    'Entertainment',
    'Healthcare',
    'Real Estate',
    'Finance',
    'Lifestyle'
];

const actors = [
    { id: 1, name: 'Angela', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=300&fit=crop&crop=faces', category: 'Business' },
    { id: 2, name: 'Mike', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop&crop=faces', category: 'Sport' },
    { id: 3, name: 'Saman', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=300&fit=crop&crop=faces', category: 'Beauty' },
    { id: 4, name: 'Mila', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=300&fit=crop&crop=faces', category: 'Fashion' },
    { id: 5, name: 'Jason', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=300&fit=crop&crop=faces', category: 'Tech' },
    { id: 6, name: 'Emma', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=300&fit=crop&crop=faces', category: 'Podcast' },
    { id: 7, name: 'David', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=300&fit=crop&crop=faces', category: 'Fitness' },
    { id: 8, name: 'Sophie', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=300&fit=crop&crop=faces', category: 'Education' },
    { id: 9, name: 'James', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=300&fit=crop&crop=faces', category: 'Business' },
    { id: 10, name: 'Lisa', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=300&fit=crop&crop=faces', category: 'Healthcare' },
];

export default function ActorSelector() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedActor, setSelectedActor] = useState<number | null>(1);
    const [showCreateActor, setShowCreateActor] = useState(false);

    const filteredActors = selectedCategory === 'All'
        ? actors
        : actors.filter(actor => actor.category === selectedCategory);

    return (
        <div className={styles.selectorContainer}>
            <div className={styles.selectorHeader}>
                <h2 className={styles.selectorTitle}>Select Actor</h2>
                <button
                    className={styles.addActorBtn}
                    onClick={() => setShowCreateActor(true)}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Add Actor
                </button>
            </div>

            {/* Category Pills */}
            <div className={styles.categoryContainer}>
                <div className={styles.categoryScroll}>
                    {actorCategories.map((category) => (
                        <button
                            key={category}
                            className={`${styles.categoryPill} ${selectedCategory === category ? styles.active : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actor Grid */}
            <div className={styles.actorGrid}>
                {filteredActors.map((actor) => (
                    <div
                        key={actor.id}
                        className={`${styles.actorCard} ${selectedActor === actor.id ? styles.selected : ''}`}
                        onClick={() => setSelectedActor(actor.id)}
                    >
                        <div className={styles.actorImage}>
                            <img src={actor.image} alt={actor.name} />
                            {selectedActor === actor.id && (
                                <div className={styles.selectedOverlay}>
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <circle cx="16" cy="16" r="16" fill="rgba(255, 8, 68, 0.9)" />
                                        <path d="M10 16l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className={styles.actorInfo}>
                            <span className={styles.actorName}>{actor.name}</span>
                            <span className={styles.actorCategory}>{actor.category}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Actor Modal */}
            {showCreateActor && (
                <div className={styles.modalOverlay} onClick={() => setShowCreateActor(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Create New Actor</h3>
                            <button
                                className={styles.closeBtn}
                                onClick={() => setShowCreateActor(false)}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M5 5l10 10M5 15L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.uploadSection}>
                                <div className={styles.uploadBox}>
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <path d="M24 32V16M16 24h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    <p>Upload Photo</p>
                                    <span>PNG, JPG up to 10MB</span>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Actor Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter actor name"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Category</label>
                                <select className={styles.select}>
                                    <option>Select category</option>
                                    {actorCategories.slice(1).map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Voice Type</label>
                                <select className={styles.select}>
                                    <option>Select voice type</option>
                                    <option>Male - Professional</option>
                                    <option>Female - Friendly</option>
                                    <option>Male - Energetic</option>
                                    <option>Female - Calm</option>
                                </select>
                            </div>

                            <button className={styles.createBtn}>
                                Create Actor
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
