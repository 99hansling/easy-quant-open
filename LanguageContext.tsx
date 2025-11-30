
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Language } from './types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "app_title": "QuantInvest Pro",
    "subtitle": "Interactive Quantitative Finance",
    "nav_overview": "Overview",
    "nav_timing": "Timing Models",
    "nav_portfolio": "Portfolio Theory",
    "nav_algo": "Algo & HFT",
    "nav_tutor": "AI Tutor",

    "intro_title": "Quantitative Investment System",
    "intro_desc": "A comprehensive platform bridging academic finance theory and practical algorithmic trading. Explore how mathematical models drive modern investment decisions without needing to reference external textbooks.",
    "strategy_pillars": "Core Strategy Pillars",
    "asset_selection": "Asset Selection (Factor Models)",
    "timing": "Market Timing (Signal Processing)",
    "weighting": "Portfolio Construction (Risk Parity/MVO)",
    "data_driven": "Data Driven Approach",
    "data_driven_desc": "Leveraging fundamental financial statements, market microstructure data (price/volume), and alternative data sources to generate Alpha.",
    "methodology": "Methodologies",
    "methodology_desc": "Integrating classic asset pricing theories like CAPM and APT with modern statistical arbitrage and machine learning techniques.",
    "how_to_use": "Interactive Learning Modules",
    "how_to_use_desc": "Use the sidebar to navigate through specialized modules. Each section visualizes a core quantitative concept, from denoising price signals to managing high-frequency order books.",

    "timing_title": "Quantitative Timing Models",
    "timing_desc": "Financial data is inherently noisy. Timing models aim to filter out market noise to reveal the true underlying trend. Compare standard lagging indicators with advanced statistical estimation methods.",
    "btn_ma": "Moving Average (Trend)",
    "btn_bb": "Bollinger Bands (Mean Reversion)",
    "btn_kf": "Kalman Filter (Noise Reduction)",
    "theory_context": "Theory Context",
    "theory_desc": "The Kalman Filter is an optimal recursive data processing algorithm that estimates the state of a linear dynamic system from noisy measurements. In quant finance, it's used for trend estimation and signal extraction from noisy price data.",
    "bb_desc": "Bollinger Bands (developed by John Bollinger) are volatility bands placed above and below a moving average. They expand and contract based on market volatility (measured by standard deviation). A key mean-reversion signal: price touching the upper band suggests overbought (potential sell), while touching the lower band suggests oversold (potential buy).",

    "portfolio_title": "Modern Portfolio Theory",
    "portfolio_desc": "Based on Markowitz's groundbreaking work, MPT demonstrates how to construct portfolios that maximize expected return for a given level of risk. The efficient frontier represents the set of optimal portfolios offering the highest return for each risk level.",
    "risk_axis": "Risk (Volatility)",
    "return_axis": "Expected Return (%)",
    "key_concepts": "Key Concepts",
    "eff_frontier": "Efficient Frontier",
    "eff_frontier_desc": "The curve of optimal portfolios in risk-return space. Any portfolio on this curve maximizes return for its level of risk. Portfolios below the frontier are suboptimal.",
    "capm_desc": "CAPM (Capital Asset Pricing Model): E(Ri) = Rf + βi(E(Rm) - Rf). It relates expected return to systematic risk (beta). The model assumes investors hold the market portfolio and only bear systematic risk.",
    "alpha_beta_desc": "Alpha measures a portfolio's excess return above what CAPM predicts (skill-based outperformance). Beta measures sensitivity to market movements. A beta > 1 means higher volatility than the market; beta < 1 means lower volatility.",

    "hft_title": "High-Frequency Trading & Market Microstructure",
    "hft_desc": "Explore the mechanics of modern electronic markets. Understand order books, execution algorithms, and market making strategies that operate at sub-second timescales.",
    "live_feed": "Live Order Book (Simulated)",
    "bid_size": "Bid Size",
    "ask_size": "Ask Size",
    "vwap_title": "VWAP Execution",
    "vwap_desc": "Volume Weighted Average Price: An execution algorithm that breaks large orders into smaller slices traded throughout the day to match the market's volume profile, minimizing market impact.",
    "mm_title": "Market Making",
    "mm_desc": "Providing liquidity by simultaneously quoting bid and ask prices. The market maker profits from the bid-ask spread while managing inventory risk and adverse selection.",
    "as_model": "Avellaneda-Stoikov Model",
    "as_desc": "A mathematical framework for optimal market making that dynamically adjusts bid/ask spreads based on inventory risk and market volatility. Helps market makers optimize quote placement.",

    "tutor_welcome": "👋 Hello! I'm your Quantitative Finance Tutor, powered by Google Gemini. I'm here to help you understand quantitative investment concepts. Ask me anything about timing models, portfolio theory, factor models, or high-frequency trading!",
    "tutor_placeholder": "Ask about quant concepts, formulas, or strategies..."
  },
  zh: {
    "app_title": "QuantInvest Pro",
    "subtitle": "交互式量化金融学习平台",
    "nav_overview": "概览",
    "nav_timing": "择时模型",
    "nav_portfolio": "组合理论",
    "nav_algo": "算法与高频",
    "nav_tutor": "AI 导师",

    "intro_title": "量化投资系统",
    "intro_desc": "一个连接学术金融理论与实践算法交易的综合性平台。探索数学模型如何驱动现代投资决策,无需参考外部教科书。",
    "strategy_pillars": "核心策略支柱",
    "asset_selection": "资产选择(因子模型)",
    "timing": "市场择时(信号处理)",
    "weighting": "组合构建(风险平价/均值方差)",
    "data_driven": "数据驱动方法",
    "data_driven_desc": "利用基本面财务报表、市场微观结构数据(价格/成交量)以及另类数据源来生成超额收益(Alpha)。",
    "methodology": "方法论",
    "methodology_desc": "整合经典资产定价理论如 CAPM 和 APT 与现代统计套利和机器学习技术。",
    "how_to_use": "交互式学习模块",
    "how_to_use_desc": "使用侧边栏导航浏览专业模块。每个部分可视化一个核心量化概念,从价格信号降噪到高频订单簿管理。",

    "timing_title": "量化择时模型",
    "timing_desc": "金融数据天然含有噪声。择时模型旨在过滤市场噪声以揭示真实的潜在趋势。比较标准滞后指标与先进的统计估计方法。",
    "btn_ma": "移动平均线(趋势)",
    "btn_bb": "布林带(均值回归)",
    "btn_kf": "卡尔曼滤波(降噪)",
    "theory_context": "理论背景",
    "theory_desc": "卡尔曼滤波是一种最优递归数据处理算法,从含噪声的测量值中估计线性动态系统的状态。在量化金融中,它用于从含噪声的价格数据中进行趋势估计和信号提取。",
    "bb_desc": "布林带(由约翰·布林格开发)是位于移动平均线上下的波动率带。它们根据市场波动率(由标准差衡量)扩张和收缩。关键的均值回归信号:价格触及上轨表明超买(潜在卖出),而触及下轨表明超卖(潜在买入)。",

    "portfolio_title": "现代投资组合理论",
    "portfolio_desc": "基于马科维茨的开创性工作,MPT 展示了如何构建在给定风险水平下最大化预期收益的投资组合。有效前沿代表了为每个风险水平提供最高收益的最优投资组合集合。",
    "risk_axis": "风险(波动率)",
    "return_axis": "预期收益(%)",
    "key_concepts": "核心概念",
    "eff_frontier": "有效前沿",
    "eff_frontier_desc": "风险-收益空间中的最优投资组合曲线。这条曲线上的任何投资组合在其风险水平下都能最大化收益。低于前沿的投资组合是次优的。",
    "capm_desc": "CAPM(资本资产定价模型): E(Ri) = Rf + βi(E(Rm) - Rf)。它将预期收益与系统性风险(贝塔)联系起来。该模型假设投资者持有市场组合,仅承担系统性风险。",
    "alpha_beta_desc": "Alpha 衡量投资组合超出 CAPM 预测的超额收益(基于技能的超额表现)。Beta 衡量对市场波动的敏感性。Beta > 1 意味着波动性高于市场;Beta < 1 意味着波动性低于市场。",

    "hft_title": "高频交易与市场微观结构",
    "hft_desc": "探索现代电子市场的运作机制。了解订单簿、执行算法和以亚秒级时间尺度运作的做市策略。",
    "live_feed": "实时订单簿(模拟)",
    "bid_size": "买盘量",
    "ask_size": "卖盘量",
    "vwap_title": "VWAP 执行",
    "vwap_desc": "成交量加权平均价格:一种执行算法,将大额订单分解成较小的部分,在全天交易以匹配市场的成交量分布,从而最小化市场冲击。",
    "mm_title": "做市商",
    "mm_desc": "通过同时报出买价和卖价来提供流动性。做市商从买卖价差中获利,同时管理库存风险和逆向选择。",
    "as_model": "Avellaneda-Stoikov 模型",
    "as_desc": "最优做市的数学框架,根据库存风险和市场波动率动态调整买卖价差。帮助做市商优化报价位置。",

    "tutor_welcome": "👋 你好!我是你的量化金融导师,由 Google Gemini 提供支持。我在这里帮助你理解量化投资的核心概念。欢迎询问关于择时模型、投资组合理论、因子模型或高频交易的任何问题!",
    "tutor_placeholder": "询问量化概念、公式或策略..."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
