<script setup lang="ts">
import { ref } from 'vue';
import SelectPanel from './components/SelectPanel.vue';
import PreviewPanel from './components/PreviewPanel.vue';

const inputText = ref('');
const selectedImage = ref<string | null>('');
const selectedImageType = ref<string>('');
function handleTextUpdate(newText: string) {
  inputText.value = newText;
}
function handleImageUpdate(newImage: string | null) {
  selectedImage.value = newImage;
}
function handleImageTypeUpdate(newType: string) {
  selectedImageType.value = newType;
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
          @update:imageType="handleImageTypeUpdate"
          @generate="sendGenerateRequest"
        />
      </div>
      <div class="card right-card">
        <PreviewPanel
          :text="inputText"
          :image="selectedImage"
          :imageType="selectedImageType"
          :generateID="triggerGenerateId"
        />
      </div>
    </div>
    <footer class="app-footer">
      <div class="footer-links">
        <span>
          © 原作 <a href="https://manosaba.com" target="_blank" rel="noopener">魔法少女ノ魔女裁判</a>
          Re,AER LLC./Acacia
        </span>
        <a href="https://manosaba.com/guideline" target="_blank" rel="noopener">
          二次創作ガイドライン
        </a>
      </div>

      <div class="footer-info">
        <!-- 你的版权 -->
        <span>© 2026 魔法少女ノ魔女裁判 表情包生成器（非官方）By james1BadCreeper</span>
        <p> | </p>
        <!-- GitHub 仓库 -->
        <a href="https://github.com/james1BadCreeper/magosaba-emoji-generator" target="_blank" rel="noopener">
          GitHub
        </a>
        <p> | </p>
        <!-- 你的博客 -->
        <a href="https://iznomia.com" target="_blank" rel="noopener">
          iznomia
        </a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  background: #0c1113;
  padding: 60px 64px;
}

/* ==== 标题栏 ==== */
.app-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
}

.title {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin: 0;
  font-size: 2rem;
  line-height: 1.2;
}

.title-main {
  color: #ff6b35;
  font-weight: 800;
  font-size: 1em;
}

.title-sub {
  color: #dfdfdf;
  font-weight: 400;
  font-size: 0.7em;
}

/* ==== 主体 ==== */
.app-body {
  flex: 1;
  display: flex;
  gap: 16px;
  padding: 16px;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.card {
  flex: 1;
  background: #1e1e1e;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  padding: 20px;
  color: rgba(255, 255, 255, 0.87);
}

/* ===== Footer ===== */
.app-footer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px 24px;
  padding: 14px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.5);
  font-size: .825rem;
  line-height: 1.6;
}

.app-footer a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.2s;
}

.app-footer a:hover {
  color: #ff8a50;
}

.footer-links,
.footer-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 600px) {
  .app-container {
    padding: 20px 16px;
  }

  .app-header {
    padding: 8px 0 16px;
  }

  .title {
    font-size: 1.4rem;
  }

  .app-body {
    flex-direction: column;
    padding: 0;
    max-width: 100%;
  }

  .card {
    width: 100%;
    padding: 16px;
  }

  .app-footer {
    padding: 16px 0 0;
    text-align: center;
  }
}
</style>
