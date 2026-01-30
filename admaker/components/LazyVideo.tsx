'use client';

import { useRef, useEffect, useState } from 'react';

interface LazyVideoProps {
    src: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function LazyVideo({ src, className, style }: LazyVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        // Start loading the video
                        if (!hasLoaded) {
                            video.src = src;
                            video.load();
                            setHasLoaded(true);
                        }
                        // Play when visible
                        video.play().catch(() => {
                            // Autoplay might be blocked, that's ok
                        });
                    } else {
                        setIsVisible(false);
                        // Pause when not visible to save resources
                        video.pause();
                    }
                });
            },
            {
                rootMargin: '100px', // Start loading slightly before visible
                threshold: 0.1,
            }
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, [src, hasLoaded]);

    return (
        <video
            ref={videoRef}
            autoPlay={false}
            loop
            muted
            playsInline
            preload="none"
            className={className}
            style={style}
        />
    );
}
