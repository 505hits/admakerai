'use client';

import { useState } from 'react';
import styles from './VideoUpload.module.css';

interface VideoUploadProps {
    onVideoChange?: (videoUrl: string | null) => void;
}

export default function VideoUpload({ onVideoChange }: VideoUploadProps) {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['video/mp4', 'video/quicktime', 'video/x-matroska', 'video/webm'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid video file (MP4, MOV, MKV, or WebM)');
            return;
        }

        // Validate file size (max 10MB as per API spec)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            alert('Video file size must be less than 10MB');
            return;
        }

        setIsUploading(true);

        try {
            // Upload video to R2
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload/video', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const { url } = await response.json();

            // Create preview URL for local display
            const previewUrl = URL.createObjectURL(file);
            setVideoUrl(previewUrl);

            // Pass R2 URL to parent component
            onVideoChange?.(url);
        } catch (error: any) {
            console.error('Video upload failed:', error);
            alert(error.message || 'Failed to upload video. Please try again.');
            setVideoUrl(null);
            onVideoChange?.(null);
        } finally {
            setIsUploading(false);
        }
    };

    const removeVideo = () => {
        if (videoUrl) {
            URL.revokeObjectURL(videoUrl);
        }
        setVideoUrl(null);
        onVideoChange?.(null);
    };

    return (
        <div className={styles.uploadContainer}>
            <div className={styles.uploadHeader}>
                <h3 className={styles.uploadTitle}>Upload Winning Ad Video</h3>
                <p className={styles.uploadDescription}>
                    Upload a successful ad video to replicate with a different AI actor
                </p>
            </div>

            {videoUrl ? (
                <div className={styles.preview}>
                    <video
                        src={videoUrl}
                        controls
                        className={styles.videoPreview}
                    />
                    <button
                        className={styles.removeBtn}
                        onClick={removeVideo}
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
                        accept="video/mp4,video/quicktime,video/x-matroska,video/webm"
                        onChange={handleVideoUpload}
                        className={styles.fileInput}
                        disabled={isUploading}
                    />
                    {isUploading ? (
                        <>
                            <div className={styles.spinner}></div>
                            <span>Uploading video...</span>
                        </>
                    ) : (
                        <>
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M24 8v24M24 32l-8-8M24 32l8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 36h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span>Click to upload video</span>
                            <p className={styles.uploadHint}>MP4, MOV, MKV or WebM (max 10MB)</p>
                        </>
                    )}
                </label>
            )}
        </div>
    );
}
