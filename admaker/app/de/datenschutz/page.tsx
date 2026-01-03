import Navbar from '@/components/Navbar';
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
                            Bei AdMaker AI verpflichten wir uns, Ihre Privatsphäre zu schützen. Diese Datenschutzrichtlinie erklärt, wie wir personenbezogene Daten ("Personenbezogene Daten") sammeln, verwenden, speichern und weitergeben, wenn Sie unsere Websites, Software, Anwendungen und zugehörigen Dienste (zusammen die "Dienste") nutzen. Sie gilt für Personen, die unsere Dienste direkt nutzen, jedoch nicht für Daten, die im Rahmen maßgeschneiderter Unternehmensverträge verarbeitet werden—diese Beziehungen werden durch ihre spezifischen Vereinbarungen geregelt.
                        </p>

                        <section>
                            <h2>1. Welche Informationen wir sammeln</h2>

                            <h3>a. Von Ihnen freiwillig bereitgestellte Informationen</h3>
                            <p>Wir können die folgenden Arten von personenbezogenen Daten sammeln, die Sie direkt übermitteln:</p>
                            <ul>
                                <li><strong>Kontodetails:</strong> Einschließlich Name, E-Mail-Adresse, Zahlungsdetails und Rechnungsadresse bei Registrierung oder Abonnement.</li>
                                <li><strong>Benutzerinhalte:</strong> Alle Dateien, Skripte, Bilder oder Kommentare, die Sie auf die Plattform hochladen oder erstellen.</li>
                                <li><strong>Kommunikationsverlauf:</strong> Alle Nachrichten, die an unser Support-Team gesendet werden, Kontaktformular-Einreichungen oder andere Kundeninteraktionen.</li>
                                <li><strong>Feedback und Teilnahme:</strong> Antworten auf Umfragen, Feedback-Formulare, Wettbewerbe oder Werbeaktivitäten.</li>
                            </ul>

                            <h3>b. Automatisch gesammelte Informationen</h3>
                            <p>Wenn Sie mit den Diensten interagieren, sammeln wir automatisch:</p>
                            <ul>
                                <li><strong>Geräte- und technische Daten:</strong> IP-Adresse, Browsertyp, Betriebssystem, Bildschirmauflösung, Gerätekennungen und Spracheinstellungen.</li>
                                <li><strong>Nutzungsanalysen:</strong> Informationen über Plattformaktivitäten, Avatar-Auswahl, verwendete Vorlagen, für Funktionen aufgewendete Zeit und Navigationspfade.</li>
                                <li><strong>Cookies und Tracking-Technologien:</strong> Wir verwenden Cookies und ähnliche Technologien, um Funktionen aufrechtzuerhalten, Sicherheit zu gewährleisten und Engagement zu analysieren. Sie können Ihre Cookie-Einstellungen in Ihrem Browser anpassen, dies kann jedoch die Leistung der Dienste beeinträchtigen.</li>
                            </ul>

                            <h3>c. Daten von Dritten und sozialen Plattformen</h3>
                            <p>
                                Wenn Sie über Drittplattformen (wie Instagram, LinkedIn, YouTube) mit uns interagieren, können wir Daten sammeln, die über öffentliche Profile oder Ihre Interaktionen mit unseren Inhalten verfügbar sind, vorbehaltlich der Datenschutzbedingungen dieser Plattformen.
                            </p>
                        </section>

                        <section>
                            <h2>2. Wie wir Ihre Informationen verwenden</h2>
                            <p>Wir verarbeiten personenbezogene Daten in Übereinstimmung mit geltenden rechtlichen Anforderungen und verwenden sie für folgende Zwecke:</p>
                            <ul>
                                <li>Erstellung und Verwaltung von Benutzerkonten und Abonnements.</li>
                                <li>Bereitstellung und Verbesserung von KI-gestützten Inhaltserstellungstools.</li>
                                <li>Überwachung von Nutzungsmustern zur Verbesserung von Leistung und Benutzererfahrung.</li>
                                <li>Bereitstellung von Updates, Support und wichtigen Dienstkommunikationen.</li>
                                <li>Erkennung von Missbrauch, Sicherheitsrisiken oder betrügerischem Verhalten.</li>
                                <li>Verbesserung von KI-Systemen und Trainingsmodellen (sofern Sie sich nicht abgemeldet haben).</li>
                                <li>Erfüllung rechtlicher Verpflichtungen und Durchsetzung der Nutzungsbedingungen.</li>
                            </ul>
                            <p>
                                Wir können auch deidentifizierte oder aggregierte Daten für Analysen, Produktentwicklung oder Marketing-Einblicke verwenden. Diese Daten können Sie nicht identifizieren und werden nicht als personenbezogene Daten betrachtet.
                            </p>
                        </section>

                        <section>
                            <h2>3. KI-Inhalte und Modelltraining</h2>
                            <p>
                                Bei der Nutzung von AdMaker AI können Sie Eingaben (Prompts, Skripte usw.) eingeben, um KI-Ausgaben zu generieren. Diese Interaktionen können verwendet werden, um KI-Modelle zu verfeinern und die Plattformleistung zu verbessern. Sie können sich von dieser Verwendung abmelden, indem Sie <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a> kontaktieren. Die Abmeldung kann die Fähigkeit der Plattform verringern, Ergebnisse auf Ihre Präferenzen abzustimmen.
                            </p>
                        </section>

                        <section>
                            <h2>4. Wie wir personenbezogene Daten weitergeben</h2>
                            <p>Ihre Daten können unter folgenden Umständen weitergegeben werden:</p>
                            <ul>
                                <li><strong>Dienstleister:</strong> Wir verlassen uns auf vertrauenswürdige Anbieter für Dienste wie Cloud-Hosting, Analysen, Zahlungsabwicklung und Support. Diese Anbieter sind nur berechtigt, Daten in unserem Auftrag zu verarbeiten.</li>
                                <li><strong>Geschäftsänderungen:</strong> Wenn AdMaker AI eine Fusion, Übernahme, einen Vermögensverkauf oder eine Umstrukturierung durchläuft, können Benutzerdaten an die Nachfolgeorganisation übertragen werden.</li>
                                <li><strong>Rechtliche Anforderungen:</strong> Wir können Ihre Informationen offenlegen, wenn dies durch Gesetz, Vorschriften, Gerichtsverfahren oder behördliche Anfragen erforderlich ist.</li>
                                <li><strong>Öffentliche Weitergabe:</strong> Wenn Sie absichtlich Inhalte auf AdMaker AI veröffentlichen (wie Testimonials oder Einreichungen von benutzergenerierten Videos), können geteilte Informationen für andere sichtbar sein.</li>
                            </ul>
                            <p>
                                <strong>Wir verkaufen Ihre Daten nicht</strong> und geben personenbezogene Daten nicht an nicht verbundene Dritte für Verhaltenswerbung weiter.
                            </p>
                        </section>

                        <section>
                            <h2>5. Ihre Rechte und Wahlmöglichkeiten</h2>
                            <p>Je nach Standort können Sie rechtliche Rechte in Bezug auf Ihre personenbezogenen Daten haben, einschließlich:</p>
                            <ul>
                                <li><strong>Zugriff:</strong> Anfordern einer Kopie der personenbezogenen Daten, die wir über Sie haben.</li>
                                <li><strong>Berichtigung:</strong> Anfordern der Korrektur ungenauer oder unvollständiger Daten.</li>
                                <li><strong>Löschung:</strong> Anfordern der Löschung Ihrer Daten, vorbehaltlich bestimmter Ausnahmen.</li>
                                <li><strong>Einschränkung:</strong> Anfordern von Einschränkungen, wie Ihre Daten verarbeitet werden.</li>
                                <li><strong>Widerspruch:</strong> Widerspruch gegen die Verarbeitung, insbesondere für Direktmarketing.</li>
                                <li><strong>Datenübertragbarkeit:</strong> Empfang Ihrer Daten in einem portablen Format.</li>
                                <li><strong>Widerruf der Einwilligung:</strong> Wenn die Einwilligung die Rechtsgrundlage ist, können Sie diese jederzeit widerrufen.</li>
                                <li><strong>Beschwerde einreichen:</strong> Kontaktieren Sie Ihre lokale Datenschutzbehörde.</li>
                            </ul>
                            <p>
                                Um eines dieser Rechte auszuüben, kontaktieren Sie uns unter <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>. Wir können eine Identitätsüberprüfung verlangen, bevor wir solche Anfragen bearbeiten.
                            </p>
                        </section>

                        <section>
                            <h2>6. Datenspeicherung</h2>
                            <p>
                                Wir speichern personenbezogene Daten nur so lange, wie es zur Erfüllung des ursprünglichen Zwecks oder zur Erfüllung rechtlicher Anforderungen erforderlich ist. Die Aufbewahrungsfristen variieren je nach Art der Daten, wie sie verwendet werden und geltenden Vorschriften. Wenn sie nicht mehr benötigt werden, werden Daten sicher gelöscht oder anonymisiert.
                            </p>
                        </section>

                        <section>
                            <h2>7. Sicherheit</h2>
                            <p>
                                Wir nehmen Datensicherheit ernst und implementieren technische und organisatorische Maßnahmen zum Schutz Ihrer Informationen. Dies kann Verschlüsselung, rollenbasierte Zugriffskontrollen, Firewalls und sichere Cloud-Speicherung umfassen.
                            </p>
                            <p>
                                Keine Übertragungsmethode über das Internet oder elektronische Speicherung ist jedoch zu 100% sicher. Während wir uns bemühen, personenbezogene Daten zu schützen, können wir absolute Sicherheit nicht garantieren.
                            </p>
                        </section>

                        <section>
                            <h2>8. Internationale Übertragungen</h2>
                            <p>
                                Durch die Nutzung von AdMaker AI erkennen Sie an, dass Ihre Daten in Länder außerhalb Ihres eigenen übertragen und verarbeitet werden können. Dies kann Gerichtsbarkeiten umfassen, die möglicherweise nicht gleichwertige Datenschutzgesetze bieten. Gegebenenfalls implementieren wir geeignete Schutzmaßnahmen (wie Standardvertragsklauseln), um sicherzustellen, dass Daten während solcher Übertragungen geschützt sind.
                            </p>
                        </section>

                        <section>
                            <h2>9. Rechtsgrundlage für die Verarbeitung</h2>
                            <p>Wir verarbeiten personenbezogene Daten nur, wenn wir rechtlich dazu berechtigt sind. Dies umfasst:</p>
                            <ul>
                                <li><strong>Vertragserfüllung:</strong> Um die Dienste bereitzustellen, die Sie abonniert haben.</li>
                                <li><strong>Berechtigte Interessen:</strong> Für Plattformbetrieb, Analysen, Sicherheit und Benutzersupport.</li>
                                <li><strong>Einwilligung:</strong> Wenn Sie aktiv in optionale Funktionen wie Marketing-E-Mails einwilligen.</li>
                                <li><strong>Rechtliche Einhaltung:</strong> Wenn dies durch Vorschriften oder Gesetze erforderlich ist.</li>
                            </ul>
                            <p>Für einwilligungsbasierte Verarbeitung können Sie Ihre Einwilligung jederzeit widerrufen.</p>
                        </section>

                        <section>
                            <h2>10. Links zu Dritten</h2>
                            <p>
                                Die Dienste können Links zu Websites oder Tools von Dritten enthalten. Diese werden unabhängig betrieben und haben ihre eigenen Datenschutzrichtlinien. AdMaker AI ist nicht verantwortlich für die Datenpraktiken von Drittseiten, auf die Sie über die Plattform zugreifen.
                            </p>
                        </section>

                        <section>
                            <h2>11. Datenschutz von Kindern</h2>
                            <p>
                                Unsere Dienste richten sich nicht an Kinder unter 13 Jahren. Wir sammeln wissentlich keine personenbezogenen Daten von Kindern unter 13 Jahren. Wenn Sie glauben, dass wir Informationen von einem Kind unter 13 Jahren gesammelt haben, kontaktieren Sie uns bitte umgehend unter <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>.
                            </p>
                        </section>

                        <section>
                            <h2>12. Aktualisierungen dieser Richtlinie</h2>
                            <p>
                                Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wenn dies gesetzlich vorgeschrieben ist, werden wir Sie direkt per E-Mail oder In-App-Nachricht benachrichtigen. Ihre fortgesetzte Nutzung der Dienste nach Aktualisierungen bedeutet Ihre Zustimmung zur überarbeiteten Richtlinie.
                            </p>
                        </section>

                        <section>
                            <h2>13. Kontaktinformationen</h2>
                            <p>
                                Wenn Sie Fragen zu dieser Datenschutzrichtlinie oder unseren Datenpraktiken haben, kontaktieren Sie uns unter:
                            </p>
                            <p>
                                <strong>E-Mail:</strong> <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>


        </main>
    );
}
