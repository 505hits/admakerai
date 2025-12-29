import styles from './Hero.module.css';

interface HeroProps {
    lang?: 'en' | 'fr' | 'es' | 'pt' | 'ko' | 'de' | 'ja' | 'ar';
}

export default function Hero({ lang = 'en' }: HeroProps) {
    const content = {
        en: {
            socialProof: 'Trusted by 20,000+ ecom players & teams',
            title: 'Create AI UGC Ads ',
            titleHighlight: 'in Minutes',
            subtitle: 'The fastest way to create AI video ads',
            description: 'Write your script → Choose an avatar → Generate your video',
            ctaPrimary: 'Create your first ad',
            ctaSecondary: 'Watch demo',
            stat1: '100k+ videos generated',
            stat2: '2.8x ROAS',
            stat3: '95% Customer Satisfaction'
        },
        fr: {
            socialProof: 'Approuvé par plus de 20 000 e-commerçants et équipes',
            title: 'Créez des Publicités UGC IA ',
            titleHighlight: 'Rapidement',
            subtitle: 'Le moyen le plus rapide de créer des publicités vidéo IA',
            description: 'Écrivez votre script → Choisissez un avatar → Générez votre vidéo',
            ctaPrimary: 'Créez votre première pub',
            ctaSecondary: 'Voir la démo',
            stat1: '100k+ vidéos générées',
            stat2: '2.8x ROAS',
            stat3: '95% de satisfaction client'
        },
        es: {
            socialProof: 'Confiado por más de 20,000 jugadores y equipos de e-commerce',
            title: 'Crea Anuncios UGC con IA ',
            titleHighlight: 'en Minutos',
            subtitle: 'La forma más rápida de crear anuncios de video con IA',
            description: 'Escribe tu guión → Elige un avatar → Genera tu video',
            ctaPrimary: 'Crea tu primer anuncio',
            ctaSecondary: 'Ver demo',
            stat1: '100k+ videos generados',
            stat2: '2.8x ROAS',
            stat3: '95% Satisfacción del Cliente'
        },
        pt: {
            socialProof: 'Confiado por mais de 20.000 jogadores e equipes de e-commerce',
            title: 'Crie Anúncios UGC com IA ',
            titleHighlight: 'em Minutos',
            subtitle: 'A maneira mais rápida de criar anúncios de vídeo com IA',
            description: 'Escreva seu script → Escolha um avatar → Gere seu vídeo',
            ctaPrimary: 'Começar gratuitamente',
            ctaSecondary: 'Ver demonstração',
            stat1: '100k+ vídeos gerados',
            stat2: '2.8x ROAS',
            stat3: '95% Satisfação do Cliente'
        },
        ko: {
            socialProof: '20,000명 이상의 플레이어와 전자상거래 팀이 신뢰합니다',
            title: 'AI UGC 광고를 ',
            titleHighlight: '몇 분 안에 제작',
            subtitle: 'AI 비디오 광고를 만드는 가장 빠른 방법',
            description: '스크립트 작성 → 아바타 선택 → 비디오 생성',
            ctaPrimary: '무료로 시작하기',
            ctaSecondary: '데모 보기',
            stat1: '100k+ 생성된 비디오',
            stat2: '2.8x ROAS',
            stat3: '95% 고객 만족도'
        },
        de: {
            socialProof: 'Vertraut von über 20.000 E-Commerce-Akteuren & Teams',
            title: 'Erstellen Sie KI-UGC-Anzeigen ',
            titleHighlight: 'in Minuten',
            subtitle: 'Der schnellste Weg, KI-Videoanzeigen zu erstellen',
            description: 'Schreiben Sie Ihr Skript → Wählen Sie einen Avatar → Generieren Sie Ihr Video',
            ctaPrimary: 'Erstellen Sie Ihre erste Anzeige',
            ctaSecondary: 'Demo ansehen',
            stat1: '100k+ generierte Videos',
            stat2: '2.8x ROAS',
            stat3: '95% Kundenzufriedenheit'
        },
        ja: {
            socialProof: '20,000人以上のeコマースプレイヤーとチームから信頼されています',
            title: 'AI UGC広告を',
            titleHighlight: '数分で作成',
            subtitle: 'AI動画広告を作成する最速の方法',
            description: 'スクリプトを書く → アバターを選択 → 動画を生成',
            ctaPrimary: '最初の広告を作成',
            ctaSecondary: 'デモを見る',
            stat1: '100k以上の動画を生成',
            stat2: '2.8x ROAS',
            stat3: '95% 顧客満足度'
        },
        ar: {
            socialProof: 'موثوق به من قبل أكثر من 20,000 لاعب وفريق في التجارة الإلكترونية',
            title: 'إنشاء إعلانات UGC بالذكاء الاصطناعي ',
            titleHighlight: 'في دقائق',
            subtitle: 'أسرع طريقة لإنشاء إعلانات فيديو بالذكاء الاصطناعي',
            description: 'اكتب النص → اختر الصورة الرمزية → أنشئ الفيديو',
            ctaPrimary: 'إنشاء أول إعلان',
            ctaSecondary: 'مشاهدة العرض التوضيحي',
            stat1: 'أكثر من 100 ألف فيديو تم إنشاؤه',
            stat2: '2.8x عائد على الإنفاق الإعلاني',
            stat3: '95% رضا العملاء'
        }
    };

    const t = content[lang] || content['en'];

    // Determine the login URL based on language
    const loginUrl = lang === 'fr' ? '/fr/connexion' : lang === 'es' ? '/es/iniciar-sesion' : lang === 'pt' ? '/pt/conexao' : lang === 'ko' ? '/ko/login' : lang === 'de' ? '/de/anmelden' : lang === 'ja' ? '/ja/login' : lang === 'ar' ? '/ar/login' : '/login';

    return (
        <section className={styles.hero}>
            <div className={styles.heroGlow}></div>
            <div className="container">
                <div className={styles.heroContent}>
                    {/* Social Proof */}
                    <div className={styles.socialProof}>
                        <div className={styles.avatarGroup}>
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                                alt="User"
                                className={styles.avatar}
                            />
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                                alt="User"
                                className={styles.avatar}
                            />
                            <img
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces"
                                alt="User"
                                className={styles.avatar}
                            />
                            <img
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"
                                alt="User"
                                className={styles.avatar}
                            />
                        </div>
                        <div className={styles.socialProofContent}>
                            <div className={styles.stars}>
                                <span>⭐</span>
                                <span>⭐</span>
                                <span>⭐</span>
                                <span>⭐</span>
                                <span>⭐</span>
                            </div>
                            <p className={styles.socialProofText}>{t.socialProof}</p>
                        </div>
                    </div>

                    <h1 className={styles.heroTitle}>
                        {t.title}
                        <span className="gradient-text-red">{t.titleHighlight}</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        {t.subtitle}
                    </p>
                    <p className={styles.heroDescription}>
                        {t.description}
                    </p>
                    <div className={styles.heroCta}>
                        <a href={loginUrl} className={styles.btnPrimaryLarge}>
                            {t.ctaPrimary}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>

                    {/* Stats Social Proof */}
                    <div className={styles.statsProof}>
                        <div className={styles.statItem}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.statIcon}>
                                <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className={styles.statText}>{t.stat1}</span>
                        </div>
                        <div className={styles.statItem}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.statIcon}>
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className={styles.statText}>{t.stat2}</span>
                        </div>
                        <div className={styles.statItem}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.statIcon}>
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span className={styles.statText}>{t.stat3}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
