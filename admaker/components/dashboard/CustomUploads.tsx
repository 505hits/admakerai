'use client';

import { useState } from 'react';
import styles from './CustomUploads.module.css';

interface CustomUploadsProps {
    onProductImageChange?: (imageUrl: string | null) => void;
    onVirtualTryOnImageChange?: (imageUrl: string | null) => void;
}

export default function CustomUploads({ onProductImageChange, onVirtualTryOnImageChange }: CustomUploadsProps) {
    const [objectImage, setObjectImage] = useState<string | null>(null);
    const [virtualTryOnImage, setVirtualTryOnImage] = useState<string | null>(null);
    const [isDraggingObject, setIsDraggingObject] = useState(false);
    const [isDraggingVirtual, setIsDraggingVirtual] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'object' | 'virtualTryOn') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                if (type === 'object') {
                    setObjectImage(result);
                    onProductImageChange?.(result);
                } else {
                    setVirtualTryOnImage(result);
                    onVirtualTryOnImageChange?.(result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>, type: 'object' | 'virtualTryOn') => {
        e.preventDefault();
        e.stopPropagation();
        if (type === 'object') {
            setIsDraggingObject(true);
        } else {
            setIsDraggingVirtual(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>, type: 'object' | 'virtualTryOn') => {
        e.preventDefault();
        e.stopPropagation();
        if (type === 'object') {
            setIsDraggingObject(false);
        } else {
            setIsDraggingVirtual(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>, type: 'object' | 'virtualTryOn') => {
        e.preventDefault();
        e.stopPropagation();

        if (type === 'object') {
            setIsDraggingObject(false);
        } else {
            setIsDraggingVirtual(false);
        }

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                if (type === 'object') {
                    setObjectImage(result);
                    onProductImageChange?.(result);
                } else {
                    setVirtualTryOnImage(result);
                    onVirtualTryOnImageChange?.(result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please drop a valid image file');
        }
    };

    const removeImage = (type: 'object' | 'virtualTryOn') => {
        if (type === 'object') {
            setObjectImage(null);
            onProductImageChange?.(null);
        } else {
            setVirtualTryOnImage(null);
            onVirtualTryOnImageChange?.(null);
        }
    };

    return (
        <div className={styles.uploadsContainer}>
            <h3 className={styles.uploadsTitle}>Custom Elements (Optional)</h3>

            <div className={styles.uploadsGrid}>
                {/* Product Upload */}
                <div className={styles.uploadItem}>
                    <label className={styles.uploadLabel}>Add Product</label>
                    {objectImage ? (
                        <div className={styles.preview}>
                            <img src={objectImage} alt="Product" />
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
                        <label
                            className={`${styles.uploadBox} ${isDraggingObject ? styles.dragging : ''}`}
                            onDragOver={(e) => handleDragOver(e, 'object')}
                            onDragLeave={(e) => handleDragLeave(e, 'object')}
                            onDrop={(e) => handleDrop(e, 'object')}
                        >
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
                            <span>{isDraggingObject ? 'Drop here' : 'Upload Product'}</span>
                        </label>
                    )}
                </div>

                {/* Virtual Try-On Upload */}
                <div className={styles.uploadItem}>
                    <label className={styles.uploadLabel}>Virtual Try-On</label>
                    {virtualTryOnImage ? (
                        <div className={styles.preview}>
                            <img src={virtualTryOnImage} alt="Clothing" />
                            <button
                                className={styles.removeBtn}
                                onClick={() => removeImage('virtualTryOn')}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M4 4l8 8M4 12l8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <label
                            className={`${styles.uploadBox} ${isDraggingVirtual ? styles.dragging : ''}`}
                            onDragOver={(e) => handleDragOver(e, 'virtualTryOn')}
                            onDragLeave={(e) => handleDragLeave(e, 'virtualTryOn')}
                            onDrop={(e) => handleDrop(e, 'virtualTryOn')}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'virtualTryOn')}
                                className={styles.fileInput}
                            />
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <path d="M8 6h12M8 6a2 2 0 012-2h8a2 2 0 012 2M8 6v2m12-2v2M8 8h12v12a2 2 0 01-2 2h-8a2 2 0 01-2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 12v6M16 12v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span>{isDraggingVirtual ? 'Drop here' : 'Upload Clothing'}</span>
                        </label>
                    )}
                </div>
            </div>
        </div>
    );
}
