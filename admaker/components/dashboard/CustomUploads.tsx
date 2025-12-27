'use client';

import { useState } from 'react';
import styles from './CustomUploads.module.css';

interface CustomUploadsProps {
    onProductImageChange?: (imageUrl: string | null) => void;
    onVirtualTryOnImageChange?: (imageUrl: string | null) => void;
    lang?: 'en' | 'fr';
}

export default function CustomUploads({ onProductImageChange, onVirtualTryOnImageChange, lang = 'en' }: CustomUploadsProps) {
    const translations = {
        en: {
            title: 'Custom Elements (Optional)',
            addProduct: 'Add Product',
            virtualTryOn: 'Virtual Try-On',
            uploadProduct: 'Upload Product',
            uploadClothing: 'Upload Clothing',
            dropHere: 'Drop here',
            uploadFailed: 'Failed to upload image. Please try again.',
            invalidFile: 'Please drop a valid image file'
        },
        fr: {
            title: 'Éléments Personnalisés (Optionnel)',
            addProduct: 'Ajouter un Produit',
            virtualTryOn: 'Essayage Virtuel',
            uploadProduct: 'Télécharger Produit',
            uploadClothing: 'Télécharger Vêtement',
            dropHere: 'Déposer ici',
            uploadFailed: 'Échec du téléchargement de l\'image. Veuillez réessayer.',
            invalidFile: 'Veuillez déposer un fichier image valide'
        }
    };
    const t = translations[lang];
    const [objectImage, setObjectImage] = useState<string | null>(null);
    const [virtualTryOnImage, setVirtualTryOnImage] = useState<string | null>(null);
    const [isDraggingObject, setIsDraggingObject] = useState(false);
    const [isDraggingVirtual, setIsDraggingVirtual] = useState(false);

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // Create canvas for compression
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Calculate new dimensions (max 400px width/height for better compression)
                    let width = img.width;
                    let height = img.height;
                    const maxSize = 400;

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

                    // Convert to base64 with compression (0.6 quality for better balance)
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
                    resolve(compressedBase64);
                };
                img.onerror = reject;
                img.src = e.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'object' | 'virtualTryOn') => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Compress the image before uploading
                const compressedImage = await compressImage(file);

                // Show preview immediately
                if (type === 'object') {
                    setObjectImage(compressedImage);
                } else {
                    setVirtualTryOnImage(compressedImage);
                }

                // Upload to R2 in background
                const response = await fetch('/api/upload-product', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageData: compressedImage })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
                    throw new Error(errorData.error || 'Upload failed');
                }

                const { url } = await response.json();

                // Return R2 URL instead of base64
                if (type === 'object') {
                    onProductImageChange?.(url);
                } else {
                    onVirtualTryOnImageChange?.(url);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                alert(t.uploadFailed);
                // Clear the failed upload
                if (type === 'object') {
                    setObjectImage(null);
                    onProductImageChange?.(null);
                } else {
                    setVirtualTryOnImage(null);
                    onVirtualTryOnImageChange?.(null);
                }
            }
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

    const handleDrop = async (e: React.DragEvent<HTMLLabelElement>, type: 'object' | 'virtualTryOn') => {
        e.preventDefault();
        e.stopPropagation();

        if (type === 'object') {
            setIsDraggingObject(false);
        } else {
            setIsDraggingVirtual(false);
        }

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            try {
                // Compress the image before uploading
                const compressedImage = await compressImage(file);

                // Show preview immediately
                if (type === 'object') {
                    setObjectImage(compressedImage);
                } else {
                    setVirtualTryOnImage(compressedImage);
                }

                // Upload to R2 in background
                const response = await fetch('/api/upload-product', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ imageData: compressedImage })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
                    throw new Error(errorData.error || 'Upload failed');
                }

                const { url } = await response.json();

                // Return R2 URL instead of base64
                if (type === 'object') {
                    onProductImageChange?.(url);
                } else {
                    onVirtualTryOnImageChange?.(url);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                alert(t.uploadFailed);
                // Clear the failed upload
                if (type === 'object') {
                    setObjectImage(null);
                    onProductImageChange?.(null);
                } else {
                    setVirtualTryOnImage(null);
                    onVirtualTryOnImageChange?.(null);
                }
            }
        } else {
            alert(t.invalidFile);
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
            <h3 className={styles.uploadsTitle}>{t.title}</h3>

            <div className={styles.uploadsGrid}>
                {/* Product Upload */}
                <div className={styles.uploadItem}>
                    <label className={styles.uploadLabel}>{t.addProduct}</label>
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
                            <span>{isDraggingObject ? t.dropHere : t.uploadProduct}</span>
                        </label>
                    )}
                </div>

                {/* Virtual Try-On Upload */}
                <div className={styles.uploadItem}>
                    <label className={styles.uploadLabel}>{t.virtualTryOn}</label>
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
                            <span>{isDraggingVirtual ? t.dropHere : t.uploadClothing}</span>
                        </label>
                    )}
                </div>
            </div>
        </div>
    );
}
