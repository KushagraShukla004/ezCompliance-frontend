import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === 'dark'
    ? {
        grey: {
          50: '#FFFFFF',
          100: '#e0e0e0',
          200: '#c2c2c2',
          300: '#a3a3a3',
          400: '#858585',
          500: '#666666',
          600: '#525252',
          700: '#3d3d3d',
          800: '#292929',
          900: '#141414',
        },
        primary: {
          100: '#d0d1d5',
          200: '#a1a4ab',
          300: '#727681',
          400: '#1c2536',
          500: '#141b2d', //custom
          600: '#101624',
          700: '#0c101b',
          800: '#080b12',
          900: '#040509',
        },
        //my custom
        secondary: {
          100: '#a6e7d5',
          200: '#8fe0cb',
          300: '#79dac1',
          400: '#62d4b6',
          500: '#4cceac',
          600: '#43b497',
          700: '#399b81',
          800: '#30816b',
          900: '#266756',
        },
        greenAccent: {
          100: '#dbf5ee',
          200: '#b7ebde',
          300: '#94e2cd',
          400: '#3dc9be', //custom
          500: '#4cceac',
          600: '#3da58a',
          700: '#2e7c67',
          800: '#1e5245',
          900: '#0f2922',
        },
        redAccent: {
          100: '#f8dcdb',
          200: '#f1b9b7',
          300: '#e99592',
          400: '#e2726e',
          500: '#db4f4a',
          600: '#af3f3b',
          700: '#832f2c',
          800: '#58201e',
          900: '#2c100f',
        },
        blueAccent: {
          100: '#8a95d5',
          200: '#6c7bcb',
          300: '#4f61c1',
          400: '#3146b6',
          500: '#007bff', //custom
          600: '#006cdf',
          700: '#005cbf',
          800: '#004d9f',
          900: '#003d80',
        },
      }
    : {
        grey: {
          100: '#141414',
          200: '#292929',
          300: '#3d3d3d',
          400: '#ECEFF1', // manually changed
          500: '#666666',
          600: '#858585',
          700: '#a3a3a3',
          800: '#c2c2c2',
          900: '#e0e0e0',
        },
        primary: {
          100: '#040509',
          200: '#080b12',
          300: '#0c101b',
          400: '#FFFFFF', // manually changed
          500: '#eee', //manually changed
          600: '#1F2A40',
          700: '#727681',
          800: '#a1a4ab',
          900: '#d0d1d5',
        },
        //my custom
        secondary: {
          100: '#8a95d5',
          200: '#6c7bcb',
          300: '#4f61c1',
          400: '#3146b6',
          500: '#007bff', //custom
          600: '#006cdf',
          700: '#005cbf',
          800: '#004d9f',
          900: '#003d80',
        },
        greenAccent: {
          100: '#0f2922',
          200: '#1e5245',
          300: '#2e7c67',
          400: '#3da58a',
          500: '#4cceac',
          600: '#70d8bd',
          700: '#94e2cd',
          800: '#b7ebde',
          900: '#dbf5ee',
        },
        redAccent: {
          100: '#2c100f',
          200: '#58201e',
          300: '#832f2c',
          400: '#af3f3b',
          500: '#db4f4a',
          600: '#e2726e',
          700: '#e99592',
          800: '#f1b9b7',
          900: '#f8dcdb',
        },
        blueAccent: {
          100: '#8a95d5',
          200: '#6c7bcb',
          300: '#4f61c1',
          400: '#3146b6',
          500: '#007bff', //custom
          600: '#006cdf',
          700: '#005cbf',
          800: '#004d9f',
          900: '#003d80',
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[400],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[400],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }),
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
