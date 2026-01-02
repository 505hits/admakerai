import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from '../../terms/legal.module.css';

export const metadata = {
    title: 'Términos de Servicio | AdMaker AI',
    description: 'Términos de Servicio para AdMaker AI - Plataforma de creación de videos UGC con IA',
};

export default function TerminosServicio() {
    return (
        <main className={styles.legalPage}>
            <Navbar lang="es" />

            <div className={styles.legalContainer}>
                <div className="container">
                    <div className={styles.legalContent}>
                        <h1>Términos de Servicio</h1>
                        <p className={styles.lastUpdated}>Última actualización: 2 de enero de 2026</p>

                        <p className={styles.intro}>
                            Estos Términos de Servicio ("Términos") rigen su acceso y uso de todos los servicios, plataformas, sitios web, software y herramientas (colectivamente, los "Servicios") proporcionados por AdMaker AI ("nosotros", "nuestro" o "nos"). Al acceder o utilizar cualquiera de nuestros Servicios, usted acepta estar sujeto a estos Términos y cumplir con todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguna parte de estos Términos, no debe utilizar los Servicios.
                        </p>

                        <section>
                            <h2>1. Naturaleza de los Servicios y Descargo de Responsabilidad Legal</h2>
                            <p>
                                AdMaker AI proporciona una plataforma de creación de videos impulsada por IA que permite a los usuarios generar contenido de marketing, incluidos videos estilo UGC, utilizando inteligencia artificial generativa. Todo el contenido generado a través de los Servicios es producido automáticamente por sistemas de aprendizaje automático.
                            </p>
                            <p>
                                Usted reconoce que los resultados de la plataforma son generados por máquina y que es su responsabilidad asegurarse de que cualquier uso de dicho contenido cumpla con las leyes aplicables, los estándares publicitarios, las pautas de la plataforma y las regulaciones de la industria.
                            </p>
                            <p>
                                No garantizamos la precisión factual, el cumplimiento legal o la idoneidad comercial de ningún contenido generado por IA. Usted es el único responsable de cualquier contenido que cree, publique o distribuya utilizando AdMaker AI.
                            </p>
                        </section>

                        <section>
                            <h2>2. Licencia y Requisitos de Suscripción</h2>
                            <p>
                                Todo acceso al contenido generado por AdMaker AI, incluidos, entre otros, scripts, videos, avatares o datos relacionados, está sujeto a una suscripción paga activa o créditos disponibles.
                            </p>
                            <p>
                                Mientras su suscripción esté activa o tenga créditos disponibles, se le otorga una licencia limitada, no exclusiva y revocable para usar el contenido generado de acuerdo con estos Términos. Esta licencia termina inmediatamente al cancelar, vencer o suspender su suscripción y agotar todos los créditos.
                            </p>
                            <p>
                                No se otorgan derechos, licencias o permisos a los usuarios sin una suscripción activa o créditos disponibles, a menos que se especifique lo contrario en un acuerdo comercial por escrito.
                            </p>
                        </section>

                        <section>
                            <h2>3. Elegibilidad y Responsabilidad de la Cuenta</h2>
                            <p>
                                Para usar los Servicios, debe tener al menos 13 años o la edad legal mínima en su jurisdicción. Si es menor de 18 años, debe tener el permiso y la supervisión de un padre o tutor legal, quien acepta estos Términos en su nombre.
                            </p>
                            <p>
                                Usted acepta proporcionar información precisa y actualizada al crear una cuenta de AdMaker AI. Usted es el único responsable de mantener seguras sus credenciales de inicio de sesión y de cualquier actividad realizada a través de su cuenta. Está prohibido compartir su cuenta o credenciales de inicio de sesión con terceros.
                            </p>
                            <p>
                                Si se registra en nombre de una empresa u organización, confirma que tiene la autoridad para aceptar estos Términos en su nombre.
                            </p>
                        </section>

                        <section>
                            <h2>4. Propiedad del Contenido y Propiedad Intelectual</h2>
                            <p>
                                Usted conserva todos los derechos sobre cualquier material que cargue en la plataforma como entrada ("Input"). Sujeto a estos Términos, y en la medida permitida por la ley, AdMaker AI le asigna cualquier derecho que pueda tener sobre el contenido generado por IA resultante ("Output").
                            </p>
                            <p>
                                Debido a la naturaleza de la IA generativa, se puede producir contenido similar o idéntico para otros usuarios. No garantizamos que ningún Output sea único. Toda la propiedad intelectual asociada con los Servicios, incluida la plataforma, el código fuente, los modelos, los datos y la marca, sigue siendo propiedad exclusiva de AdMaker AI.
                            </p>
                        </section>

                        <section>
                            <h2>5. Uso Ético de la IA, Derechos de Imagen y Cumplimiento de la Plataforma</h2>
                            <p>
                                Al usar la plataforma AdMaker AI, usted acepta usar todo el contenido generado por IA de manera ética, legal y de acuerdo con las regulaciones aplicables. Solo puede cargar, editar o generar imágenes, videos o semejanzas que no representen o se parezcan a una persona real e identificable, a menos que haya obtenido el consentimiento explícito, informado y verificable de esa persona para cada uso y cada generación.
                            </p>
                            <p>
                                Usted declara y garantiza que posee todos los derechos, permisos y autoridad legal necesarios para usar cualquier semejanza, imagen o dato personal enviado o generado a través de la plataforma.
                            </p>
                            <p>
                                Además, acepta que es el único responsable de garantizar que cualquier contenido generado por IA creado con AdMaker AI cumpla con las reglas, políticas y requisitos de divulgación de cualquier plataforma de terceros en la que se publique dicho contenido, incluidos, entre otros, los requisitos para etiquetar o categorizar el contenido como generado por IA, sintético o alterado digitalmente.
                            </p>
                            <p>
                                AdMaker AI se reserva el derecho de suspender o cancelar el acceso cuando se detecte o sospeche razonablemente de uso indebido, contenido no consensuado, suplantación de identidad o incumplimiento normativo.
                            </p>
                        </section>

                        <section>
                            <h2>6. Facturación, Pagos y Términos de Suscripción</h2>
                            <p>
                                Todos los precios de los Servicios se muestran claramente en el punto de compra. Al suscribirse, autoriza cargos recurrentes a su método de pago seleccionado según el ciclo de facturación que elija.
                            </p>
                            <p>
                                Las tarifas no son reembolsables a menos que la ley lo exija. Podemos revisar nuestros precios en cualquier momento, pero todos los precios estarán claramente etiquetados en la plataforma, y no se realizarán cargos a la nueva tarifa sin notificación y confirmación. Puede cancelar su suscripción antes del próximo ciclo de facturación si no acepta el nuevo precio.
                            </p>
                            <p>
                                Si su pago falla o se revierte, su cuenta puede suspenderse hasta que se resuelva el pago. Usted es responsable de cualquier impuesto aplicable. Podemos emprender acciones legales para cobrar montos vencidos.
                            </p>
                        </section>

                        <section>
                            <h2>7. Disponibilidad del Servicio y Terminación</h2>
                            <p>
                                Nos reservamos el derecho de modificar, suspender o discontinuar cualquier parte de los Servicios en cualquier momento. Si tiene una suscripción activa, puede ser elegible para un reembolso prorrateado cuando la ley lo exija.
                            </p>
                            <p>
                                Podemos suspender o cancelar su acceso en cualquier momento si determinamos que ha violado estos Términos, ha hecho un uso indebido de la plataforma o ha creado un riesgo legal, técnico o de reputación indebido.
                            </p>
                            <p>
                                También nos reservamos el derecho de cancelar cuentas inactivas después de 12 meses de inactividad sin una suscripción activa. Puede cerrar su cuenta en cualquier momento a través del panel de su cuenta o contactando a nuestro equipo de soporte.
                            </p>
                        </section>

                        <section>
                            <h2>8. Descargo de Responsabilidad y Limitación de Responsabilidad</h2>
                            <p>
                                Los Servicios se proporcionan "tal cual" y "según disponibilidad". En la medida máxima permitida por la ley, AdMaker AI renuncia a todas las garantías, expresas o implícitas, incluida la idoneidad para un propósito particular, la comerciabilidad y la no infracción.
                            </p>
                            <p>
                                No garantizamos que los Servicios o cualquier contenido generado por IA sean precisos, ininterrumpidos o libres de errores. En la medida máxima permitida por la ley, no seremos responsables de ninguna pérdida indirecta, incidental o consecuente, incluida la pérdida de ganancias, datos u oportunidades comerciales.
                            </p>
                            <p>
                                Nuestra responsabilidad total no excederá el mayor de $100 o la cantidad que pagó a AdMaker AI en los 12 meses anteriores al reclamo.
                            </p>
                        </section>

                        <section>
                            <h2>9. Indemnización</h2>
                            <p>
                                Si utiliza AdMaker AI en nombre de una empresa u organización, acepta indemnizar y eximir de responsabilidad a AdMaker AI y a los miembros de su equipo de cualquier reclamo, daño, costo o honorarios legales que surjan de:
                            </p>
                            <ul>
                                <li>Su uso de los Servicios;</li>
                                <li>Su violación de estos Términos;</li>
                                <li>Su violación de cualquier ley o derecho de terceros.</li>
                            </ul>
                        </section>

                        <section>
                            <h2>10. Quejas por Derechos de Autor</h2>
                            <p>
                                Si cree que su propiedad intelectual ha sido infringida por contenido generado con AdMaker AI, puede enviar un aviso a <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a> que incluya:
                            </p>
                            <ul>
                                <li>Su nombre y datos de contacto;</li>
                                <li>Una descripción de la obra protegida por derechos de autor;</li>
                                <li>Una declaración bajo pena de perjurio de que el uso no está autorizado;</li>
                                <li>Su firma (física o electrónica).</li>
                            </ul>
                            <p>
                                Revisaremos todas las quejas legítimas de acuerdo con las leyes de propiedad intelectual aplicables.
                            </p>
                        </section>

                        <section>
                            <h2>11. Términos Generales</h2>
                            <p>
                                Estos Términos representan el acuerdo completo entre usted y AdMaker AI con respecto al uso de los Servicios. Reemplazan cualquier acuerdo anterior o contemporáneo.
                            </p>
                            <p>
                                No puede transferir o ceder sus derechos bajo estos Términos sin nuestro consentimiento por escrito. Podemos transferir nuestros derechos a cualquier sucesor o servicio afiliado.
                            </p>
                            <p>
                                Si alguna disposición de estos Términos se considera inválida o inaplicable, las disposiciones restantes permanecerán en pleno vigor. El incumplimiento de cualquier disposición no constituirá una renuncia a nuestros derechos.
                            </p>
                        </section>

                        <section>
                            <h2>12. Información de Contacto</h2>
                            <p>
                                Si tiene alguna pregunta sobre estos Términos, contáctenos en:
                            </p>
                            <p>
                                <strong>Email:</strong> <a href="mailto:contact.admakerai@gmail.com">contact.admakerai@gmail.com</a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer lang="es" />
        </main>
    );
}
