import { ThemeOptions, createTheme } from '@mui/material/styles';
import { DC_site_colors } from './DC_site_colors';

const customTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: DC_site_colors.dailyCalBlue,
    },
    secondary: {
      main: DC_site_colors.dailyCalBlack,
    },
    background: {
      default: '#FDFBF8',
    },
  },
};

export const DC_site_theme = createTheme(customTheme);