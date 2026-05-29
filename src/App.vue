<script setup lang="ts">
import { ref } from 'vue';
import SelectPanel from './components/SelectPanel.vue';
import PreviewPanel from './components/PreviewPanel.vue';

const inputText = ref('');
const selectedImage = ref<string | null>('');

function handleTextUpdate(newText: string) {
  inputText.value = newText;
}
function handleImageUpdate(newImage: string | null) {
  selectedImage.value = newImage;
}

const triggerGenerateId = ref(0);
function sendGenerateRequest() {
  triggerGenerateId.value++;
}
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <img src="/logo.webp" alt="魔法少女的魔女审判" class="logo" height="70px" />
      <h1 class="title">
        <span class="title-part title-main">表情包</span>
        <span class="title-part title-sub">生成器</span>
      </h1>
    </header>

    <div class="app-body">
      <div class="card left-card">
        <SelectPanel
          @update:text="handleTextUpdate"
          @update:image="handleImageUpdate"
          @generate="sendGenerateRequest"
        />
      </div>
      <div class="card right-card">
        <PreviewPanel
          :text="inputText"
          :image="selectedImage"
          :generateID="triggerGenerateId"
        />
      </div>
    </div>

  </div>
</template>

<style scoped lang="stylus">
  .app-container
    display: flex
    flex-direction: column
    height: 100vh
    background: #0c1113
    padding: 60px 64px

  // ==== 标题栏 ====
  .app-header
    display: flex
    justify-content: center
    align-items: center
    gap: 10px
    padding: 12px 24px

  .title
    display: flex
    align-items: baseline
    gap: 4px
    margin: 0
    font-size: 2rem 
    line-height: 1.2

  .title-main
    color: #ff6b35
    font-weight: 800
    font-size: 1em

  .title-sub
    color: #dfdfdf
    font-weight: 400
    font-size: 0.7em

  // ==== 主体 ====
  .app-body
    flex: 1
    display: flex
    gap: 16px
    padding: 16px
    max-width: 1000px
    margin: 0 auto
    width: 100%

  .card
    flex: 1
    background: #1e1e1e
    border: 1px solid rgba(255, 255, 255, 0.06)
    border-radius: 12px
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4)
    padding: 20px
    color: rgba(255, 255, 255, 0.87)
</style>
