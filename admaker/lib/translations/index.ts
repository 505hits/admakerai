import enTranslations from './en.json';
import frTranslations from './fr.json';

type TranslationKey = keyof typeof enTranslations;
type NestedTranslationKey<T extends TranslationKey> = keyof typeof enTranslations[T];

export function getTranslation<T extends TranslationKey>(
    section: T,
    key: NestedTranslationKey<T>,
    lang: 'en' | 'fr' = 'en'
): string {
    const translations = lang === 'fr' ? frTranslations : enTranslations;
    return (translations[section] as any)[key] || (enTranslations[section] as any)[key];
}

export function useTranslation(lang: 'en' | 'fr' = 'en') {
    return {
        t: <T extends TranslationKey>(section: T, key: NestedTranslationKey<T>) =>
            getTranslation(section, key, lang)
    };
}
