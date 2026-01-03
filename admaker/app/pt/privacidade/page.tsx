import Navbar from '@/components/Navbar';
import styles from '../../terms/legal.module.css';

export const metadata = {
    title: 'Política de Privacidade | AdMaker AI',
    description: 'Política de Privacidade para AdMaker AI - Como coletamos, usamos e protegemos seus dados',
};

export default function PoliticaPrivacidade() {
    return (
        <main className={styles.legalPage}>
            <Navbar lang="pt" />

            <div className={styles.legalContainer}>
                <div className="container">
                    <div className={styles.legalContent}>
                        <h1>Política de Privacidade</h1>
                        <p className={styles.lastUpdated}>Última atualização: 2 de janeiro de 2026</p>

                        <p className={styles.intro}>
                            Na AdMaker AI, estamos comprometidos em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e compartilhamos informações pessoais ("Dados Pessoais") quando você usa nossos sites, software, aplicativos e serviços associados (coletivamente, os "Serviços"). Aplica-se a indivíduos que usam diretamente nossos Serviços, mas não a dados processados sob contratos empresariais personalizados—essas relações são regidas por seus acordos específicos.
                        </p>

                        <section>
                            <h2>1. Informações que Coletamos</h2>

                            <h3>a. Informações que Você Fornece Voluntariamente</h3>
                            <p>Podemos coletar os seguintes tipos de Dados Pessoais que você envia diretamente:</p>
                            <ul>
                                <li><strong>Detalhes da Conta:</strong> Incluindo seu nome, endereço de e-mail, detalhes de pagamento e endereço de cobrança quando você se registra ou assina.</li>
                                <li><strong>Conteúdo do Usuário:</strong> Como quaisquer arquivos, scripts, imagens ou comentários que você carrega ou cria na plataforma.</li>
                                <li><strong>Histórico de Comunicação:</strong> Quaisquer mensagens enviadas à nossa equipe de suporte, envios de formulários de contato ou outras interações com clientes.</li>
                                <li><strong>Feedback e Participação:</strong> Respostas a pesquisas, formulários de feedback, concursos ou atividades promocionais.</li>
                            </ul>

                            <h3>b. Informações Coletadas Automaticamente</h3>
                            <p>Quando você interage com nossos Serviços, coletamos automaticamente:</p>
                            <ul>
                                <li><strong>Dados do Dispositivo e Técnicos:</strong> Endereço IP, tipo de navegador, sistema operacional, resolução de tela, identificadores de dispositivo e preferências de idioma.</li>
                                <li><strong>Análises de Uso:</strong> Informações sobre atividade da plataforma, seleções de avatares, modelos usados, tempo gasto em recursos e caminhos de navegação.</li>
                                <li><strong>Cookies e Tecnologias de Rastreamento:</strong> Usamos cookies e tecnologias similares para manter a funcionalidade, garantir segurança e analisar engajamento. Você pode ajustar as configurações de cookies no seu navegador, embora isso possa afetar o desempenho dos Serviços.</li>
                            </ul>

                            <h3>c. Dados de Terceiros e Plataformas Sociais</h3>
                            <p>
                                Se você interagir conosco através de plataformas de terceiros (por exemplo, Instagram, LinkedIn, YouTube), podemos coletar dados disponíveis do seu perfil público ou interações com nosso conteúdo. Isso está sujeito aos termos de privacidade dessas plataformas.
                            </p>
                        </section>

                        <section>
                            <h2>2. Como Usamos Suas Informações</h2>
                            <p>Processamos Dados Pessoais de acordo com requisitos legais aplicáveis e para fins incluindo:</p>
                            <ul>
                                <li>Criar e gerenciar contas de usuário e assinaturas.</li>
                                <li>Fornecer e melhorar nossas ferramentas de geração de conteúdo alimentadas por IA.</li>
                                <li>Monitorar padrões de uso para melhorar o desempenho e a experiência do usuário.</li>
                                <li>Fornecer atualizações, suporte e comunicações de serviço importantes.</li>
                                <li>Detectar uso indevido, riscos de segurança ou atividade fraudulenta.</li>
                                <li>Melhorar nossos sistemas de IA e treinar modelos (a menos que você opte por não participar).</li>
                                <li>Cumprir obrigações legais e fazer cumprir nossos termos de serviço.</li>
                            </ul>
                            <p>
                                Também podemos usar dados desidentificados ou agregados para análises, desenvolvimento de produtos ou insights de marketing. Esses dados não podem identificá-lo e não são considerados Dados Pessoais.
                            </p>
                        </section>

                        <section>
                            <h2>3. Conteúdo de IA e Treinamento de Modelos</h2>
                            <p>
                                Ao usar a AdMaker AI, você pode inserir entradas (por exemplo, prompts, scripts) que geram saídas de IA. Essas interações podem ser usadas para refinar nossos modelos de IA e melhorar o desempenho da plataforma. Você pode solicitar a exclusão deste uso entrando em contato conosco em <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>. A exclusão pode reduzir a capacidade da plataforma de adaptar resultados às suas preferências.
                            </p>
                        </section>

                        <section>
                            <h2>4. Como Compartilhamos Dados Pessoais</h2>
                            <p>Seus dados podem ser compartilhados nas seguintes situações:</p>
                            <ul>
                                <li><strong>Provedores de Serviços:</strong> Contamos com fornecedores confiáveis para serviços como hospedagem em nuvem, análises, processamento de pagamentos e suporte. Esses provedores são autorizados a processar dados apenas em nosso nome.</li>
                                <li><strong>Mudanças Comerciais:</strong> Se a AdMaker AI passar por uma fusão, aquisição, venda de ativos ou reestruturação, os dados do usuário podem ser transferidos para a organização sucessora.</li>
                                <li><strong>Requisitos Legais:</strong> Podemos divulgar suas informações se exigido por lei, regulamento, processo legal ou solicitação governamental.</li>
                                <li><strong>Compartilhamento Público:</strong> Quando você publica deliberadamente conteúdo na AdMaker AI (por exemplo, postando depoimentos ou vídeos gerados por usuários), suas informações compartilhadas podem ser visíveis para outros.</li>
                            </ul>
                            <p>
                                <strong>Não vendemos seus dados</strong> e não compartilhamos Dados Pessoais com terceiros não afiliados para publicidade comportamental.
                            </p>
                        </section>

                        <section>
                            <h2>5. Seus Direitos e Escolhas</h2>
                            <p>Dependendo da sua localização, você pode ter direitos legais em relação aos seus Dados Pessoais, incluindo:</p>
                            <ul>
                                <li><strong>Acesso:</strong> Solicitar uma cópia dos Dados Pessoais que mantemos sobre você.</li>
                                <li><strong>Retificação:</strong> Solicitar correção de dados imprecisos ou incompletos.</li>
                                <li><strong>Exclusão:</strong> Pedir-nos para excluir seus dados, sujeito a certas exceções.</li>
                                <li><strong>Restrição:</strong> Solicitar limites sobre como seus dados são processados.</li>
                                <li><strong>Objeção:</strong> Objetar ao processamento, particularmente para marketing direto.</li>
                                <li><strong>Portabilidade de Dados:</strong> Receber seus dados em formato portátil.</li>
                                <li><strong>Retirar Consentimento:</strong> Quando o consentimento é a base legal, você pode retirá-lo a qualquer momento.</li>
                                <li><strong>Registrar uma Reclamação:</strong> Contatar sua autoridade local de proteção de dados.</li>
                            </ul>
                            <p>
                                Para exercer qualquer um desses direitos, entre em contato conosco em <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>. Podemos exigir verificação de identidade antes de processar tais solicitações.
                            </p>
                        </section>

                        <section>
                            <h2>6. Retenção de Dados</h2>
                            <p>
                                Retemos Dados Pessoais apenas pelo tempo necessário para cumprir seu propósito original ou cumprir requisitos legais. Os períodos de retenção variam com base no tipo de dados, como são usados e regulamentos aplicáveis. Uma vez que não sejam mais necessários, os dados são excluídos com segurança ou anonimizados.
                            </p>
                        </section>

                        <section>
                            <h2>7. Segurança</h2>
                            <p>
                                Levamos a segurança de dados a sério e implementamos medidas técnicas e organizacionais para proteger suas informações. Estas podem incluir criptografia, controles de acesso baseados em função, firewalls e armazenamento em nuvem seguro.
                            </p>
                            <p>
                                No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro. Embora nos esforcemos para proteger seus Dados Pessoais, não podemos garantir segurança absoluta.
                            </p>
                        </section>

                        <section>
                            <h2>8. Transferências Internacionais</h2>
                            <p>
                                Ao usar a AdMaker AI, você reconhece que seus dados podem ser transferidos e processados em países diferentes do seu, incluindo jurisdições que podem não oferecer leis de proteção de dados equivalentes. Quando necessário, implementamos salvaguardas apropriadas (como Cláusulas Contratuais Padrão) para garantir que seus dados permaneçam protegidos durante tais transferências.
                            </p>
                        </section>

                        <section>
                            <h2>9. Base Legal para Processamento</h2>
                            <p>Processamos Dados Pessoais apenas quando legalmente justificado. Isso inclui:</p>
                            <ul>
                                <li><strong>Execução de um Contrato:</strong> Para fornecer os Serviços aos quais você se inscreveu.</li>
                                <li><strong>Interesses Legítimos:</strong> Para operação da plataforma, análises, segurança e suporte ao usuário.</li>
                                <li><strong>Consentimento:</strong> Quando você concorda ativamente com recursos opcionais como e-mails de marketing.</li>
                                <li><strong>Conformidade Legal:</strong> Quando exigido por regulamento ou lei.</li>
                            </ul>
                            <p>Você pode retirar o consentimento a qualquer momento para processamento baseado em consentimento.</p>
                        </section>

                        <section>
                            <h2>10. Links de Terceiros</h2>
                            <p>
                                Os Serviços podem incluir links para sites ou ferramentas de terceiros. Estes operam independentemente e têm suas próprias políticas de privacidade. A AdMaker AI não é responsável pelas práticas de dados de sites de terceiros que você acessa através de nossa plataforma.
                            </p>
                        </section>

                        <section>
                            <h2>11. Privacidade de Crianças</h2>
                            <p>
                                Nossos Serviços não são direcionados a crianças menores de 13 anos. Não coletamos conscientemente Dados Pessoais de crianças menores de 13 anos. Se você acredita que coletamos informações de uma criança menor de 13 anos, entre em contato conosco imediatamente em <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>.
                            </p>
                        </section>

                        <section>
                            <h2>12. Atualizações desta Política</h2>
                            <p>
                                Podemos atualizar esta Política de Privacidade de tempos em tempos. Quando exigido por lei, notificaremos você diretamente por e-mail ou mensagem no aplicativo. Seu uso continuado dos Serviços após atualizações indica aceitação da política revisada.
                            </p>
                        </section>

                        <section>
                            <h2>13. Informações de Contato</h2>
                            <p>
                                Se você tiver alguma dúvida sobre esta Política de Privacidade ou nossas práticas de dados, entre em contato conosco em:
                            </p>
                            <p>
                                <strong>Email:</strong> <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>


        </main>
    );
}
