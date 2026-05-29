export interface Emoji {
  id: string
  name: string
  src: string
}

export interface EmojiCategory {
  id: string
  label: string
  list: Emoji[]
}

export const emojiCategories: EmojiCategory[] = [
  {
    id: 'shyeri',
    label: '雪莉',
    list: [
      { id: 'cry', name: '哭泣', src: '/emojis/shyeri/shyeri_cry.png' },
      { id: 'fear', name: '害怕', src: '/emojis/shyeri/shyeri_fear.png' },
      { id: 'good', name: '好耶', src: '/emojis/shyeri/shyeri_good.png' },
      { id: 'proud', name: '骄傲', src: '/emojis/shyeri/shyeri_proud.png' },
      { id: 'shocked', name: '震惊', src: '/emojis/shyeri/shyeri_shocked.png' },
      { id: 'shy', name: '害羞', src: '/emojis/shyeri/shyeri_shy.png' },
      { id: 'soga', name: '原来如此', src: '/emojis/shyeri/shyeri_soga.png' },
      { id: 'speechless', name: '无语', src: '/emojis/shyeri/shyeri_speechless.png' },
      { id: 'surprise', name: '惊讶', src: '/emojis/shyeri/shyeri_surprise.png' },
      { id: 'surrender', name: '投降', src: '/emojis/shyeri/shyeri_surrender.png' },
      { id: 'ting', name: '了解', src: '/emojis/shyeri/shyeri_ting.png' },
      { id: 'yummy', name: '好吃', src: '/emojis/shyeri/shyeri_yummy.png' },
    ]
  },
  {
    id: 'testimony',
    label: '证词',
    list: [
      { id: 'emma-refute', name: '艾玛-反驳', src: '/emojis/testimony/emma_refute.png' },
    ]
  }
]