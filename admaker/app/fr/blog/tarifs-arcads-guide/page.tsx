
'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import BlogVideoSidebar from '@/components/BlogVideoSidebar';

export default function BlogPost() {
    const [showStickyCta, setShowStickyCta] = useState(false);
    useEffect(() => {
        const handleScroll = () => setShowStickyCta(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const jsonLd = {"@context":"https://schema.org","@type":"Article","headline":"Meilleur guide de tarifs Arcads pour 2026","image":"/blog-images/img-1770482736177-0.png","author":{"@type":"Organization","name":"AdMaker AI"},"mainEntity":{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Qu'est-ce qu'Arcads ?","acceptedAnswer":{"@type":"Answer","text":"Arcads est un outil de création de publicités UGC populaire connu pour son IA de synchronisation labiale avancée et ses avatars réalistes."}},{"@type":"Question","name":"Combien coûte AdMaker AI ?","acceptedAnswer":{"@type":"Answer","text":"AdMaker AI offre une gamme de plans de tarification, à partir de 29 $/mois."}},{"@type":"Question","name":"Quelle est la différence entre AdMaker AI et Arcads ?","acceptedAnswer":{"@type":"Answer","text":"AdMaker AI offre une solution plus rentable et plus rapide pour créer des publicités UGC par rapport à Arcads, tandis qu'Arcads excelle dans les avatars IA hyper-réalistes et la synchronisation labiale."}},{"@type":"Question","name":"Puis-je utiliser AdMaker AI gratuitement ?","acceptedAnswer":{"@type":"Answer","text":"AdMaker AI offre une version d'essai gratuite, mais vous devrez vous inscrire à un plan payant pour accéder à toutes ses fonctionnalités."}},{"@type":"Question","name":"Comment créer une publicité UGC avec AdMaker AI ?","acceptedAnswer":{"@type":"Answer","text":"La création d'une publicité UGC avec AdMaker AI est un processus simple qui nécessite un minimum d'efforts et d'expertise. Il suffit de choisir un modèle, de télécharger vos actifs, d'ajouter du texte et de l'audio, d'appliquer les effets IA et d'exporter et de partager votre publicité."}}]}};

    return (
      <>
        <Head>
          <title>Meilleur guide de tarifs Arcads pour 2026 | AdMaker AI</title>
          <meta name="description" content="Découvrez le meilleur guide de tarifs Arcads pour 2026. Comparez les prix, les fonctionnalités et plus avec AdMaker AI, Canva et CapCut." />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </Head>
        
        <Navbar lang="fr" />
        
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-[100px] px-4 overflow-x-hidden font-sans">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
                
                {/* Left: Article */}
                <article className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 break-words">
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-white">Meilleur guide de tarifs Arcads pour 2026</h1>
                        <div className="rounded-xl overflow-hidden mb-8 border border-white/10">
                            <img src="/blog-images/img-1770482736177-0.png" alt="Meilleur guide de tarifs Arcads pour 2026" class="w-full object-cover" />
                        </div>
                    </header>

                    {/* Quick Answer */}
                    <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/30 p-8 rounded-2xl mb-12 shadow-lg">
                         <h3 className="text-[#ff0844] font-bold text-lg mb-4 uppercase tracking-wider flex items-center">
                            <span className="mr-2">⚡</span> Quick Answer
                         </h3>
                         <p className="text-blue-100 leading-relaxed text-lg font-medium">AdMaker AI offre une solution plus rentable et plus rapide pour créer des publicités UGC par rapport à Arcads, avec des prix à partir de 29 $/mois.</p>
                    </div>

                    <div 
                        className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-a:text-[#ff0844] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: htmlContent }} 
                    />

                    {/* FAQ */}
                    <section className="mt-16 pt-10 border-t border-white/10">
                        <h2 className="text-3xl font-bold mb-8 flex items-center"><span className="mr-3">❓</span> FAQ</h2>
                        <div className="space-y-6">
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">Qu'est-ce qu'Arcads ?</h3>
                                <p className="text-gray-400 leading-relaxed">Arcads est un outil de création de publicités UGC populaire connu pour son IA de synchronisation labiale avancée et ses avatars réalistes.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">Combien coûte AdMaker AI ?</h3>
                                <p className="text-gray-400 leading-relaxed">AdMaker AI offre une gamme de plans de tarification, à partir de 29 $/mois.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">Quelle est la différence entre AdMaker AI et Arcads ?</h3>
                                <p className="text-gray-400 leading-relaxed">AdMaker AI offre une solution plus rentable et plus rapide pour créer des publicités UGC par rapport à Arcads, tandis qu'Arcads excelle dans les avatars IA hyper-réalistes et la synchronisation labiale.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">Puis-je utiliser AdMaker AI gratuitement ?</h3>
                                <p className="text-gray-400 leading-relaxed">AdMaker AI offre une version d'essai gratuite, mais vous devrez vous inscrire à un plan payant pour accéder à toutes ses fonctionnalités.</p>
                            </div>
                            
                            <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition">
                                <h3 className="font-bold text-xl mb-3 text-white">Comment créer une publicité UGC avec AdMaker AI ?</h3>
                                <p className="text-gray-400 leading-relaxed">La création d'une publicité UGC avec AdMaker AI est un processus simple qui nécessite un minimum d'efforts et d'expertise. Il suffit de choisir un modèle, de télécharger vos actifs, d'ajouter du texte et de l'audio, d'appliquer les effets IA et d'exporter et de partager votre publicité.</p>
                            </div>
                            
                        </div>
                    </section>
                </article>

                {/* Right: Sticky Sidebar */}
                <aside className="hidden lg:block sticky top-[120px]">
                    <BlogVideoSidebar lang="fr" />
                </aside>

            </div>
        </div>
        
        {/* Mobile Sticky CTA */}
        <a href="/fr" className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ff0844] to-[#ff5478] text-white px-8 py-4 rounded-full font-bold shadow-[0_10px_30px_rgba(255,8,68,0.4)] z-50 transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95 ${showStickyCta ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-10'}`}>
            Create your AI Ads now 👆
        </a>

      </>
    );
}
