'use client';

import { useState } from 'react';
import styles from './ProductImageUpload.module.css';

interface ProductImageUploadProps {
    onImageChange: (imageUrl: string | null) => void;
}

export default function ProductImageUpload({ onImageChange }: ProductImageUploadProps) {
    const [productImage, setProductImage] = useState<string | null>(null);

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // Create canvas for compression
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Calculate new dimensions (max 800px width/height)
                    let width = img.width;
                    let height = img.height;
                    const maxSize = 600;

                    if (width > height) {
                        if (width > maxSize) {
                            height = (height * maxSize) / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width = (width * maxSize) / height;
                            height = maxSize;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    // Draw and compress
                    ctx?.drawImage(img, 0, 0, width, height);

                    // Convert to base64 with 0.7 quality (JPEG compression)
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.5);
                    resolve(compressedBase64);
                };
                img.onerror = reject;
                img.src = e.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Compress image first
                const compressedImage = await compressImage(file);

                // Show preview immediately
                setProductImage(compressedImage);

                // Upload to R2 in background
                const response = await fetch('/api/upload-product', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageData: compressedImage })
                });

                if (!response.ok) {
                    throw new Error('Upload failed');
                }

                const { url } = await response.json();

                // Return R2 URL instead of base64
                onImageChange(url);
            } catch (error) {
                console.error('Image upload failed:', error);
                // Fallback to base64 if upload fails
                onImageChange(compressedImage);
            }
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
