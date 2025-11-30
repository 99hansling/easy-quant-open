
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
    "btn_kf