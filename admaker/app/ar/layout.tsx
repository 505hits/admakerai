import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AdMaker AI - أفضل منصة لإنشاء فيديوهات UGC بالذكاء الاصطناعي',
    description: 'أنشئ فيديوهات UGC احترافية بالذكاء الاصطناعي في ثوانٍ. أفضل منصة لإنشاء محتوى الفيديو للتسويق والإعلانات.',
    keywords: 'إنشاء فيديو بالذكاء الاصطناعي, محتوى UGC, فيديوهات تسويقية, ذكاء اصطناعي, إعلانات فيديو',
    openGraph: {
        title: 'AdMaker AI - أفضل منصة لإنشاء فيديوهات UGC بالذكاء الاصطناعي',
        description: 'أنشئ فيديوهات UGC احترافية بالذكاء الاصطناعي في ثوانٍ',
        locale: 'ar_SA',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AdMaker AI - أفضل منصة لإنشاء فيديوهات UGC بالذكاء الاصطناعي',
        description: 'أنشئ فيديوهات UGC احترافية بالذكاء الاصطناعي في ثوانٍ',
    },
    alternates: {
        canonical: '/ar',
        languages: {
            'en': '/',
            'fr': '/fr',
            'es': '/es',
            'de': '/de',
            'ko': '/ko',
            'pt': '/pt',
            'ar': '/ar',
            'x-default': '/'
        }
    }
};

export default function ArabicRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ar" dir="rtl">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet" />
            </head>
            <body style={{ fontFamily: "'Cairo', sans-serif" }}>
                {children}
            </body>
        </html>
    );
}
