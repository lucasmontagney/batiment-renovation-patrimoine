import { fr } from '@/messages/fr'
import { en } from '@/messages/en'

export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fr'

const dictionaries = { fr, en } as const
export type Dictionary = typeof fr

export function getDict(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function altLocale(locale: Locale): Locale {
  return locale === 'fr' ? 'en' : 'fr'
}

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
}
