// ThemeProvider allows you to pass, update, merge and augment theme through context down react tree.
// withTheme allows you to receive theme and its updates in your components as a theme prop.
// createTheming allows you to integrate theming into your CSSinJS library with custom channel (if you need custom one).

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  // useState,
} from 'react';
import { LightTheme } from './tokens';
import deepmerge from 'deepmerge';

export interface ThemeProviderContext {
  theme: MD3Theme;
  components?: Record<string, MD3Theme['colors']>;
}

const DefaultThemeConfig: ThemeProviderContext = {
  theme: LightTheme,
};

const ThemeContext = createContext<ThemeProviderContext>(DefaultThemeConfig);

interface ThemeProviderProps {
  children: ReactNode;
  theme: ThemeProviderContext;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, theme }) => {
  const parentTheme = useContext(ThemeContext);
  const childrenTheme = useMemo(
    () => deepmerge(theme, parentTheme),
    [theme, parentTheme],
  );
  return (
    <ThemeContext.Provider value={childrenTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

// export const withTheme = () => {}
