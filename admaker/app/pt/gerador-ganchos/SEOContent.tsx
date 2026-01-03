import Link from 'next/link';
import styles from '../../hook-generator/SEOContent.module.css';

export default function SEOContent() {
    return (
        <section className={styles.seoContent}>
            <div className="container">
                {/* Main Title */}
                <div className={styles.mainHeader}>
                    <h2 className={styles.mainTitle}>
                        Gerador de Ganchos: Crie Anúncios de Vídeo Irresistíveis em Segundos
                    </h2>
                    <p className={styles.intro}>
                        Você tem <strong>3 segundos</strong>. Esse é todo o tempo que você tem para capturar a atenção antes que seu público continue rolando.
                        No mundo competitivo do vídeo UGC e publicidade em mídias sociais, seu gancho determina se sua campanha
                        gera milhões de visualizações ou se perde no feed.
                    </p>
                    <p className={styles.intro}>
                        O gerador de ganchos com IA da <Link href="/pt" className={styles.inlineLink}>AdMakerAI</Link> transforma suas ideias em linhas de abertura convincentes que param a rolagem e
                        geram conversões. Reconhecido como uma das principais <Link href="/pt" className={styles.inlineLink}>plataformas de IA para criar vídeos de marca UGC</Link>, analisamos milhões de
                        anúncios de alto desempenho para entregar ganchos testados e otimizados que realmente funcionam.
                    </p>
                </div>

                {/* Why Hooks Matter */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Por Que um Gancho Poderoso Muda Tudo para suas Criatividades Publicitárias</h3>
                    <p className={styles.text}>
                        Os primeiros 3 segundos do seu vídeo representam <strong>85% da sua taxa de retenção</strong>. Um anúncio de IA com um
                        gancho fraco é como abrir uma loja sem vitrine: ninguém entra. Marcas que dominam as mídias sociais não deixam
                        isso ao acaso. Elas testam dezenas de ganchos até encontrar aquele que ressoa com seu público-alvo.
                    </p>
                    <p className={styles.text}>
                        O problema? Criar ganchos eficazes leva horas de brainstorming, testes A/B e análise de dados. É aí que
                        entra nosso gerador UGC com IA. Em segundos, gere linhas de abertura calibradas adaptadas ao seu nicho, tom e
                        objetivos de conversão.
                    </p>
                </div>

                {/* How It Works - Detailed */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Como Funciona Nosso Gerador de Ganchos</h3>

                    <div className={styles.stepsList}>
                        <div className={styles.stepItem}>
                            <div className={styles.stepNumber}>1</div>
                            <div className={styles.stepContent}>
                                <h4>Descreva seu Conceito</h4>
                                <p>Simplesmente insira seu produto, público-alvo e o problema que você resolve. Nossa IA entende instantaneamente seu
                                    contexto de marketing. Seja vendendo cursos online, produtos de e-commerce, serviços B2B ou listagens imobiliárias,
                                    o algoritmo se adapta à sua indústria.</p>
                            </div>
                        </div>

                        <div className={styles.stepItem}>
                            <div className={styles.stepNumber}>2</div>
                            <div className={styles.stepContent}>
                                <h4>A IA Analisa e Cria</h4>
                                <p>Em segundos, nossa tecnologia—treinada em milhões de criatividades publicitárias bem-sucedidas—gera múltiplas
                                    variações de ganchos otimizados. Cada sugestão é calibrada para maximizar a atenção nesses críticos primeiros 3 segundos.</p>
                            </div>
                        </div>

                        <div className={styles.stepItem}>
                            <div className={styles.stepNumber}>3</div>
                            <div className={styles.stepContent}>
                                <h4>Escolha e Personalize</h4>
                                <p>Receba instantaneamente 3 ganchos diferentes: perguntas provocativas, estatísticas chocantes, histórias pessoais,
                                    revelações secretas e aberturas baseadas em urgência. Selecione aquele que melhor se alinha com a voz da sua marca.</p>
                            </div>
                        </div>

                        <div className={styles.stepItem}>
                            <div className={styles.stepNumber}>4</div>
                            <div className={styles.stepContent}>
                                <h4>Lance sua Produção</h4>
                                <p>Integre seu gancho diretamente em seu fluxo de trabalho de criação. A plataforma da AdMakerAI permite que você produza
                                    vídeos completos com atores IA, edição automatizada e geração de legendas—tudo em menos de 10 minutos.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Examples */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Exemplos de Ganchos Gerados por IA que Convertem</h3>

                    <div className={styles.examplesList}>
                        <div className={styles.exampleItem}>
                            <h4>Para Marcas de Cuidados com a Pele <span className={styles.audience}>(público feminino 25-35)</span></h4>
                            <p className={styles.hookExample}>
                                "Você está gastando R$200 em cremes anti-idade que não funcionam. Esta dermatologista revela por que 94% dos produtos falham..."
                            </p>
                        </div>

                        <div className={styles.exampleItem}>
                            <h4>Para Coaches de Negócios <span className={styles.audience}>(empreendedores, fundadores de startups)</span></h4>
                            <p className={styles.hookExample}>
                                "Perdi R$50K em anúncios do Facebook antes de descobrir esta fórmula de gancho. Agora estou em R$2M/ano—aqui está exatamente o que mudou..."
                            </p>
                        </div>

                        <div className={styles.exampleItem}>
                            <h4>Para Produtos SaaS <span className={styles.audience}>(B2B, tomadores de decisão tecnológica)</span></h4>
                            <p className={styles.hookExample}>
                                "Seu concorrente acabou de automatizar o que leva 40 horas por semana para sua equipe. Aqui está a ferramenta que eles estão usando..."
                            </p>
                        </div>

                        <div className={styles.exampleItem}>
                            <h4>Para E-commerce <span className={styles.audience}>(compradores impulsivos, descoberta de produtos)</span></h4>
                            <p className={styles.hookExample}>
                                "Isso esgotou 3 vezes em 24 horas. A Amazon tentou proibir. Aqui está por que todos estão obcecados..."
                            </p>
                        </div>
                    </div>

                    <p className={styles.text}>
                        Esses ganchos funcionam porque seguem padrões comprovados: criam lacunas de curiosidade, desafiam suposições, prometem
                        transformações específicas ou revelam informações privilegiadas. Nosso gerador de ganchos aplica esses princípios automaticamente
                        à sua proposta de valor única.
                    </p>
                </div>

                {/* Why Choose AdMakerAI */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Por Que Profissionais de Marketing Escolhem o Gerador de Ganchos da AdMakerAI</h3>

                    <div className={styles.featureGrid}>
                        <div className={styles.featureCard}>
                            <h4>📊 Desempenho Baseado em Dados</h4>
                            <p>Ao contrário de ferramentas de IA genéricas, nosso gerador de ganchos é especificamente treinado em criatividades publicitárias de alta conversão em
                                múltiplas plataformas. Cada sugestão vem de dados de desempenho real, não de modelos genéricos.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <h4>🎯 Otimização Específica por Indústria</h4>
                            <p>Seja você de e-commerce, SaaS, educação, finanças, saúde e bem-estar, ou imobiliário, nossa IA entende
                                a linguagem específica da indústria, requisitos de conformidade e psicologia do público.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <h4>🎬 Produção de Vídeo Completa</h4>
                            <p>Nosso gerador de ganchos não é independente—é parte de um ecossistema completo de criação de vídeos. Gere seu gancho,
                                depois produza imediatamente o vídeo completo usando nossas ferramentas de IA.</p>
                        </div>

                        <div className={styles.featureCard}>
                            <h4>💰 Criatividade Econômica</h4>
                            <p>Contratar redatores para criar variações de roteiros publicitários custa centenas por iteração. Nossa ferramenta permite que você experimente
                                com variações ilimitadas a uma fração do custo.</p>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Perguntas Frequentes</h3>

                    <div className={styles.faqList}>
                        <div className={styles.faqItem}>
                            <h4>O que torna este o melhor gerador de ganchos para anúncios de vídeo?</h4>
                            <p>Nosso gerador de ganchos é especificamente treinado em milhões de anúncios de vídeo de alto desempenho em plataformas sociais. Ao contrário de ferramentas de escrita de IA genéricas, cada sugestão é otimizada para engajamento de vídeo e padrões de conversão testados.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>Como a AdMakerAI se compara a outras ferramentas de produção de vídeo UGC?</h4>
                            <p>Quando você compara preços de ferramentas de produção de vídeo UGC, a AdMakerAI oferece o melhor valor com geração ilimitada de ganchos, atores IA e produção de vídeo completa em uma única plataforma.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>Posso usar isso para vídeos de marketing imobiliário?</h4>
                            <p>Absolutamente! A AdMakerAI é o melhor serviço de criação de vídeo UGC para marketing imobiliário. Nosso gerador de ganchos cria linhas de abertura convincentes para listagens de propriedades, tours virtuais e depoimentos de agentes.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>Quantos ganchos posso gerar gratuitamente?</h4>
                            <p>Usuários gratuitos obtêm 10 gerações de ganchos para começar. Usuários Pro obtêm gerações ilimitadas, tornando-o perfeito para agências e marcas executando múltiplas campanhas.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>Posso criar anúncios de vídeo UGC com atores IA?</h4>
                            <p>Sim! A AdMakerAI se especializa em anúncios de vídeo UGC com IA. Depois de gerar seu gancho, crie imediatamente vídeos com nossos atores IA que entregam sua mensagem de forma autêntica.</p>
                        </div>

                        <div className={styles.faqItem}>
                            <h4>Quão rápido posso começar a ver resultados?</h4>
                            <p>A maioria dos usuários gera seu primeiro gancho de alto desempenho em 2 minutos. O tempo da ideia ao vídeo finalizado é em média de 8-12 minutos na AdMakerAI.</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className={styles.finalCta}>
                    <h3>Transforme sua Publicidade em Vídeo Hoje</h3>
                    <p>
                        Pare de adivinhar qual gancho funcionará. Pare de desperdiçar orçamento em vídeos que não convertem porque os primeiros 3 segundos
                        falharam em engajar. O gerador de ganchos da AdMakerAI oferece a vantagem competitiva da criatividade baseada em dados.
                    </p>
                    <p>
                        Junte-se a <strong>20.000+ profissionais de marketing</strong> que já usam a AdMakerAI para criar conteúdo irresistível que converte.
                    </p>
                    <Link href="/pt/pagamento" className={styles.ctaButton}>
                        Começar Grátis
                    </Link>
                </div>
            </div>
        </section>
    );
}
