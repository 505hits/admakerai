import styles from './VideoAgent.module.css';
import { getMediaUrl } from '../lib/cloudflare-config';

export default function VideoAgent() {
    return (
        <section className={styles.videoAgent}>
            <div className="container">
                <div className={styles.agentContent}>
                    <div className={styles.agentText}>
                        <h2>Meet <span className="gradient-text-red">Video Agent</span></h2>
                        <p className={styles.agentSubtitle}>Create viral content with our AI Video Agent</p>
                        <p className={styles.agentDescription}>
                            Our cutting-edge AI technology analyzes viral trends, optimizes your script, and generates videos that captivate your audience. It's like having a complete production team at your disposal, 24/7.
                        </p>
                        <ul className={styles.agentFeatures}>
                            <li>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 13L9 17L19 7" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Automatic trend analysis</span>
                            </li>
                            <li>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 13L9 17L19 7" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Real-time script optimization</span>
                            </li>
                            <li>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 13L9 17L19 7" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Multi-format generation (16:9, 9:16, 1:1)</span>
                            </li>
                            <li>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 13L9 17L19 7" stroke="#ff0844" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Export ready for all platforms</span>
                            </li>
                        </ul>
                        <a href="#" className={styles.btnPrimary}>Try Video Agent</a>
                    </div>
                    <div className={styles.agentVisual}>
                        <div className={styles.agentGlow}></div>
                        <img
                            src={getMediaUrl('avatars-showcase.png')}
                            alt="AI Avatars Showcase"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: '16px',
                                boxShadow: '0 20px 60px rgba(255, 8, 68, 0.3)'
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
