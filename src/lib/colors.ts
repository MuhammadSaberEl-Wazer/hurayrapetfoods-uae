/**
 * Brand Colors - Extracted from Hurayra Pet Foods HTML
 * Based on the original WordPress/Elementor site
 */

export const colors = {
  // Primary Colors
  primary: '#008080',        // Teal - Main brand color
  secondary: '#D46681',      // Pink - Secondary brand color
  accent: '#C8A029',         // Gold - Accent color
  
  // Supporting Colors
  pink: '#D46681',           // Pink accent
  tealLight: '#60BABF',      // Light Teal
  tealDark: '#035F5D',       // Dark Teal
  
  // Neutral Colors
  white: '#FFFFFF',
  gray: '#EFEFEF',
  grayLight: '#F0F5FA',
  grayDark: '#334155',
  black: '#000002',
} as const

// CSS Variables mapping
export const cssVariables = {
  '--color-primary': colors.primary,
  '--color-secondary': colors.secondary,
  '--color-accent': colors.accent,
  '--color-pink': colors.pink,
  '--color-teal-light': colors.tealLight,
  '--color-teal-dark': colors.tealDark,
  '--color-white': colors.white,
  '--color-gray': colors.gray,
  '--color-gray-light': colors.grayLight,
  '--color-gray-dark': colors.grayDark,
  '--color-black': colors.black,
} as const

// Type-safe color keys
export type ColorKey = keyof typeof colors
