<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { emojiCategories } from '@/data/emojis';
import { getLocalizedEmojiCategories } from '@/i18n';

const activeCategoryId = ref<string>(emojiCategories[0]?.id ?? '');

import type { Emoji } from '@/data/emojis';


const { t, locale } = useI18n()

const ui = computed(() => ({ selectPlaceholder: t('selectPlaceholder'), generateButton: t('generateButton') }))

const localizedCategories = computed(() => getLocalizedEmojiCategories(locale.value as any));

const currentEmojis = computed(() => {
  const category = localizedCategories.value.find(cat => cat.id === activeCategoryId.value);
  return category?.list ?? [];
})

const selectedEmojiId = ref<string>(emojiCategories[0]?.list[0]?.id ?? '');

const selectedEmoji = computed<Emoji | null>(() => {
  return currentEmojis.value.find(emoji => emoji.id === selectedEmojiId.value) ?? null;
})

function selectEmoji(emoji: Emoji) {
  selectedEmojiId.value = emoji.id;
}

const emit = defineEmits<{
  'update:text': [string]
  'update:image': [string | null]
  'update:imageType': [string]
  'generate': []
}>();

const inputText = ref('');
watch(inputText, (newVal) => {
  emit('update:text', newVal);
});

watch(selectedEmoji, (newEmoji) => {
  emit('update:image', newEmoji?.src ?? null);
}, { immediate: true });

watch(currentEmojis, (emojis) => {
  if (!emojis.some(emoji => emoji.id === selectedEmojiId.value)) {
    selectedEmojiId.value = emojis[0]?.id ?? '';
  }
}, { immediate: true });

watch(activeCategoryId, (newCategoryId) => {
  emit('update:imageType', newCategoryId);
}, { immediate: true });
</script>

<template>
  <div class="select-panel">
    <div class="category-tabs">
      <button
        v-for="category in localizedCategories"
        :key="category.id"
        :class="['tab', { active: category.id === activeCategoryId }]"
        @click="activeCategoryId = category.id; selectedEmojiId = category.list[0]?.id ?? ''"
      >
        {{ category.label }}
      </button>
    </div>

    <div class="emoji-grid">
      <button
        v-for="emoji in currentEmojis"
        :key="emoji.id"
        :class="['emoji-item', { active: emoji.id === selectedEmoji?.id }]"
        @click="selectEmoji(emoji)"
      >
        {{ emoji.name }}
      </button>
    </div>

    <div class="preview-image">
      <img
        :key="selectedEmoji?.id"
        :src="selectedEmoji?.src"
        :alt="selectedEmoji?.name"
      />
    </div>

    <div class="input-area-container">
      <input class="input-area" v-model="inputText" type="text" :placeholder="ui.selectPlaceholder" />
    </div>

    <div class="generate-container">
      <button 
        class="generate-btn"
        @click="emit('generate')"
      >
        {{ ui.generateButton }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.select-panel {
  display: flex;
  flex-direction: column;
}

/* ==== category tabs 样式 ==== */
.category-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, .3);
}

.tab {
  background: none;
  border: none;

  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  font-family: inherit;

  cursor: pointer;
  user-select: none;

  position: relative;

  transition: all 0.2s ease;
}

.tab:hover {
  color: rgba(255, 255, 255, 0.9);
}

.tab.active {
  color: #ff6b35;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  /* 贴在 padding 开始的位置 */
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 1.3px;
  background: #4d78db;
  border-radius: 2px;
}

/* ==== emoji grid 样式 ==== */
.emoji-grid {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.emoji-item {
  /* 外观 */
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  padding: 6px 16px;

  /* 文字 */
  color: rgba(255, 255, 255, 0.6);
  font-size: .9rem;
  line-height: 1.4;
  font-family: inherit;

  /* 交互 */
  cursor: pointer;
  user-select: none;

  transition: all 0.2s ease;
}

.emoji-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.9);
}

.emoji-item.active {
  background: #ff6b35;
  color: #fff;
  border-color: #ff6b35;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.25);
}

/* ==== preview image 样式 ==== */
.preview-image {
  height: 240px;
  border-radius: 12px;
  padding: 12px;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.preview-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* 保持图片比例，适应容器 */
  border-radius: 4px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5)); /* 沿着图片周围添加阴影 */
  animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ==== input area 样式 ==== */
.input-area-container {
  display: flex;
}

.input-area {
  flex: 1;

  /* 外观与背景 */
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  /* 极浅边框 */
  border-radius: 8px;
  padding: 10px 14px;

  /* 文字样式 */
  color: rgba(255, 255, 255, 0.87);
  font-size: .9rem;
  font-family: inherit;
  line-height: 1.5;

  /* 交互过渡 */
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  /* 占位符颜色 */
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
    opacity: 1;
  }

  /* 聚焦状态 */
  &:focus {
    border-color: #f1482b;
    box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
  }
}

/* ==== generate button 样式 ==== */
.generate-container {
  margin-top: 12px;
}

.generate-btn {
  width: 100%;
  padding: 10px 0;
  background: #e85a2a;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}

.generate-btn:hover {
  background: #ff6b35;
}
</style>