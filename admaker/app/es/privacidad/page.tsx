import Navbar from '@/components/Navbar';
import styles from '../../terms/legal.module.css';

export const metadata = {
    title: 'Política de Privacidad | AdMaker AI',
    description: 'Política de Privacidad para AdMaker AI - Cómo recopilamos, usamos y protegemos sus datos',
};

export default function PoliticaPrivacidad() {
    return (
        <main className={styles.legalPage}>
            <Navbar lang="es" />

            <div className={styles.legalContainer}>
                <div className="container">
                    <div className={styles.legalContent}>
                        <h1>Política de Privacidad</h1>
                        <p className={styles.lastUpdated}>Última actualización: 2 de enero de 2026</p>

                        <p className={styles.intro}>
                            En AdMaker AI, estamos comprometidos a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y compartimos información personal ("Datos Personales") cuando utiliza nuestros sitios web, software, aplicaciones y servicios asociados (colectivamente, los "Servicios"). Se aplica a las personas que usan directamente nuestros Servicios, pero no a los datos procesados bajo contratos empresariales personalizados; esas relaciones se rigen por sus acuerdos específicos.
                        </p>

                        <section>
                            <h2>1. Información que Recopilamos</h2>

                            <h3>a. Información que Proporciona Voluntariamente</h3>
                            <p>Podemos recopilar los siguientes tipos de Datos Personales que usted envía directamente:</p>
                            <ul>
                                <li><strong>Detalles de la Cuenta:</strong> Incluido su nombre, dirección de correo electrónico, detalles de pago y dirección de facturación cuando se registra o suscribe.</li>
                                <li><strong>Contenido del Usuario:</strong> Como cualquier archivo, script, imagen o comentario que cargue o cree en la plataforma.</li>
                                <li><strong>Historial de Comunicación:</strong> Cualquier mensaje enviado a nuestro equipo de soporte, envíos de formularios de contacto u otras interacciones con clientes.</li>
                                <li><strong>Comentarios y Participación:</strong> Respuestas a encuestas, formularios de comentarios, concursos o actividades promocionales.</li>
                            </ul>

                            <h3>b. Información Recopilada Automáticamente</h3>
                            <p>Cuando interactúa con nuestros Servicios, recopilamos automáticamente:</p>
                            <ul>
                                <li><strong>Datos del Dispositivo y Técnicos:</strong> Dirección IP, tipo de navegador, sistema operativo, resolución de pantalla, identificadores de dispositivo y preferencias de idioma.</li>
                                <li><strong>Análisis de Uso:</strong> Información sobre la actividad de la plataforma, selecciones de avatares, plantillas utilizadas, tiempo dedicado a las funciones y rutas de navegación.</li>
                                <li><strong>Cookies y Tecnologías de Seguimiento:</strong> Utilizamos cookies y tecnologías similares para mantener la funcionalidad, garantizar la seguridad y analizar la participación. Puede ajustar la configuración de cookies en su navegador, aunque esto puede afectar el rendimiento de los Servicios.</li>
                            </ul>

                            <h3>c. Datos de Terceros y Plataformas Sociales</h3>
                            <p>
                                Si interactúa con nosotros a través de plataformas de terceros (por ejemplo, Instagram, LinkedIn, YouTube), podemos recopilar datos disponibles de su perfil público o interacciones con nuestro contenido. Esto está sujeto a los términos de privacidad de esas plataformas.
                            </p>
                        </section>

                        <section>
                            <h2>2. Cómo Usamos su Información</h2>
                            <p>Procesamos Datos Personales de acuerdo con los requisitos legales aplicables y para fines que incluyen:</p>
                            <ul>
                                <li>Crear y administrar cuentas de usuario y suscripciones.</li>
                                <li>Entregar y mejorar nuestras herramientas de generación de contenido impulsadas por IA.</li>
                                <li>Monitorear patrones de uso para mejorar el rendimiento y la experiencia del usuario.</li>
                                <li>Proporcionar actualizaciones, soporte y comunicaciones de servicio importantes.</li>
                                <li>Detectar uso indebido, riesgos de seguridad o actividad fraudulenta.</li>
                                <li>Mejorar nuestros sistemas de IA y entrenar modelos (a menos que opte por no participar).</li>
                                <li>Cumplir con obligaciones legales y hacer cumplir nuestros términos de servicio.</li>
                            </ul>
                            <p>
                                También podemos usar datos desidentificados o agregados para análisis, desarrollo de productos o información de marketing. Estos datos no pueden identificarlo y no se consideran Datos Personales.
                            </p>
                        </section>

                        <section>
                            <h2>3. Contenido de IA y Entrenamiento de Modelos</h2>
                            <p>
                                Al usar AdMaker AI, puede ingresar entradas (por ejemplo, indicaciones, scripts) que generan salidas de IA. Estas interacciones pueden usarse para refinar nuestros modelos de IA y mejorar el rendimiento de la plataforma. Puede solicitar no participar en este uso contactándonos en <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>. Optar por no participar puede reducir la capacidad de la plataforma para adaptar los resultados a sus preferencias.
                            </p>
                        </section>

                        <section>
                            <h2>4. Cómo Compartimos Datos Personales</h2>
                            <p>Sus datos pueden compartirse en las siguientes situaciones:</p>
                            <ul>
                                <li><strong>Proveedores de Servicios:</strong> Confiamos en proveedores de confianza para servicios como alojamiento en la nube, análisis, procesamiento de pagos y soporte. Estos proveedores están autorizados a procesar datos únicamente en nuestro nombre.</li>
                                <li><strong>Cambios Comerciales:</strong> Si AdMaker AI se somete a una fusión, adquisición, venta de activos o reestructuración, los datos del usuario pueden transferirse a la organización sucesora.</li>
                                <li><strong>Requisitos Legales:</strong> Podemos divulgar su información si así lo requiere la ley, la regulación, el proceso legal o la solicitud gubernamental.</li>
                                <li><strong>Compartir Público:</strong> Cuando publica deliberadamente contenido en AdMaker AI (por ejemplo, publicando testimonios o videos generados por usuarios), su información compartida puede ser visible para otros.</li>
                            </ul>
                            <p>
                                <strong>No vendemos sus datos</strong> y no compartimos Datos Personales con terceros no afiliados para publicidad conductual.
                            </p>
                        </section>

                        <section>
                            <h2>5. Sus Derechos y Opciones</h2>
                            <p>Dependiendo de su ubicación, puede tener derechos legales con respecto a sus Datos Personales, incluidos:</p>
                            <ul>
                                <li><strong>Acceso:</strong> Solicitar una copia de los Datos Personales que tenemos sobre usted.</li>
                                <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
                                <li><strong>Eliminación:</strong> Solicitarnos que eliminemos sus datos, sujeto a ciertas excepciones.</li>
                                <li><strong>Restricción:</strong> Solicitar límites sobre cómo se procesan sus datos.</li>
                                <li><strong>Objeción:</strong> Oponerse al procesamiento, particularmente para marketing directo.</li>
                                <li><strong>Portabilidad de Datos:</strong> Recibir sus datos en un formato portátil.</li>
                                <li><strong>Retirar el Consentimiento:</strong> Cuando el consentimiento es la base legal, puede retirarlo en cualquier momento.</li>
                                <li><strong>Presentar una Queja:</strong> Contactar a su autoridad local de protección de datos.</li>
                            </ul>
                            <p>
                                Para ejercer cualquiera de estos derechos, contáctenos en <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>. Podemos requerir verificación de identidad antes de procesar dichas solicitudes.
                            </p>
                        </section>

                        <section>
                            <h2>6. Retención de Datos</h2>
                            <p>
                                Retenemos Datos Personales solo el tiempo necesario para cumplir con su propósito original o cumplir con los requisitos legales. Los períodos de retención varían según el tipo de datos, cómo se usan y las regulaciones aplicables. Una vez que ya no son necesarios, los datos se eliminan de forma segura o se anonimizan.
                            </p>
                        </section>

                        <section>
                            <h2>7. Seguridad</h2>
                            <p>
                                Tomamos la seguridad de los datos en serio e implementamos medidas técnicas y organizativas para proteger su información. Estas pueden incluir cifrado, controles de acceso basados en roles, firewalls y almacenamiento en la nube seguro.
                            </p>
                            <p>
                                Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro. Si bien nos esforzamos por proteger sus Datos Personales, no podemos garantizar una seguridad absoluta.
                            </p>
                        </section>

                        <section>
                            <h2>8. Transferencias Internacionales</h2>
                            <p>
                                Al usar AdMaker AI, reconoce que sus datos pueden transferirse y procesarse en países distintos al suyo, incluidas jurisdicciones que pueden no ofrecer leyes de protección de datos equivalentes. Cuando sea necesario, implementamos salvaguardas apropiadas (como Cláusulas Contractuales Estándar) para garantizar que sus datos permanezcan protegidos durante dichas transferencias.
                            </p>
                        </section>

                        <section>
                            <h2>9. Base Legal para el Procesamiento</h2>
                            <p>Solo procesamos Datos Personales cuando está legalmente justificado. Esto incluye:</p>
                            <ul>
                                <li><strong>Ejecución de un Contrato:</strong> Para proporcionar los Servicios a los que se ha suscrito.</li>
                                <li><strong>Intereses Legítimos:</strong> Para la operación de la plataforma, análisis, seguridad y soporte al usuario.</li>
                                <li><strong>Consentimiento:</strong> Cuando acepta activamente funciones opcionales como correos electrónicos de marketing.</li>
                                <li><strong>Cumplimiento Legal:</strong> Cuando lo requiera la regulación o la ley.</li>
                            </ul>
                            <p>Puede retirar el consentimiento en cualquier momento para el procesamiento basado en el consentimiento.</p>
                        </section>

                        <section>
                            <h2>10. Enlaces de Terceros</h2>
                            <p>
                                Los Servicios pueden incluir enlaces a sitios o herramientas de terceros. Estos operan de forma independiente y tienen sus propias políticas de privacidad. AdMaker AI no es responsable de las prácticas de datos de sitios de terceros a los que accede a través de nuestra plataforma.
                            </p>
                        </section>

                        <section>
                            <h2>11. Privacidad de los Niños</h2>
                            <p>
                                Nuestros Servicios no están dirigidos a niños menores de 13 años. No recopilamos a sabiendas Datos Personales de niños menores de 13 años. Si cree que hemos recopilado información de un niño menor de 13 años, contáctenos inmediatamente en <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>.
                            </p>
                        </section>

                        <section>
                            <h2>12. Actualizaciones de esta Política</h2>
                            <p>
                                Podemos actualizar esta Política de Privacidad de vez en cuando. Cuando la ley lo requiera, le notificaremos directamente por correo electrónico o mensaje en la aplicación. Su uso continuado de los Servicios después de las actualizaciones indica la aceptación de la política revisada.
                            </p>
                        </section>

                        <section>
                            <h2>13. Información de Contacto</h2>
                            <p>
                                Si tiene alguna pregunta sobre esta Política de Privacidad o nuestras prácticas de datos, contáctenos en:
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
