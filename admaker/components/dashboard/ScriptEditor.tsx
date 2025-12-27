'use client';

import { useState, useEffect } from 'react';
import styles from './ScriptEditor.module.css';

// List of available accents
const ACCENTS = [
    'American', 'British', 'Australian', 'Canadian',
    'French', 'German', 'Spanish', 'Italian',
    'Portuguese', 'Russian', 'Chinese', 'Japanese',
    'Korean', 'Indian', 'Arabic', 'Turkish',
    'Dutch', 'Swedish', 'Norwegian', 'Danish',
    'Polish', 'Greek', 'Irish', 'Scottish',
    'South African', 'New Zealand', 'Mexican', 'Brazilian',
    'Argentinian', 'Colombian'
];

interface ScriptEditorProps {
    script?: string;
    sceneDescription?: string;
    showSceneDescription?: boolean;
    duration?: 8 | 16;
    accent?: string;
    onScriptChange?: (script: string) => void;
    onSceneChange?: (scene: string) => void;
    onAccentChange?: (accent: string) => void;
}

export default function ScriptEditor({
    script: externalScript = '',
    sceneDescription: externalSceneDescription = '',
    showSceneDescription = true,
    duration = 8,
    accent: externalAccent = '',
    onScriptChange,
    onSceneChange,
    onAccentChange
}: ScriptEditorProps) {
    const [script, setScript] = useState(externalScript);
    const [sceneDescription, setSceneDescription] = useState(externalSceneDescription);
    const [accent, setAccent] = useState(externalAccent);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [enhanceError, setEnhanceError] = useState<string | null>(null);

    // Sync with external values when they change
    useEffect(() => {
        setScript(externalScript);
    }, [externalScript]);

    useEffect(() => {
        setSceneDescription(externalSceneDescription);
    }, [externalSceneDescription]);

    useEffect(() => {
        setAccent(externalAccent);
    }, [externalAccent]);

    // Adjust character limit to 500 characters
    const maxChars = 500;
    const maxSceneChars = 300;

    const handleScriptChange = (value: string) => {
        setScript(value);
        if (onScriptChange) onScriptChange(value);
    };

    const handleSceneChange = (value: string) => {
        setSceneDescription(value);
        if (onSceneChange) onSceneChange(value);
    };

    const handleAccentChange = (value: string) => {
        setAccent(value);
        if (onAccentChange) onAccentChange(value);
    };

    const handleEnhanceScript = async () => {
        if (!script || script.trim().length === 0) {
            setEnhanceError('Please write a script first');
            setTimeout(() => setEnhanceError(null), 3000);
            return;
        }

        setIsEnhancing(true);
        setEnhanceError(null);

        try {
            const response = await fetch('/api/enhance-script', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    script: script,
                    duration: duration
                }),
            });

            const data = await response.json();

            console.log('📦 API Response:', data);
            console.log('📝 Enhanced Script:', data.enhancedScript);

            if (!response.ok) {
                throw new Error(data.error || 'Failed to enhance script');
            }

            // Update the script with the enhanced version
            if (data.enhancedScript) {
                console.log('✅ Updating script with enhanced version');
                handleScriptChange(data.enhancedScript);
            } else {
                console.warn('⚠️ No enhanced script in response');
                throw new Error('No enhanced script received from API');
            }
        } catch (error) {
            console.error('Error enhancing script:', error);
            setEnhanceError(error instanceof Error ? error.message : 'Failed to enhance script');
            setTimeout(() => setEnhanceError(null), 5000);
        } finally {
            setIsEnhancing(false);
        }
    };

    return (
        <div className={styles.editorContainer}>
            <div className={styles.editorHeader}>
                <h2 className={styles.editorTitle}>Describe your video and script</h2>
                <button
                    className={styles.aiEnhancerBtn}
                    onClick={handleEnhanceScript}
                    disabled={isEnhancing || !script}
                >
                    {isEnhancing ? (
                        <>
                            <svg className={styles.spinner} width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                            Enhancing...
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                            </svg>
                            AI Script Enhancer
                        </>
                    )}
                </button>
            </div>

            {enhanceError && (
                <div className={styles.errorBanner}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {enhanceError}
                </div>
            )}

            {/* Accent Selector */}
            <div className={styles.accentSelector}>
                <label className={styles.accentLabel}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor" />
                    </svg>
                    Accent (optional)
                </label>
                <select
                    value={accent}
                    onChange={(e) => handleAccentChange(e.target.value)}
                    className={styles.accentSelect}
                >
                    <option value="">No specific accent</option>
                    {ACCENTS.map(acc => (
                        <option key={acc} value={acc}>{acc}</option>
                    ))}
                </select>
            </div>

            {/* Combined Script and Scene Textarea */}
            <div className={styles.editorWrapper}>
                <textarea
                    className={styles.scriptTextarea}
                    placeholder={`Write your script and describe the scene... (Selected duration: ${duration}s - Adjust your text length accordingly)

Example:
Script: "Hi! I'm excited to show you this amazing product that will change your life!"

Scene: Enthusiastic presentation, holding product, smiling at camera, modern office background with natural lighting`}
                    value={script}
                    onChange={(e) => handleScriptChange(e.target.value.slice(0, maxChars))}
                    maxLength={maxChars}
                    rows={8}
                />
                <div className={styles.charCounter}>
                    {script.length}/{maxChars} characters
                </div>
            </div>
        </div>
    );
}
