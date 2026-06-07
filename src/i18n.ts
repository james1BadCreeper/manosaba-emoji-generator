import { createI18n } from 'vue-i18n'
import { emojiCategories } from '@/data/emojis'

export const supportedLocales = ['zh-cn', 'en', 'ja'] as const
export type Locale = (typeof supportedLocales)[number]

export const localeLabels: Record<Locale, string> = {
  'zh-cn': '简体中文',
  en: 'English',
  ja: '日本語',
}

const baseUrl = import.meta.env.BASE_URL
const defaultLocale: Locale = 'zh-cn'

const messages = {
  'zh-cn': {
    documentTitle: '魔法少女的魔女审判表情包生成器',
    titleMain: '表情包',
    titleSub: '生成器（非官方）',
    logoAlt: '魔法少女的魔女审判',
    selectPlaceholder: '在这里输入文字，不支持换行',
    generateButton: '生成表情包',
    previewPlaceholder: '点击左侧「生成表情包」查看效果',
    generating: '生成中...',
    copyButton: '复制',
    downloadButton: '下载',
    copiedMessage: '已复制到剪贴板！',
    copyFailedMessage: '复制失败，请检查浏览器权限或使用下载',
    originalWorkPrefix: '© 原作',
    guidelineLink: '二次創作ガイドライン',
    copyrightText: '© 2026 魔法少女ノ魔女裁判 表情包生成器（非官方）By james1BadCreeper',
    githubLink: 'GitHub',
    blogLink: 'iznomia',
    categoryLabels: {
      shyeri: '雪莉',
      testimony: '证词',
    },
    emojiLabels: {
      shyeri: {
        cry: '哭泣',
        fear: '害怕',
        good: '好耶',
        proud: '骄傲',
        shocked: '震惊',
        shy: '害羞',
        soga: '原来如此',
        speechless: '无语',
        surprise: '惊讶',
        surrender: '投降',
        ting: '了解',
        yummy: '好吃',
      },
      testimony: {
        'emma-refute': '艾玛-反驳',
      },
    },
  },
  en: {
    documentTitle: 'Manosaba Emoji Generator',
    titleMain: 'Emoji',
    titleSub: ' Generator (Unofficial)',
    logoAlt: 'The Magical Girl and the Witch’s Trial',
    selectPlaceholder: 'Type your text here. Line breaks are not supported.',
    generateButton: 'Generate Emoji',
    previewPlaceholder: 'Click “Generate Emoji” on the left to see the result.',
    generating: 'Generating...',
    copyButton: 'Copy',
    downloadButton: 'Download',
    copiedMessage: 'Copied to clipboard!',
    copyFailedMessage: 'Copy failed. Check browser permissions or use download.',
    originalWorkPrefix: '© Original work',
    guidelineLink: 'Derivative Work Guidelines',
    copyrightText: '© 2026 Manosaba Emoji Generator (Unofficial) By james1BadCreeper',
    githubLink: 'GitHub',
    blogLink: 'iznomia',
    categoryLabels: {
      shyeri: 'Shyeri',
      testimony: 'Testimony',
    },
    emojiLabels: {
      shyeri: {
        cry: 'Crying',
        fear: 'Afraid',
        good: 'Yay!',
        proud: 'Proud',
        shocked: 'Shocked',
        shy: 'Shy',
        soga: 'I see',
        speechless: 'Speechless',
        surprise: 'Surprised',
        surrender: 'Surrender',
        ting: 'Got it',
        yummy: 'Tasty',
      },
      testimony: {
        'emma-refute': 'Emma - Rebuttal',
      },
    },
  },
  ja: {
    documentTitle: '魔法少女ノ魔女裁判 絵文字ジェネレーター',
    titleMain: '絵文字',
    titleSub: 'ジェネレーター（非公式）',
    logoAlt: '魔法少女ノ魔女裁判',
    selectPlaceholder: 'ここに文字を入力してください。改行はできません。',
    generateButton: '絵文字を生成',
    previewPlaceholder: '左の「絵文字を生成」をクリックすると結果を表示します。',
    generating: '生成中...',
    copyButton: 'コピー',
    downloadButton: 'ダウンロード',
    copiedMessage: 'クリップボードにコピーしました！',
    copyFailedMessage: 'コピーに失敗しました。ブラウザ権限を確認するか、ダウンロードを使用してください。',
    originalWorkPrefix: '© 原作',
    guidelineLink: '二次創作ガイドライン',
    copyrightText: '© 2026 魔法少女ノ魔女裁判 絵文字ジェネレーター（非公式）By james1BadCreeper',
    githubLink: 'GitHub',
    blogLink: 'iznomia',
    categoryLabels: {
      shyeri: 'シェリー',
      testimony: '証言',
    },
    emojiLabels: {
      shyeri: {
        cry: '泣き',
        fear: '怖い',
        good: 'やった！',
        proud: 'えへん',
        shocked: 'ショック',
        shy: '照れ',
        soga: 'なるほど',
        speechless: '無言',
        surprise: '驚き',
        surrender: '降参',
        ting: '了解',
        yummy: 'おいしい',
      },
      testimony: {
        'emma-refute': 'エマ - 反論',
      },
    },
  },
} as const

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  messages,
})

function stripBasePath(pathname: string): string {
  if (baseUrl === '/') return pathname
  return pathname.startsWith(baseUrl) ? pathname.slice(baseUrl.length - 1) : pathname
}

function isLocale(value: string): value is Locale {
  return (supportedLocales as readonly string[]).includes(value)
}

export function getLocaleFromPath(pathname = window.location.pathname): Locale {
  const relativePath = stripBasePath(pathname)
  const firstSegment = relativePath.split('/').filter(Boolean)[0]
  if (firstSegment && isLocale(firstSegment)) return firstSegment
  return defaultLocale
}

function getSuffix(): string {
  return `${window.location.search}${window.location.hash}`
}

export function localePath(locale: Locale): string {
  return `${baseUrl}${locale}/${getSuffix()}`
}

function syncDocument(locale: Locale) {
  document.documentElement.lang = locale === 'zh-cn' ? 'zh-CN' : (locale as string)
  document.title = (messages as any)[locale].documentTitle
}

export function initLocale() {
  if (typeof window === 'undefined') return

  // Handle GitHub Pages 404 redirect for direct URL access to locale paths
  const redirectPath = sessionStorage.getItem('redirectPath')
  if (redirectPath) {
    sessionStorage.removeItem('redirectPath')
    window.history.replaceState({}, '', redirectPath)
  }

  const initialLocale = getLocaleFromPath()
  i18n.global.locale.value = initialLocale
  syncDocument(initialLocale)

  const normalizedPath = localePath(initialLocale)
  const currentPath = window.location.pathname
  if (currentPath !== normalizedPath.replace(window.location.search, '').replace(window.location.hash, '')) {
    window.history.replaceState({}, '', normalizedPath)
  }

  window.addEventListener('popstate', () => {
    const nextLocale = getLocaleFromPath()
    i18n.global.locale.value = nextLocale
    syncDocument(nextLocale)
  })
}

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  syncDocument(locale)
  window.history.pushState({}, '', localePath(locale))
}

export function getLocalizedEmojiCategories(locale: Locale) {
  const localeMessages = (messages as any)[locale]
  return emojiCategories.map((category) => ({
    ...category,
    label: localeMessages.categoryLabels[category.id as keyof typeof localeMessages.categoryLabels],
    list: category.list.map((emoji) => ({
      ...emoji,
      name: (localeMessages.emojiLabels as any)[category.id][emoji.id],
    })),
  }))
}

export { i18n, messages }
