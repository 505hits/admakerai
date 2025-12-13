'use client';

import { useState } from 'react';
import styles from './ScriptEditor.module.css';

interface ScriptEditorProps {
    showSceneDescription?: boolean;
    duration?: 8 | 16;
    onScriptChange?: (script: string) => void;
    onSceneChange?: (scene: string) => void;
}

export default function ScriptEditor({
    showSceneDescription = true,
    duration = 8,
    onScriptChange,
    onSceneChange
}: ScriptEditorProps) {
    const [script, setScript] = useState('');
    const [sceneDescription, setSceneDescription] = useState('');
    const [showAIWriter, setShowAIWriter] = useState(false);

    // Adjust character limit based on video duration
    // Average speaking rate: ~150 words/minute = ~12-13 characters/second
    const maxChars = duration === 8 ? 100 : 200;
    const maxSceneChars = 300;

    const handleScriptChange = (value: string) => {
        setScript(value);
        if (onScriptChange) onScriptChange(value);
    };

    const handleSceneChange = (value: string) => {
        setSceneDescription(value);
        if (onSceneChange) onSceneChange(value);
    };

    return (
        <div className={styles.editorContainer}>
            <div className={styles.editorHeader}>
                <h2 className={styles.editorTitle}>Script</h2>
                <button
                    className={styles.aiWriterBtn}
                    onClick={() => setShowAIWriter(true)}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" fill="currentColor" />
                    </svg>
                    AI Script writer
                </button>
            </div>

            {/* Script Textarea */}
            <div className={styles.editorWrapper}>
                <textarea
                    className={styles.scriptTextarea}
                    placeholder="Write your script here... Example: Hi! I'm excited to show you this amazing product that will change your life!"
                    value={script}
                    onChange={(e) => handleScriptChange(e.target.value.slice(0, maxChars))}
                    maxLength={maxChars}
                />
                <div className={styles.charCounter}>
                    {script.length}/{maxChars}
                </div>
            </div>

            {/* Scene Description */}
            {showSceneDescription && (
                <div className={styles.sceneWrapper}>
                    <label className={styles.sceneLabel}>Scene Description</label>
                    <textarea
                        className={styles.sceneTextarea}
                        placeholder="Describe how to animate the scene... Example: Enthusiastic presentation, holding product, smiling at camera"
                        value={sceneDescription}
                        onChange={(e) => handleSceneChange(e.target.value.slice(0, maxSceneChars))}
                        maxLength={maxSceneChars}
                        rows={3}
                    />
                    <div className={styles.charCounter}>
                        {sceneDescription.length}/{maxSceneChars}
                    </div>
                </div>
            )}

            {/* AI Writer Modal */}
            {showAIWriter && (
                <div className={styles.modalOverlay} onClick={() => setShowAIWriter(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>AI Script Writer</h3>
                            <button
                                className={styles.closeBtn}
                                onClick={() => setShowAIWriter(false)}
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M5 5l10 10M5 15L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <p className={styles.modalDescription}>
                                Describe what you want your video to be about, and AI will generate a script for you.
                            </p>
                            <textarea
                                className={styles.aiPrompt}
                                placeholder="E.g., Create a 30-second ad for a new fitness app targeting young professionals..."
                                rows={6}
                            />
                            <button className={styles.generateScriptBtn}>
                                Generate Script
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
