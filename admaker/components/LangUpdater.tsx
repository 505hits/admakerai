'use client';

import { useEffect } from 'react';

export default function LangUpdater({ lang }: { lang: string }) {
    useEffect(() => {
        // Update the html lang attribute
        document.documentElement.setAttribute('lang', lang);
    }, [lang]);

    return null;
}
