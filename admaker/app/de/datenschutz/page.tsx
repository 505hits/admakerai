import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../../terms/legal.module.css';

export const metadata = {
    title: 'Datenschutzrichtlinie | AdMaker AI',
    description: 'Datenschutzrichtlinie für AdMaker AI - Wie wir Ihre Daten sammeln, verwenden und schützen',
};

export default function Datenschutzrichtlinie() {
    return (
        <main className={styles.legalPage}>
            <Navbar lang="de" />

            <div className={styles.legalContainer}>
                <div className="container">
                    <div className={styles.legalContent}>
                        <h1>Datenschutzrichtlinie</h1>
                        <p className={styles.lastUpdated}>Letzte Aktualisierung: 2. Januar 2026</p>

                        <p className={styles.intro}>
                            Chez AdMaker AI, nous nous engageons à protéger votre vie privée. Cette Politique de confidentialité explique comment nous collectons, utilisons, stockons et partageons les informations personnelles ("Données personnelles") lorsque vous utilisez nos sites web, logiciels, applications et services associés (collectivement, les "Services"). Elle s'applique aux personnes qui utilisent directement nos Services, mais pas aux données traitées dans le cadre de contrats d'entreprise sur mesure—ces relations sont régies par leurs accords spécifiques.
                        </p>

                        <section>
                            <h2>1. Informations que nous collectons</h2>

                            <h3>a. Informations que vous fournissez volontairement</h3>
                            <p>Nous pouvons collecter les types suivants de Données personnelles que vous soumettez directement :</p>
                            <ul>
                                <li><strong>Détails du compte :</strong> Y compris votre nom, adresse e-mail, détails de paiement et adresse de facturation lorsque vous vous inscrivez ou vous abonnez.</li>
                                <li><strong>Contenu utilisateur :</strong> Tels que tous les fichiers, scripts, images ou commentaires que vous téléchargez ou créez sur la plateforme.</li>
                                <li><strong>Historique de communication :</strong> Tous les messages envoyés à notre équipe d'assistance, soumissions de formulaires de contact ou autres interactions avec les clients.</li>
                                <li><strong>Commentaires et participation :</strong> Réponses aux enquêtes, formulaires de commentaires, concours ou activités promotionnelles.</li>
                            </ul>

                            <h3>b. Informations collectées automatiquement</h3>
                            <p>Lorsque vous interagissez avec nos Services, nous collectons automatiquement :</p>
                            <ul>
                                <li><strong>Données sur l'appareil et techniques :</strong> Adresse IP, type de navigateur, système d'exploitation, résolution d'écran, identifiants d'appareil et préférences linguistiques.</li>
                                <li><strong>Analyses d'utilisation :</strong> Informations sur l'activité de la plateforme, sélections d'avatars, modèles utilisés, temps passé sur les fonctionnalités et chemins de navigation.</li>
                                <li><strong>Cookies et technologies de suivi :</strong> Nous utilisons des cookies et des technologies similaires pour maintenir la fonctionnalité, assurer la sécurité et analyser l'engagement. Vous pouvez ajuster les paramètres des cookies dans votre navigateur, bien que cela puisse affecter le fonctionnement des Services.</li>
                            </ul>

                            <h3>c. Données provenant de tiers et de plateformes sociales</h3>
                            <p>
                                Si vous interagissez avec nous via des plateformes tierces (par exemple, Instagram, LinkedIn, YouTube), nous pouvons collecter des données disponibles à partir de votre profil public ou de vos interactions avec notre contenu. Ceci est soumis aux conditions de confidentialité de ces plateformes.
                            </p>
                        </section>

                        <section>
                            <h2>2. Comment nous utilisons vos informations</h2>
                            <p>Nous traitons les Données personnelles conformément aux exigences légales applicables et à des fins incluant :</p>
                            <ul>
                                <li>Créer et gérer les comptes utilisateurs et les abonnements.</li>
                                <li>Fournir et améliorer nos outils de génération de contenu alimentés par l'IA.</li>
                                <li>Surveiller les modèles d'utilisation pour améliorer les performances et l'expérience utilisateur.</li>
                                <li>Fournir des mises à jour, une assistance et des communications de service importantes.</li>
                                <li>Détecter les abus, les risques de sécurité ou les activités frauduleuses.</li>
                                <li>Améliorer nos systèmes d'IA et former des modèles (sauf si vous vous désabonnez).</li>
                                <li>Remplir les obligations légales et faire respecter nos conditions de service.</li>
                            </ul>
                            <p>
                                Nous pouvons également utiliser des données désidentifiées ou agrégées pour l'analyse, le développement de produits ou les informations marketing. Ces données ne peuvent pas vous identifier et ne sont pas considérées comme des Données personnelles.
                            </p>
                        </section>

                        <section>
                            <h2>3. Contenu IA et Formation de modèles</h2>
                            <p>
                                Lorsque vous utilisez AdMaker AI, vous pouvez saisir des entrées (par exemple, des invites, des scripts) qui génèrent des sorties IA. Ces interactions peuvent être utilisées pour affiner nos modèles d'IA et améliorer les performances de la plateforme. Vous pouvez demander à vous désabonner de cette utilisation en nous contactant à <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>. Le désabonnement peut réduire la capacité de la plateforme à adapter les résultats à vos préférences.
                            </p>
                        </section>

                        <section>
                            <h2>4. Comment nous partageons les Données personnelles</h2>
                            <p>Vos données peuvent être partagées dans les situations suivantes :</p>
                            <ul>
                                <li><strong>Fournisseurs de services :</strong> Nous comptons sur des fournisseurs de confiance pour des services tels que l'hébergement cloud, l'analyse, le traitement des paiements et l'assistance. Ces fournisseurs sont autorisés à traiter les données uniquement en notre nom.</li>
                                <li><strong>Changements d'entreprise :</strong> Si AdMaker AI fait l'objet d'une fusion, d'une acquisition, d'une vente d'actifs ou d'une restructuration, les données des utilisateurs peuvent être transférées à l'organisation successeur.</li>
                                <li><strong>Exigences légales :</strong> Nous pouvons divulguer vos informations si la loi, la réglementation, une procédure judiciaire ou une demande gouvernementale l'exige.</li>
                                <li><strong>Partage public :</strong> Lorsque vous publiez délibérément du contenu sur AdMaker AI (par exemple, en publiant des témoignages ou des vidéos générées par les utilisateurs), vos informations partagées peuvent être visibles par d'autres.</li>
                            </ul>
                            <p>
                                <strong>Nous ne vendons pas vos données</strong> et nous ne partageons pas les Données personnelles avec des tiers non affiliés à des fins de publicité comportementale.
                            </p>
                        </section>

                        <section>
                            <h2>5. Vos droits et choix</h2>
                            <p>Selon votre emplacement, vous pouvez avoir des droits légaux concernant vos Données personnelles, notamment :</p>
                            <ul>
                                <li><strong>Accès :</strong> Demander une copie des Données personnelles que nous détenons à votre sujet.</li>
                                <li><strong>Rectification :</strong> Demander la correction de données inexactes ou incomplètes.</li>
                                <li><strong>Effacement :</strong> Nous demander de supprimer vos données, sous réserve de certaines exceptions.</li>
                                <li><strong>Restriction :</strong> Demander des limites sur la façon dont vos données sont traitées.</li>
                                <li><strong>Objection :</strong> S'opposer au traitement, en particulier pour le marketing direct.</li>
                                <li><strong>Portabilité des données :</strong> Recevoir vos données dans un format portable.</li>
                                <li><strong>Retirer le consentement :</strong> Lorsque le consentement est la base légale, vous pouvez le retirer à tout moment.</li>
                                <li><strong>Déposer une plainte :</strong> Contacter votre autorité locale de protection des données.</li>
                            </ul>
                            <p>
                                Pour exercer l'un de ces droits, veuillez nous contacter à <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>. Nous pouvons exiger une vérification d'identité avant de traiter de telles demandes.
                            </p>
                        </section>

                        <section>
                            <h2>6. Conservation des données</h2>
                            <p>
                                Nous conservons les Données personnelles uniquement aussi longtemps que nécessaire pour remplir leur objectif initial ou pour nous conformer aux exigences légales. Les périodes de conservation varient en fonction du type de données, de la façon dont elles sont utilisées et des réglementations applicables. Une fois qu'elles ne sont plus nécessaires, les données sont supprimées en toute sécurité ou anonymisées.
                            </p>
                        </section>

                        <section>
                            <h2>7. Sécurité</h2>
                            <p>
                                Nous prenons la sécurité des données au sérieux et mettons en œuvre des mesures techniques et organisationnelles pour protéger vos informations. Celles-ci peuvent inclure le cryptage, les contrôles d'accès basés sur les rôles, les pare-feu et le stockage cloud sécurisé.
                            </p>
                            <p>
                                Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est sécurisée à 100%. Bien que nous nous efforcions de protéger vos Données personnelles, nous ne pouvons pas garantir une sécurité absolue.
                            </p>
                        </section>

                        <section>
                            <h2>8. Transferts internationaux</h2>
                            <p>
                                En utilisant AdMaker AI, vous reconnaissez que vos données peuvent être transférées et traitées dans des pays autres que le vôtre, y compris des juridictions qui peuvent ne pas offrir des lois de protection des données équivalentes. Lorsque cela est requis, nous mettons en œuvre des garanties appropriées (telles que les Clauses contractuelles types) pour garantir que vos données restent protégées pendant ces transferts.
                            </p>
                        </section>

                        <section>
                            <h2>9. Base légale du traitement</h2>
                            <p>Nous ne traitons les Données personnelles que lorsque cela est légalement justifié. Cela inclut :</p>
                            <ul>
                                <li><strong>Exécution d'un contrat :</strong> Pour fournir les Services auxquels vous vous êtes abonné.</li>
                                <li><strong>Intérêts légitimes :</strong> Pour le fonctionnement de la plateforme, l'analyse, la sécurité et l'assistance aux utilisateurs.</li>
                                <li><strong>Consentement :</strong> Lorsque vous acceptez activement des fonctionnalités facultatives comme les e-mails marketing.</li>
                                <li><strong>Conformité légale :</strong> Lorsque la réglementation ou la loi l'exige.</li>
                            </ul>
                            <p>Vous pouvez retirer votre consentement à tout moment pour le traitement basé sur le consentement.</p>
                        </section>

                        <section>
                            <h2>10. Liens vers des tiers</h2>
                            <p>
                                Les Services peuvent inclure des liens vers des sites ou des outils tiers. Ceux-ci fonctionnent de manière indépendante et ont leurs propres politiques de confidentialité. AdMaker AI n'est pas responsable des pratiques de données des sites tiers auxquels vous accédez via notre plateforme.
                            </p>
                        </section>

                        <section>
                            <h2>11. Confidentialité des enfants</h2>
                            <p>
                                Nos Services ne sont pas destinés aux enfants de moins de 13 ans. Nous ne collectons pas sciemment de Données personnelles auprès d'enfants de moins de 13 ans. Si vous pensez que nous avons collecté des informations auprès d'un enfant de moins de 13 ans, veuillez nous contacter immédiatement à <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>.
                            </p>
                        </section>

                        <section>
                            <h2>12. Mises à jour de cette politique</h2>
                            <p>
                                Nous pouvons mettre à jour cette Politique de confidentialité de temps à autre. Lorsque la loi l'exige, nous vous informerons directement par e-mail ou par message dans l'application. Votre utilisation continue des Services après les mises à jour indique l'acceptation de la politique révisée.
                            </p>
                        </section>

                        <section>
                            <h2>13. Coordonnées</h2>
                            <p>
                                Si vous avez des questions concernant cette Politique de confidentialité ou nos pratiques en matière de données, veuillez nous contacter à :
                            </p>
                            <p>
                                <strong>Email :</strong> <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer lang="de" />
        </main>
    );
}
