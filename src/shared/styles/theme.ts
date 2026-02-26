export const theme = {
  light: { background: '#ffffff', foreground: '#000000' },
  dark: { background: '#151a2a', foreground: '#ffffff' }
};

type ThemeTokens = Record<`--${string}`, string>;

const lightTokens: ThemeTokens = {
  "--background": "0 0% 100%",
  "--shell": "210 18% 95%",
  "--foreground": "222 47% 11%",
  "--primary": "217 91% 60%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "214 95% 93%",
  "--secondary-foreground": "222 47% 11%",
  "--muted": "210 40% 96%",
  "--muted-foreground": "215 16% 47%",
  "--accent": "214 95% 93%",
  "--accent-foreground": "222 47% 11%",
  "--destructive": "0 84% 60%",
  "--destructive-foreground": "0 0% 100%",
  "--card": "0 0% 100%",
  "--card-foreground": "222 47% 11%",
  "--popover": "0 0% 100%",
  "--popover-foreground": "222 47% 11%",
  "--border": "214 32% 91%",
  "--input": "214 32% 91%",
  "--ring": "217 91% 60%",
  "--success": "142 71% 45%",
  "--success-foreground": "0 0% 100%",
  "--warning": "38 92% 50%",
  "--warning-foreground": "0 0% 100%",
  "--info": "199 89% 48%",
  "--info-foreground": "0 0% 100%",
};

const darkTokens: ThemeTokens = {
  "--background": "222 47% 5%",
  "--shell": "222 47% 3%",
  "--foreground": "210 40% 98%",
  "--primary": "217 91% 60%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "217 33% 17%",
  "--secondary-foreground": "210 40% 98%",
  "--muted": "217 33% 17%",
  "--muted-foreground": "215 20% 65%",
  "--accent": "217 33% 17%",
  "--accent-foreground": "210 40% 98%",
  "--destructive": "0 63% 31%",
  "--destructive-foreground": "210 40% 98%",
  "--card": "222 47% 7%",
  "--card-foreground": "210 40% 98%",
  "--popover": "222 47% 7%",
  "--popover-foreground": "210 40% 98%",
  "--border": "217 33% 17%",
  "--input": "217 33% 17%",
  "--ring": "217 91% 60%",
  "--success": "142 71% 45%",
  "--success-foreground": "0 0% 100%",
  "--warning": "38 92% 50%",
  "--warning-foreground": "0 0% 100%",
  "--info": "199 89% 48%",
  "--info-foreground": "0 0% 100%",
};

export const getThemeTokens = (isDark: boolean): ThemeTokens => (isDark ? darkTokens : lightTokens);
