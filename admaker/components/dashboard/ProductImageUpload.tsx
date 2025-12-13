'use client';

import { useState } from 'react';
import styles from './ProductImageUpload.module.css';

interface ProductImageUploadProps {
    onImageChange: (imageUrl: string | null) => void;
}

export default function ProductImageUpload({ onImageChange }: ProductImageUploadProps) {
    const [productImage, setProductImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setProductImage(result);
                onImageChange(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setProductImage(null);
        onImageChange(null);
    };

    return (
        <div className={styles.uploadContainer}>
            <div className={styles.uploadHeader}>
                <h3 className={styles.uploadTitle}>Add Product (Optional)</h3>
                <p className={styles.uploadDescription}>
                    Upload a product image to showcase in your video
                </p>
            </div>

            {productImage ? (
                <div className={styles.preview}>
                    <img src={productImage} alt="Product" />
                    <button
                        className={styles.removeBtn}
                        onClick={removeImage}
                        type="button"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M5 5l10 10M5 15l10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            ) : (
                <label className={styles.uploadBox}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className={styles.fileInput}
                    />
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="8" y="12" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
                        <circle cx="18" cy="20" r="3" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 30l8-8 6 6 8-8 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className={styles.uploadText}>Click to upload product image</span>
                    <span className={styles.uploadHint}>PNG, JPG up to 10MB</span>
                </label>
            )}

            <div className={styles.infoBox}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 4v4M8 10h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>The product will appear alongside your AI actor in the video</span>
            </div>
        </div>
    );
}
