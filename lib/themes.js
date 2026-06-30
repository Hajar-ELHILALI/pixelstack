// Color palettes for PixelStack components.
// Add a new theme here and it becomes available via ?theme=<name>.

export const themes = {
  midnight: {
    panelBg: '#17171f',
    badgeBg: '#1b1b2a',
    border: '#3a3a55',
    shadow: 'rgba(0,0,0,0.30)',
    header: '#f0c674',
    label: '#9a9ab5',
    value: '#ffffff',
    dim: '#33334d',
    grid: 'rgba(255,255,255,0.03)',
    name: '#e6e6e6',
    bars: ['#6ee787', '#56d4dd', '#79c0ff', '#f0c674'],
    sprite: '#6ee787',
    mono: '#e6e6ea',
  },
  dracula: {
    panelBg: '#282a36',
    badgeBg: '#282a36',
    border: '#44475a',
    shadow: 'rgba(0,0,0,0.30)',
    header: '#f1fa8c',
    label: '#6272a4',
    value: '#f8f8f2',
    dim: '#44475a',
    grid: 'rgba(255,255,255,0.035)',
    name: '#f8f8f2',
    bars: ['#bd93f9', '#8be9fd', '#ff79c6', '#50fa7b'],
    sprite: '#bd93f9',
    mono: '#f8f8f2',
  },
  light: {
    panelBg: '#f6f6f4',
    badgeBg: '#ffffff',
    border: '#b6bac6',
    shadow: 'rgba(0,0,0,0.14)',
    header: '#b07d1a',
    label: '#6b7280',
    value: '#1f2330',
    dim: '#dfe2ea',
    grid: 'rgba(0,0,0,0.05)',
    name: '#2a2e3a',
    bars: ['#2da44e', '#0a7ea4', '#2f6fdb', '#c08a00'],
    sprite: '#24292f',
    mono: '#24292f',
  },
};

export function getTheme(name) {
  return themes[String(name || '').toLowerCase()] || themes.midnight;
}
