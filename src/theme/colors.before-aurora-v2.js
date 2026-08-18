export const colors = {
  // ═══════════════════════════════════════════════
  // RELIORA — PREMIUM CINEMATIC THEME
  // ═══════════════════════════════════════════════

  // Background
  background: '#070711',
  backgroundAlt: '#0B0B17',
  backgroundSoft: '#10101D',

  // Surfaces
  surface: '#121221',
  surface2: '#18182A',
  surfaceElevated: '#202037',
  surfaceGlass: 'rgba(255,255,255,0.055)',
  surfaceGlassStrong: 'rgba(255,255,255,0.085)',

  // Borders
  border: 'rgba(255,255,255,0.075)',
  borderStrong: 'rgba(255,255,255,0.14)',
  borderGlow: 'rgba(145,120,255,0.30)',

  // Text
  text: '#F8F7FF',
  textSecondary: '#B9B7CC',
  textMuted: '#77758D',
  textDim: '#56546B',

  // Primary — Reliora Violet
  primary: '#9B7BFF',
  primarySoft: '#B49AFF',
  primaryDeep: '#6947E8',
  primaryDark: '#4630A8',

  // Secondary — Emotional Rose
  accent: '#FF9FBC',
  accentSoft: '#FFBCD0',
  accentDeep: '#E86F99',

  // Warm premium highlight
  gold: '#E9C982',
  goldSoft: '#F3DDA5',

  // Status
  success: '#63E6B0',
  danger: '#FF7185',
  warning: '#F5C866',
  info: '#78B9FF',

  // Special
  white: '#FFFFFF',
  black: '#000000',

  // ═══════════════════════════════════════════════
  // GRADIENTS
  // ═══════════════════════════════════════════════

  gradientPrimary: [
    '#6844E8',
    '#9B7BFF',
    '#C2A9FF',
  ],

  gradientAurora: [
    '#34206F',
    '#6747C9',
    '#A86EAA',
  ],

  gradientWarm: [
    '#E86F99',
    '#FF9FBC',
    '#F2C28F',
  ],

  gradientDark: [
    '#18182A',
    '#070711',
  ],

  gradientCard: [
    '#202037',
    '#121221',
  ],

  gradientPremium: [
    '#4B2A9E',
    '#815FE8',
    '#C084A7',
  ],

  // ═══════════════════════════════════════════════
  // AMBIENT GLOWS
  // ═══════════════════════════════════════════════

  glowPrimary: 'rgba(155,123,255,0.22)',
  glowPrimaryStrong: 'rgba(155,123,255,0.38)',
  glowAccent: 'rgba(255,159,188,0.18)',
  glowGold: 'rgba(233,201,130,0.16)',
  glowSuccess: 'rgba(99,230,176,0.16)',

  // ═══════════════════════════════════════════════
  // TRANSPARENT TINTS
  // ═══════════════════════════════════════════════

  primaryTint: 'rgba(155,123,255,0.10)',
  primaryTintStrong: 'rgba(155,123,255,0.17)',
  accentTint: 'rgba(255,159,188,0.10)',
  successTint: 'rgba(99,230,176,0.09)',
  dangerTint: 'rgba(255,113,133,0.09)',
};

export const typography = {
  eyebrow: {
    fontSize: 11,
    letterSpacing: 2.4,
    fontWeight: '800',
  },

  display: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.8,
  },

  hero: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1.1,
  },

  title: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },

  heading: {
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: -0.2,
  },

  subheading: {
    fontSize: 16,
    fontWeight: '700',
  },

  body: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.05,
  },

  bodySmall: {
    fontSize: 14,
    fontWeight: '500',
  },

  caption: {
    fontSize: 13,
    fontWeight: '600',
  },

  micro: {
    fontSize: 12,
    fontWeight: '600',
  },
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
  xxl: 42,
  xxxl: 56,
};

export const radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 26,
  xxl: 32,
  pill: 999,
};

export const shadow = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.30,
    shadowRadius: 22,
    elevation: 7,
  },

  glow: {
    shadowColor: '#9B7BFF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.42,
    shadowRadius: 24,
    elevation: 10,
  },

  accentGlow: {
    shadowColor: '#FF9FBC',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.30,
    shadowRadius: 22,
    elevation: 8,
  },
};
