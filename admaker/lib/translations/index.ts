import enTranslations from './en.json';
import frTranslations from './fr.json';
import esTranslations from './es.json';
import ptTranslations from './pt.json';
import koTranslations from './ko.json';

type TranslationKey = keyof typeof enTranslations;
type NestedTranslationKey<T extends TranslationKey> = keyof typeof enTranslations[T];

export function getTranslation<T extends TranslationKey>(
    section: T,
    key: NestedTranslationKey<T>,
    lang: 'en' | 'fr' | 'es' | 'pt' | 'ko' = 'en'
): string {
    const translations: any = lang === 'fr' ? frTranslations : lang === 'es' ? esTranslations : lang === 'pt' ? ptTranslations : lang === 'ko' ? koTranslations : enTranslations;
    return translations[section]?.[key] || (enTranslations[section] as any)[key];
}

export function useTranslation(lang: 'en' | 'fr' | 'es' | 'pt' | 'ko' = 'en') {
    return {
        t: <T extends TranslationKey>(section: T, key: NestedTranslationKey<T>) =>
            getTranslation(section, key, lang)
    };
}
