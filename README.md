# QuantInvest Pro - 量化投资学习系统

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

*一个综合性的量化投资交互式学习平台，连接学术金融理论与实践算法交易*

[English](#english) | [中文](#chinese)

</div>

---

## <a name="chinese"></a>🎯 项目简介

QuantInvest Pro 是一个现代化的量化投资教育平台，专注于通过可视化交互的方式帮助学习者掌握量化金融的核心概念。涵盖从择时模型到高频交易的完整量化投资框架。

### ✨ 核心特性

- 🎓 **交互式学习模块**：5个专业模块覆盖量化投资全流程
- 🌐 **中英双语支持**：一键切换语言，适合全球学习者
- 📊 **实时数据可视化**：基于 Recharts 的动态图表展示
- 🤖 **AI 智能导师**：集成 Google Gemini API 的实时问答系统
- 📱 **响应式设计**：完美支持桌面端和移动端
- 🎨 **现代化 UI**：基于 Tailwind CSS 的精美界面

---

## 📚 学习模块

### 1️⃣ 概览 (Overview)
- 量化投资三大支柱：资产选择、择时、权重分配
- 数据驱动方法论
- 经典理论与现代技术的融合

### 2️⃣ 择时模型 (Timing Models)
- **移动平均线 (MA)**：趋势跟踪
- **布林带 (Bollinger Bands)**：均值回归策略
- **卡尔曼滤波 (Kalman Filter)**：噪声消除与趋势估计

### 3️⃣ 投资组合理论 (Portfolio Theory)
- 有效前沿 (Efficient Frontier)
- 资本资产定价模型 (CAPM)
- 资本市场线 (CML)
- Alpha 与 Beta 分析

### 4️⃣ 算法交易与高频交易 (Algo & HFT)
- **市场微观结构**：订单簿 (LOB)、买卖价差
- **执行算法**：TWAP、VWAP、实施缺口
- **做市策略**：库存风险管理、Avellaneda-Stoikov 模型

### 5️⃣ AI 导师 (AI Tutor)
- 基于 Google Gemini 2.5 Flash 的智能问答
- 支持中英文自然语言交互
- 实时解答量化金融相关问题

---

## 🛠️ 技术栈

| 分类 | 技术 | 版本 |
|------|------|------|
| 前端框架 | React | 19.2.0 |
| 开发语言 | TypeScript | 5.8.2 |
| 构建工具 | Vite | 6.2.0 |
| UI 框架 | Tailwind CSS | - |
| 图表库 | Recharts | 3.5.1 |
| 图标库 | Lucide React | 0.555.0 |
| AI 服务 | Google Gemini API | 1.30.0 |

---

## 🚀 快速开始

### 前置要求

- **Node.js** >= 18.0.0
- **npm** 或 **yarn** 或 **pnpm**

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/easy-quant-open.git
   cd easy-quant-open
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或
   yarn install
   # 或
   pnpm install
   ```

3. **配置环境变量**

   创建 `.env.local` 文件并添加你的 Gemini API 密钥：
   ```bash
   # 复制示例文件
   cp .env.local.example .env.local
   ```

   编辑 `.env.local`：
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   获取 API 密钥：访问 [Google AI Studio](https://aistudio.google.com/app/apikey)

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

   访问 http://localhost:3000

5. **构建生产版本**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📁 项目结构

```
easy-quant-open/
├── components/           # React 组件
│   ├── Intro.tsx        # 概览模块
│   ├── TimingModel.tsx  # 择时模型
│   ├── PortfolioTheory.tsx  # 投资组合理论
│   ├── HighFreq.tsx     # 高频交易
│   ├── AiTutor.tsx      # AI 导师
│   └── Sidebar.tsx      # 侧边栏导航
├── services/            # 业务逻辑
│   └── geminiService.ts # Gemini API 服务
├── utils/               # 工具函数
├── App.tsx              # 主应用组件
├── LanguageContext.tsx  # 国际化上下文
├── types.ts             # TypeScript 类型定义
├── index.tsx            # 入口文件
├── vite.config.ts       # Vite 配置
└── package.json         # 项目依赖
```

---

## 🌍 环境变量说明

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `GEMINI_API_KEY` | Google Gemini API 密钥 | ✅ 是 |

---

## 🎨 使用说明

1. **选择模块**：使用左侧边栏切换不同的学习模块
2. **切换语言**：点击右上角语言切换按钮（🌐）
3. **交互学习**：
   - 在择时模型中切换不同的指标查看效果
   - 在投资组合理论中调整参数观察有效前沿变化
   - 在高频交易模块中查看订单簿动态
4. **AI 问答**：在 AI 导师模块中输入问题，获取实时解答

---

## 🐛 已知问题修复

### Bug: API Key 未定义
**问题描述**：初次运行时，Gemini API 调用失败
**原因**：缺少 `.env.local` 环境变量文件
**解决方案**：按照上述"配置环境变量"步骤创建 `.env.local` 文件

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 🙏 致谢

- [Google Gemini](https://ai.google.dev/) 提供 AI 能力
- [Recharts](https://recharts.org/) 提供图表支持
- [Lucide](https://lucide.dev/) 提供图标

---

<div align="center">

## <a name="english"></a>📖 English Version

### 🎯 Introduction

QuantInvest Pro is a modern quantitative investment educational platform that helps learners master core quantitative finance concepts through interactive visualizations. It covers the complete quantitative investment framework from timing models to high-frequency trading.

### ✨ Key Features

- 🎓 **Interactive Learning Modules**: 5 professional modules covering the full quant investment process
- 🌐 **Bilingual Support**: One-click language switching for global learners
- 📊 **Real-time Data Visualization**: Dynamic charts powered by Recharts
- 🤖 **AI Tutor**: Real-time Q&A system integrated with Google Gemini API
- 📱 **Responsive Design**: Perfect support for desktop and mobile
- 🎨 **Modern UI**: Beautiful interface based on Tailwind CSS

### 🚀 Quick Start

**Prerequisites:** Node.js >= 18.0.0

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/easy-quant-open.git
   cd easy-quant-open
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create `.env.local` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Get API key from: [Google AI Studio](https://aistudio.google.com/app/apikey)

4. **Start development server**
   ```bash
   npm run dev
   ```

   Visit http://localhost:3000

### 📚 Learning Modules

1. **Overview**: Core strategy pillars and methodologies
2. **Timing Models**: MA, Bollinger Bands, Kalman Filter
3. **Portfolio Theory**: Efficient Frontier, CAPM, Alpha/Beta
4. **Algo & HFT**: Order books, execution algorithms, market making
5. **AI Tutor**: Gemini-powered interactive learning assistant

### 📄 License

MIT License - see [LICENSE](LICENSE) file for details

</div>

---

<div align="center">

**Made with ❤️ for Quantitative Finance Learners**

⭐ 如果这个项目对你有帮助，请给一个 Star！
⭐ If this project helps you, please give it a Star!

</div>
