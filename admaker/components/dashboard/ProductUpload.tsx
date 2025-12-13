'use client';

import { useState } from 'react';
import styles from './ProductUpload.module.css';

export default function ProductUpload() {
    const [productImage, setProductImage] = useState<string | null>(null);
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

    return (
        <div className={styles.uploadContainer}>
            <div className={styles.uploadHeader}>
                <h2 className={styles.uploadTitle}>Add Media (Optional)</h2>
                <span className={styles.uploadSubtitle}>Upload product or background images for your video</span>
            </div>

            <div className={styles.uploadsGrid}>
                {/* Product Upload */}
                <div className={styles.uploadSection}>
                    <label className={styles.uploadLabel}>Product Image</label>
                    <div className={styles.uploadArea}>
                        {!productImage ? (
                            <div className={styles.uploadBox}>
                                <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                                    <rect x="6" y="10" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="15" cy="17" r="2.5" stroke="currentColor" strokeWidth="2" />
                                    <path d="M6 25l7-7 5 5 7-7 9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p>Upload Product</p>
                                <span>PNG, JPG up to 10MB</span>
                                <button className={styles.uploadBtn}>
                                    Choose File
                                </button>
                            </div>
                        ) : (
                            <div className={styles.previewBox}>
                                <img src={productImage} alt="Product" />
                                <button
                                    className={styles.removeBtn}
                                    onClick={() => setProductImage(null)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 4l8 8M4 12L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Background Upload */}
                <div className={styles.uploadSection}>
                    <label className={styles.uploadLabel}>Background/Decor</label>
                    <div className={styles.uploadArea}>
                        {!backgroundImage ? (
                            <div className={styles.uploadBox}>
                                <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                                    <rect x="4" y="8" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
                                    <path d="M4 26l8-8 6 6 8-8 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p>Upload Background</p>
                                <span>PNG, JPG up to 10MB</span>
                                <button className={styles.uploadBtn}>
                                    Choose File
                                </button>
                            </div>
                        ) : (
                            <div className={styles.previewBox}>
                                <img src={backgroundImage} alt="Background" />
                                <button
                                    className={styles.removeBtn}
                                    onClick={() => setBackgroundImage(null)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 4l8 8M4 12L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
