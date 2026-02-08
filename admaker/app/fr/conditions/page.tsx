import Navbar from '@/components/Navbar';
import styles from '../../terms/legal.module.css';

export const metadata = {
    title: 'Conditions d\'utilisation | AdMaker AI',
    description: 'Conditions d\'utilisation pour AdMaker AI - Plateforme de création de vidéos UGC par IA',
};

export default function ConditionsUtilisation() {
    return (
        <main className={styles.legalPage}>
            <Navbar lang="fr" />

            <div className={styles.legalContainer}>
                <div className="container">
                    <div className={styles.legalContent}>
                        <h1>Conditions d'utilisation</h1>
                        <p className={styles.lastUpdated}>Dernière mise à jour : 2 janvier 2026</p>

                        <p className={styles.intro}>
                            Les présentes Conditions d'utilisation ("Conditions") régissent votre accès et votre utilisation de tous les services, plateformes, sites web, logiciels et outils (collectivement, les "Services") fournis par AdMaker AI ("nous", "notre" ou "nos"). En accédant ou en utilisant l'un de nos Services, vous acceptez d'être lié par ces Conditions et de vous conformer à toutes les lois et réglementations applicables. Si vous n'acceptez pas une partie de ces Conditions, vous ne devez pas utiliser les Services.
                        </p>

                        <section>
                            <h2>1. Nature des Services et Clause de non-responsabilité légale</h2>
                            <p>
                                AdMaker AI fournit une plateforme de création vidéo alimentée par l'IA qui permet aux utilisateurs de générer du contenu marketing, y compris des vidéos de style UGC, en utilisant l'intelligence artificielle générative. Tout le contenu généré via les Services est produit automatiquement par des systèmes d'apprentissage automatique.
                            </p>
                            <p>
                                Vous reconnaissez que les résultats de la plateforme sont générés par machine et qu'il est de votre responsabilité de vous assurer que toute utilisation de ce contenu est conforme aux lois applicables, aux normes publicitaires, aux directives des plateformes et aux réglementations du secteur.
                            </p>
                            <p>
                                Nous ne garantissons pas l'exactitude factuelle, la conformité légale ou l'adéquation commerciale de tout contenu généré par l'IA. Vous êtes seul responsable de tout contenu que vous créez, publiez ou distribuez en utilisant AdMaker AI.
                            </p>
                        </section>

                        <section>
                            <h2>2. Licence et Exigences d'abonnement</h2>
                            <p>
                                Tout accès au contenu généré par AdMaker AI—y compris, mais sans s'y limiter, les scripts, vidéos, avatars ou données connexes—est subordonné à un abonnement payant actif ou à des crédits disponibles.
                            </p>
                            <p>
                                Tant que votre abonnement est actif ou que vous disposez de crédits disponibles, vous bénéficiez d'une licence limitée, non exclusive et révocable pour utiliser le contenu généré conformément à ces Conditions. Cette licence prend fin immédiatement en cas d'annulation, d'expiration ou de suspension de votre abonnement et d'épuisement de tous les crédits.
                            </p>
                            <p>
                                Aucun droit, licence ou autorisation n'est accordé aux utilisateurs sans abonnement actif ou crédits disponibles, sauf indication contraire dans un accord commercial écrit.
                            </p>
                        </section>

                        <section>
                            <h2>3. Éligibilité et Responsabilité du compte</h2>
                            <p>
                                Pour utiliser les Services, vous devez avoir au moins 13 ans ou l'âge minimum légal dans votre juridiction. Si vous avez moins de 18 ans, vous devez avoir l'autorisation et la supervision d'un parent ou d'un tuteur légal, qui accepte ces Conditions en votre nom.
                            </p>
                            <p>
                                Vous acceptez de fournir des informations exactes et à jour lors de la création d'un compte AdMaker AI. Vous êtes seul responsable de la sécurité de vos identifiants de connexion et de toute activité effectuée via votre compte. Le partage de votre compte ou de vos identifiants de connexion avec des tiers est interdit.
                            </p>
                            <p>
                                Si vous vous inscrivez au nom d'une entreprise ou d'une organisation, vous confirmez que vous avez l'autorité d'accepter ces Conditions en son nom.
                            </p>
                        </section>

                        <section>
                            <h2>4. Propriété du contenu et Propriété intellectuelle</h2>
                            <p>
                                Vous conservez tous les droits sur tout matériel que vous téléchargez sur la plateforme en tant qu'entrée ("Input"). Sous réserve de ces Conditions, et dans la mesure permise par la loi, AdMaker AI vous cède tous les droits qu'elle pourrait détenir sur le contenu généré par l'IA résultant ("Output").
                            </p>
                            <p>
                                En raison de la nature de l'IA générative, un contenu similaire ou identique peut être produit pour d'autres utilisateurs. Nous ne garantissons pas que tout Output sera unique. Toute propriété intellectuelle associée aux Services—y compris la plateforme, le code source, les modèles, les données et l'image de marque—reste la propriété exclusive d'AdMaker AI.
                            </p>
                        </section>

                        <section>
                            <h2>5. Utilisation éthique de l'IA, Droits à l'image et Conformité aux plateformes</h2>
                            <p>
                                En utilisant la plateforme AdMaker AI, vous acceptez d'utiliser tout contenu généré par l'IA de manière éthique, légale et conformément aux réglementations applicables. Vous ne pouvez télécharger, modifier ou générer des images, vidéos ou ressemblances qui ne représentent ou ne ressemblent pas à une personne réelle et identifiable, sauf si vous avez obtenu le consentement explicite, éclairé et vérifiable de cette personne pour chaque utilisation et chaque génération.
                            </p>
                            <p>
                                Vous déclarez et garantissez que vous détenez tous les droits, autorisations et autorité légale nécessaires pour utiliser toute ressemblance, image ou donnée personnelle soumise ou générée via la plateforme.
                            </p>
                            <p>
                                Vous acceptez en outre que vous êtes seul responsable de vous assurer que tout contenu généré par l'IA créé à l'aide d'AdMaker AI est conforme aux règles, politiques et exigences de divulgation de toute plateforme tierce sur laquelle ce contenu est publié, y compris, mais sans s'y limiter, les exigences d'étiquetage ou de catégorisation du contenu comme généré par l'IA, synthétique ou modifié numériquement.
                            </p>
                            <p>
                                AdMaker AI se réserve le droit de suspendre ou de résilier l'accès en cas de détection ou de suspicion raisonnable d'utilisation abusive, de contenu non consensuel, d'usurpation d'identité ou de non-conformité réglementaire.
                            </p>
                        </section>

                        <section>
                            <h2>6. Facturation, Paiements et Conditions d'abonnement</h2>
                            <p>
                                Tous les tarifs des Services sont clairement affichés au moment de l'achat. En vous abonnant, vous autorisez les frais récurrents sur votre mode de paiement sélectionné en fonction de votre cycle de facturation choisi.
                            </p>
                            <p>
                                Les frais ne sont pas remboursables sauf si la loi l'exige. Nous pouvons réviser nos tarifs à tout moment, mais tous les tarifs seront clairement étiquetés sur la plateforme, et aucun frais au nouveau tarif ne sera appliqué sans notification et confirmation. Vous pouvez annuler votre abonnement avant le prochain cycle de facturation si vous n'acceptez pas le nouveau prix.
                            </p>
                            <p>
                                Si votre paiement échoue ou est annulé, votre compte peut être suspendu jusqu'à ce que le paiement soit résolu. Vous êtes responsable de toutes les taxes applicables. Nous pouvons engager des poursuites judiciaires pour recouvrer les montants en souffrance.
                            </p>
                        </section>

                        <section>
                            <h2>7. Disponibilité du service et Résiliation</h2>
                            <p>
                                Nous nous réservons le droit de modifier, suspendre ou interrompre toute partie des Services à tout moment. Si vous détenez un abonnement actif, vous pouvez être éligible à un remboursement au prorata lorsque la loi l'exige.
                            </p>
                            <p>
                                Nous pouvons suspendre ou résilier votre accès à tout moment si nous déterminons que vous avez violé ces Conditions, utilisé abusivement la plateforme ou créé un risque juridique, technique ou de réputation indu.
                            </p>
                            <p>
                                Nous nous réservons également le droit de résilier les comptes inactifs après 12 mois d'inactivité sans abonnement actif. Vous pouvez fermer votre compte à tout moment via votre tableau de bord de compte ou en contactant notre équipe d'assistance.
                            </p>
                        </section>

                        <section>
                            <h2>8. Clause de non-responsabilité et Limitation de responsabilité</h2>
                            <p>
                                Les Services sont fournis "tels quels" et "selon disponibilité". Dans toute la mesure permise par la loi, AdMaker AI décline toutes garanties, expresses ou implicites, y compris l'adéquation à un usage particulier, la qualité marchande et la non-violation.
                            </p>
                            <p>
                                Nous ne garantissons pas que les Services ou tout contenu généré par l'IA seront précis, ininterrompus ou exempts d'erreurs. Dans la mesure maximale permise par la loi, nous ne serons pas responsables de toute perte indirecte, accessoire ou consécutive, y compris la perte de profits, de données ou d'opportunités commerciales.
                            </p>
                            <p>
                                Notre responsabilité totale ne dépassera pas le montant le plus élevé entre 100 $ ou le montant que vous avez payé à AdMaker AI au cours des 12 mois précédant la réclamation.
                            </p>
                        </section>

                        <section>
                            <h2>9. Indemnisation</h2>
                            <p>
                                Si vous utilisez AdMaker AI au nom d'une entreprise ou d'une organisation, vous acceptez d'indemniser et de dégager de toute responsabilité AdMaker AI et les membres de son équipe de toute réclamation, dommage, coût ou frais juridiques découlant de :
                            </p>
                            <ul>
                                <li>Votre utilisation des Services ;</li>
                                <li>Votre violation de ces Conditions ;</li>
                                <li>Votre violation de toute loi ou droit de tiers.</li>
                            </ul>
                        </section>

                        <section>
                            <h2>10. Réclamations pour violation de droits d'auteur</h2>
                            <p>
                                Si vous pensez que votre propriété intellectuelle a été violée par du contenu généré à l'aide d'AdMaker AI, vous pouvez soumettre un avis à <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a> incluant :
                            </p>
                            <ul>
                                <li>Votre nom et coordonnées ;</li>
                                <li>Une description de l'œuvre protégée par le droit d'auteur ;</li>
                                <li>Une déclaration sous peine de parjure que l'utilisation n'est pas autorisée ;</li>
                                <li>Votre signature (physique ou électronique).</li>
                            </ul>
                            <p>
                                Nous examinerons toutes les réclamations légitimes conformément aux lois applicables sur la propriété intellectuelle.
                            </p>
                        </section>

                        <section>
                            <h2>11. Conditions générales</h2>
                            <p>
                                Ces Conditions représentent l'accord complet entre vous et AdMaker AI concernant l'utilisation des Services. Elles remplacent tout accord antérieur ou contemporain.
                            </p>
                            <p>
                                Vous ne pouvez pas transférer ou céder vos droits en vertu de ces Conditions sans notre consentement écrit. Nous pouvons transférer nos droits à tout successeur ou service affilié.
                            </p>
                            <p>
                                Si une disposition de ces Conditions est jugée invalide ou inapplicable, les dispositions restantes resteront pleinement en vigueur. Le non-respect de toute disposition ne constituera pas une renonciation à nos droits.
                            </p>
                        </section>

                        <section>
                            <h2>12. Coordonnées</h2>
                            <p>
                                Si vous avez des questions concernant ces Conditions, veuillez nous contacter à :
                            </p>
                            <p>
                                <strong>Email :</strong> <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>


        </main>
    );
}
