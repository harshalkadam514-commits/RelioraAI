export const colors = {
  // Base
  background: '#08070C',
  backgroundAlt: '#0D0C14',
  surface: '#141320',
  surface2: '#1C1B2B',
  surfaceElevated: '#211F33',
  border: 'rgba(255,255,255,0.09)',
  borderStrong: 'rgba(255,255,255,0.16)',

  // Text
  text: '#F5F4FA',
  textSecondary: '#B4B1C6',
  textMuted: '#7A7791',

  // Brand
  primary: '#A683FF',
  primarySoft: '#7C5CFF',
  primaryDeep: '#5B3FDB',
  accent: '#FFB199',
  accentSoft: '#FF8FB0',
  gold: '#E8C77E',

  // Status
  success: '#5FE3A6',
  danger: '#FF6B7A',
  warning: '#F5C563',

  // Gradients (array pairs for LinearGradient)
  gradientPrimary: ['#7C5CFF', '#A683FF'],
  gradientWarm: ['#FF8FB0', '#FFB199'],
  gradientDark: ['#141320', '#08070C'],
  gradientCard: ['#1C1B2B', '#141320'],
};

export const typography = {
  eyebrow: {
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: '800',
  },
  display: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  heading: {
    fontSize: 18,
    fontWeight: '800',
  },
  subheading: {
    fontSize: 16,
    fontWeight: '700',
  },
  body: {
    fontSize: 15,
    fontWeight: '500',
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
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
};

export const shadow = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  glow: {
    shadowColor: '#A683FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
};
