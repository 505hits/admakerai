'use client';

import { useState } from 'react';
import styles from './CancellationSurvey.module.css';

interface CancellationSurveyProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirmCancellation: () => void;
}

export default function CancellationSurvey({ isOpen, onClose, onConfirmCancellation }: CancellationSurveyProps) {
    const [step, setStep] = useState(0);
    const [reason, setReason] = useState('');
    const [feedback, setFeedback] = useState('');

    if (!isOpen) return null;

    const reasons = [
        "Too expensive / Not worth the cost",
        "Technical issues / Bugs",
        "Not using it enough",
        "Found a better alternative",
        "Missing features",
        "Project completed",
        "Other"
    ];

    const nextStep = () => {
        setStep(prev => prev + 1);
    };

    const isLastStep = step === 5;

    const renderContent = () => {
        switch (step) {
            case 0: // Reason
                return (
                    <>
                        <h2 className={styles.title}>Why are you leaving?</h2>
                        <p className={styles.description}>We're sorry to see you go. Help us improve by selecting a reason.</p>
                        <div className={styles.options}>
                            {reasons.map((r, i) => (
                                <button
                                    key={i}
                                    className={`${styles.optionBtn} ${reason === r ? styles.selected : ''}`}
                                    onClick={() => setReason(r)}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </>
                );

            case 1: // Frequency
                return (
                    <>
                        <h2 className={styles.title}>How often did you use AdMaker?</h2>
                        <p className={styles.description}>Understanding your usage patterns helps us serve you better.</p>
                        <div className={styles.options}>
                            {['Daily', 'Weekly', 'Monthly', 'Rarely'].map((option, i) => (
                                <button
                                    key={i}
                                    className={`${styles.optionBtn} ${feedback === option ? styles.selected : ''}`}
                                    onClick={() => setFeedback(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </>
                );

            case 2: // Satisfaction
                return (
                    <>
                        <h2 className={styles.title}>How was your experience?</h2>
                        <p className={styles.description}>Rate the overall quality of your generated videos.</p>
                        <div className={styles.options} style={{ flexDirection: 'row', justifyContent: 'center', gap: '1rem' }}>
                            {['😡', '😕', '😐', '🙂', '😍'].map((emoji, i) => (
                                <button
                                    key={i}
                                    className={styles.optionBtn}
                                    style={{ fontSize: '2rem', padding: '0.5rem 1rem' }}
                                    onClick={nextStep}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </>
                );

            case 3: // Feedback
                return (
                    <>
                        <h2 className={styles.title}>What could we have done better?</h2>
                        <p className={styles.description}>Your feedback directly influences our roadmap.</p>
                        <textarea
                            className={styles.textarea}
                            placeholder="Tell us what features were missing or what went wrong..."
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                    </>
                );

            case 4: // Recommendation
                return (
                    <>
                        <h2 className={styles.title}>Would you recommend us?</h2>
                        <p className={styles.description}>To a friend or colleague looking for AI video ads.</p>
                        <div className={styles.options}>
                            <button className={styles.optionBtn} onClick={nextStep}>Yes, definitely</button>
                            <button className={styles.optionBtn} onClick={nextStep}>Maybe</button>
                            <button className={styles.optionBtn} onClick={nextStep}>No, probably not</button>
                        </div>
                    </>
                );

            case 5: // FINAL WARNING
                return (
                    <>
                        <div className={styles.warningIcon}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </div>
                        <h2 className={styles.title} style={{ color: '#ff0844' }}>Wait! Are you absolutely sure?</h2>
                        <p className={styles.description}>Canceling now means you will <strong>immediately lose access</strong> to:</p>

                        <div className={styles.warningList}>
                            <div className={styles.warningItem}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>All your remaining credits</span>
                            </div>
                            <div className={styles.warningItem}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>Access to your generated videos</span>
                            </div>
                            <div className={styles.warningItem}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>Data retention & history</span>
                            </div>
                            <div className={styles.warningItem}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>Priority support access</span>
                            </div>
                        </div>

                        <p className={styles.description} style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            This action cannot be undone. Your data may be permanently deleted.
                        </p>
                    </>
                );
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.progressBar} style={{ width: `${(step / 5) * 100}%` }} />

                <button className={styles.closeBtn} onClick={onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className={styles.content}>
                    {renderContent()}
                </div>

                <div className={styles.actions}>
                    {isLastStep ? (
                        <>
                            <button className={styles.btnKeep} onClick={onClose}>
                                Keep My Subscription
                            </button>
                            <button className={styles.btnDanger} onClick={onConfirmCancellation}>
                                I understand, cancel now
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className={styles.btnPrimary}
                                onClick={onClose}
                                style={{ background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)', color: '#fff', border: 'none' }}
                            >
                                Keep My Subscription
                            </button>
                            <button
                                className={styles.btnSecondary}
                                onClick={nextStep}
                                disabled={step === 0 && !reason}
                                style={{ opacity: (step === 0 && !reason) ? 0.5 : 1 }}
                            >
                                Next Step →
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
