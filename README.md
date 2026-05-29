# 表情包生成器

一个基于 Vue 3 + Vite 的表情包生成器。左侧选择表情、输入文字，点击生成后会把文字绘制到图片上，并在右侧预览最终效果。

## 功能

- 按分类切换表情素材
- 选择单个表情并预览原图
- 输入自定义文字并生成表情包预览
- 使用 Canvas 在浏览器中完成图片合成

## 技术栈

- Vue 3
- TypeScript
- Vite
- Stylus / CSS

## 项目结构

```text
src/
	App.vue                # 页面布局与状态管理
	main.ts                # 应用入口
	assets/main.css        # 全局样式
	components/
		SelectPanel.vue      # 表情选择与输入区
		PreviewPanel.vue     # 表情包预览渲染区
	data/emojis.ts         # 表情素材数据
public/
	emojis/                # 表情图片资源
```

## 本地运行

确保已安装 Node.js 20.19+ 或 22.12+，然后执行：

```bash
npm install
npm run dev
```

开发服务器启动后，打开终端输出中的本地地址即可查看应用。

## 构建与预览

```bash
npm run build
npm run preview
```

## 使用说明

1. 在左侧切换表情分类。
2. 点击一个表情查看原图。
3. 输入要叠加的文字。
4. 点击“生成表情包”，在右侧查看合成结果。

## 说明

- 当前文字绘制使用浏览器 Canvas 完成。
- 如果文字较长，可能会超出图片可视范围，后续可以再加入自动缩放或换行逻辑。
