export const colors = {
  background: '#070313',
  backgroundSoft: '#0D0620',
  surface: '#15102A',
  surfaceSoft: '#1B1435',
  surfaceElevated: '#211943',

  primary: '#A855F7',
  primarySoft: '#C084FC',
  primaryDeep: '#7C3AED',

  accent: '#8B5CF6',
  accentSoft: '#C4B5FD',

  peach: '#F0ABFC',
  peachSoft: '#E879F9',

  pink: '#D946EF',
  pinkSoft: '#F0ABFC',

  text: '#FAF7FF',
  textSecondary: '#C8BEDA',
  textMuted: '#9185AA',

  border: 'rgba(255,255,255,0.10)',
  borderStrong: 'rgba(255,255,255,0.18)',

  overlay: 'rgba(255,255,255,0.04)',
  overlayStrong: 'rgba(255,255,255,0.08)',

  gradientPrimary: ['#7C3AED', '#A855F7'],
  gradientAurora: ['#4C1D95', '#A855F7', '#D946EF'],
  gradientMint: ['#7C3AED', '#C084FC'],

  shadow: 'rgba(0,0,0,0.55)',
  surfaceGlass: 'rgba(30,18,55,0.68)',
};

export const typography = {
  eyebrow: {
    fontSize: 12,
    letterSpacing: 3.2,
    fontWeight: '800',
  },

  display: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1.2,
  },

  hero: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1.5,
  },

  title: {
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: -0.7,
  },

  heading: {
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.25,
  },

  subheading: {
    fontSize: 17,
    fontWeight: '700',
  },

  body: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.1,
  },

  bodySmall: {
    fontSize: 15,
    fontWeight: '500',
  },

  caption: {
    fontSize: 14,
    fontWeight: '600',
  },

  micro: {
    fontSize: 12,
    fontWeight: '700',
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
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 5,
  },

  glow: {
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 22,
    elevation: 8,
  },

  accentGlow: {
    shadowColor: '#D946EF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 7,
  },
};
