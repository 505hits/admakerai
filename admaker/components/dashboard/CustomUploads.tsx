'use client';

import { useState } from 'react';
import styles from './CustomUploads.module.css';

export default function CustomUploads() {
    const [objectImage, setObjectImage] = useState<string | null>(null);
    const [headImage, setHeadImage] = useState<string | null>(null);
    const [decorImage, setDecorImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'object' | 'head' | 'decor') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                if (type === 'object') setObjectImage(result);
                else if (type === 'head') setHeadImage(result);
                else setDecorImage(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (type: 'object' | 'head' | 'decor') => {
        if (type === 'object') setObjectImage(null);
        else if (type === 'head') setHeadImage(null);
        else setDecorImage(null);
    };

    return (
        <div className={styles.uploadsContainer}>
            <h3 className={styles.uploadsTitle}>Custom Elements (Optional)</h3>

            <div className={styles.uploadsGrid}>
                {/* Object Upload */}
                <div className={styles.uploadItem}>
                    <label className={styles.uploadLabel}>Object</label>
                    {objectImage ? (
                        <div className={styles.preview}>
                            <img src={objectImage} alt="Object" />
                            <button
                                className={styles.removeBtn}
                                onClick={() => removeImage('object')}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 4l8 8M4 12l8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <label className={styles.uploadBox}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'object')}
                                className={styles.fileInput}
                            />
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <rect x="4" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                                <circle cx="10" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
                                <path d="M4 17l5-5 4 4 5-5 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span>Upload</span>
                        </label>
                    )}
                </div>

                {/* Head Upload */}
                <div className={styles.uploadItem}>
                    <label className={styles.uploadLabel}>Head/Face</label>
                    {headImage ? (
                        <div className={styles.preview}>
                            <img src={headImage} alt="Head" />
                            <button
                                className={styles.removeBtn}
                                onClick={() => removeImage('head')}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 4l8 8M4 12l8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <label className={styles.uploadBox}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'head')}
                                className={styles.fileInput}
                            />
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <circle cx="14" cy="11" r="4" stroke="currentColor" strokeWidth="2" />
                                <path d="M7 23a7 7 0 0114 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span>Upload</span>
                        </label>
                    )}
                </div>

                {/* Decor Upload */}
                <div className={styles.uploadItem}>
                    <label className={styles.uploadLabel}>Decor/Background</label>
                    {decorImage ? (
                        <div className={styles.preview}>
                            <img src={decorImage} alt="Decor" />
                            <button
                                className={styles.removeBtn}
                                onClick={() => removeImage('decor')}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 4l8 8M4 12l8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <label className={styles.uploadBox}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'decor')}
                                className={styles.fileInput}
                            />
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <rect x="3" y="6" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                                <path d="M3 18l6-6 4 4 6-6 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span>Upload</span>
                        </label>
                    )}
                </div>
            </div>
        </div>
    );
}
