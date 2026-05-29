<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  text: string
  image: string | null
  generateID: number
}>();

const previewUrl = ref<string>('');
const isGenerating = ref<boolean>(false);

watch(() => props.generateID, () => {
  if (props.image === null) {
    previewUrl.value = '';
    return;
  }

  isGenerating.value = true;
  previewUrl.value = '';

  const img = new Image();
  img.src = props.image;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth; // natural 是图片原始尺寸，width 是当前显示尺寸
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!; // 断言非 null

    ctx.drawImage(img, 0, 0);
    ctx.font = 'bold 64px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 6;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    const x = canvas.width / 2;
    const y = canvas.height * 0.9;
    ctx.strokeText(props.text, x, y);
    ctx.fillText(props.text, x, y);

    previewUrl.value = canvas.toDataURL('image/png');
    isGenerating.value = false;
  };
});

function copyImage() {

}
</script>

<template>
  <div class="preview-panel">
    <div v-if="!previewUrl && !isGenerating" class="placeholder">
      点击左侧「生成表情包」查看效果
    </div>
    <div v-if="isGenerating" class="placeholder">
      生成中...
    </div>
    <div v-if="previewUrl" class="result-container">
      <img :src="previewUrl" alt="预览图" class="result-img"/>
      <div class="actions">
        <button @click="copyImage" class="btn">复制</button>
        <a :href="previewUrl" download="result.png" class="btn">下载</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.result-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-img {
  max-width: 100%;
  max-height: 400px;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn {
  font-family: inherit;
  padding: 8px 20px;
  background: #ff6b35;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn:hover {
  background: #e85a2a;
}
</style>