export interface Emoji {
  id: string
  name?: string
  src: string
}

export interface EmojiCategory {
  id: string
  list: Emoji[]
}

const getUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const emojiCategories: EmojiCategory[] = [
  {
    id: 'shyeri',
    list: [
      { id: 'cry', src: getUrl('emojis/shyeri/shyeri_cry.png') },
      { id: 'fear', src: getUrl('emojis/shyeri/shyeri_fear.png') },
      { id: 'good', src: getUrl('emojis/shyeri/shyeri_good.png') },
      { id: 'proud', src: getUrl('emojis/shyeri/shyeri_proud.png') },
      { id: 'shocked', src: getUrl('emojis/shyeri/shyeri_shocked.png') },
      { id: 'shy', src: getUrl('emojis/shyeri/shyeri_shy.png') },
      { id: 'soga', src: getUrl('emojis/shyeri/shyeri_soga.png') },
      { id: 'speechless', src: getUrl('emojis/shyeri/shyeri_speechless.png') },
      { id: 'surprise', src: getUrl('emojis/shyeri/shyeri_surprise.png') },
      { id: 'surrender', src: getUrl('emojis/shyeri/shyeri_surrender.png') },
      { id: 'ting', src: getUrl('emojis/shyeri/shyeri_ting.png') },
      { id: 'yummy', src: getUrl('emojis/shyeri/shyeri_yummy.png') },
    ]
  },
  {
    id: 'testimony',
    list: [
      { id: 'emma-refute', src: getUrl('emojis/testimony/emma_refute.png') },
    ]
  }
]