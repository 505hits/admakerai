import Navbar from '@/components/Navbar';
import styles from '../terms/legal.module.css';

export const metadata = {
    title: 'Privacy Policy | AdMaker AI',
    description: 'Privacy Policy for AdMaker AI - How we collect, use, and protect your data',
};

export default function PrivacyPolicy() {
    return (
        <main className={styles.legalPage}>
            <Navbar />

            <div className={styles.legalContainer}>
                <div className="container">
                    <div className={styles.legalContent}>
                        <h1>Privacy Policy</h1>
                        <p className={styles.lastUpdated}>Last Updated: January 2, 2026</p>

                        <p className={styles.intro}>
                            At AdMaker AI, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share personal information ("Personal Data") when you use our websites, software, applications, and associated services (collectively, the "Services"). It applies to individuals who directly use our Services, but not to data processed under bespoke enterprise contracts—those relationships are governed by their specific agreements.
                        </p>

                        <section>
                            <h2>1. Information We Collect</h2>

                            <h3>a. Information You Provide Voluntarily</h3>
                            <p>We may collect the following types of Personal Data that you directly submit:</p>
                            <ul>
                                <li><strong>Account Details:</strong> Including your name, email address, payment details, and billing address when you register or subscribe.</li>
                                <li><strong>User Content:</strong> Such as any files, scripts, images, or comments you upload or create on the platform.</li>
                                <li><strong>Communication History:</strong> Any messages sent to our support team, contact form submissions, or other customer interactions.</li>
                                <li><strong>Feedback & Participation:</strong> Responses to surveys, feedback forms, contests, or promotional activities.</li>
                            </ul>

                            <h3>b. Information Collected Automatically</h3>
                            <p>When you interact with our Services, we automatically collect:</p>
                            <ul>
                                <li><strong>Device & Technical Data:</strong> IP address, browser type, operating system, screen resolution, device identifiers, and language preferences.</li>
                                <li><strong>Usage Analytics:</strong> Information on platform activity, avatar selections, templates used, time spent on features, and navigation paths.</li>
                                <li><strong>Cookies & Tracking Technologies:</strong> We use cookies and similar technologies to maintain functionality, ensure security, and analyze engagement. You may adjust cookie settings in your browser, though this may affect how the Services perform.</li>
                            </ul>

                            <h3>c. Data from Third Parties and Social Platforms</h3>
                            <p>
                                If you engage with us via third-party platforms (e.g., Instagram, LinkedIn, YouTube), we may collect data available from your public profile or interactions with our content. This is subject to the privacy terms of those platforms.
                            </p>
                        </section>

                        <section>
                            <h2>2. How We Use Your Information</h2>
                            <p>We process Personal Data in line with applicable legal requirements and for purposes including:</p>
                            <ul>
                                <li>Creating and managing user accounts and subscriptions.</li>
                                <li>Delivering and improving our AI-powered content generation tools.</li>
                                <li>Monitoring usage patterns to enhance performance and user experience.</li>
                                <li>Providing updates, support, and important service communications.</li>
                                <li>Detecting misuse, security risks, or fraudulent activity.</li>
                                <li>Improving our AI systems and training models (unless you opt out).</li>
                                <li>Fulfilling legal obligations and enforcing our terms of service.</li>
                            </ul>
                            <p>
                                We may also use de-identified or aggregated data for analytics, product development, or marketing insights. This data cannot identify you and is not considered Personal Data.
                            </p>
                        </section>

                        <section>
                            <h2>3. AI Content & Model Training</h2>
                            <p>
                                When using AdMaker AI, you may enter inputs (e.g., prompts, scripts) that generate AI outputs. These interactions may be used to refine our AI models and improve platform performance. You may request to opt out of this use by contacting us at <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>. Opting out may reduce the platform's ability to tailor results to your preferences.
                            </p>
                        </section>

                        <section>
                            <h2>4. How We Share Personal Data</h2>
                            <p>Your data may be shared in the following situations:</p>
                            <ul>
                                <li><strong>Service Providers:</strong> We rely on trusted vendors for services such as cloud hosting, analytics, payment processing, and support. These providers are authorized to process data solely on our behalf.</li>
                                <li><strong>Business Changes:</strong> If AdMaker AI undergoes a merger, acquisition, asset sale, or restructuring, user data may be transferred to the successor organization.</li>
                                <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, regulation, legal process, or governmental request.</li>
                                <li><strong>Public Sharing:</strong> When you deliberately publish content on AdMaker AI (e.g., by posting testimonials or user-generated videos), your shared information may be visible to others.</li>
                            </ul>
                            <p>
                                <strong>We do not sell your data</strong> and we do not share Personal Data with unaffiliated third parties for behavioral advertising.
                            </p>
                        </section>

                        <section>
                            <h2>5. Your Rights and Choices</h2>
                            <p>Depending on your location, you may have legal rights regarding your Personal Data, including:</p>
                            <ul>
                                <li><strong>Access:</strong> Request a copy of the Personal Data we hold about you.</li>
                                <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
                                <li><strong>Erasure:</strong> Ask us to delete your data, subject to certain exceptions.</li>
                                <li><strong>Restriction:</strong> Request limits on how your data is processed.</li>
                                <li><strong>Objection:</strong> Object to processing, particularly for direct marketing.</li>
                                <li><strong>Data Portability:</strong> Receive your data in a portable format.</li>
                                <li><strong>Withdraw Consent:</strong> Where consent is the legal basis, you may withdraw it at any time.</li>
                                <li><strong>Lodge a Complaint:</strong> Contact your local data protection authority.</li>
                            </ul>
                            <p>
                                To exercise any of these rights, please contact us at <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>. We may require identity verification before processing such requests.
                            </p>
                        </section>

                        <section>
                            <h2>6. Data Retention</h2>
                            <p>
                                We retain Personal Data only as long as needed to fulfill its original purpose or comply with legal requirements. Retention periods vary based on the type of data, how it is used, and applicable regulations. Once no longer necessary, data is securely deleted or anonymized.
                            </p>
                        </section>

                        <section>
                            <h2>7. Security</h2>
                            <p>
                                We take data security seriously and implement technical and organizational measures to protect your information. These may include encryption, role-based access controls, firewalls, and secure cloud storage.
                            </p>
                            <p>
                                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your Personal Data, we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2>8. International Transfers</h2>
                            <p>
                                By using AdMaker AI, you acknowledge that your data may be transferred to and processed in countries outside your own, including jurisdictions that may not offer equivalent data protection laws. Where required, we implement appropriate safeguards (such as Standard Contractual Clauses) to ensure your data remains protected during such transfers.
                            </p>
                        </section>

                        <section>
                            <h2>9. Lawful Basis for Processing</h2>
                            <p>We only process Personal Data when legally justified. This includes:</p>
                            <ul>
                                <li><strong>Performance of a Contract:</strong> To provide the Services you've subscribed to.</li>
                                <li><strong>Legitimate Interests:</strong> For platform operation, analytics, security, and user support.</li>
                                <li><strong>Consent:</strong> When you actively agree to optional features like marketing emails.</li>
                                <li><strong>Legal Compliance:</strong> Where required by regulation or law.</li>
                            </ul>
                            <p>You may withdraw consent at any time for processing based on consent.</p>
                        </section>

                        <section>
                            <h2>10. Third-Party Links</h2>
                            <p>
                                The Services may include links to third-party sites or tools. These operate independently and have their own privacy policies. AdMaker AI is not responsible for the data practices of third-party sites you access through our platform.
                            </p>
                        </section>

                        <section>
                            <h2>11. Children's Privacy</h2>
                            <p>
                                Our Services are not directed to children under 13 years of age. We do not knowingly collect Personal Data from children under 13. If you believe we have collected information from a child under 13, please contact us immediately at <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>.
                            </p>
                        </section>

                        <section>
                            <h2>12. Updates to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. Where required by law, we will notify you directly via email or in-app message. Your continued use of the Services after updates indicates acceptance of the revised policy.
                            </p>
                        </section>

                        <section>
                            <h2>13. Contact Information</h2>
                            <p>
                                If you have any questions about this Privacy Policy or our data practices, please contact us at:
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
