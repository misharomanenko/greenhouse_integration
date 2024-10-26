import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderColor: '#F8F8F8',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          borderColor: '#F8F8F8',
          backgroundColor: '#ffffff',
          '&:hover': {
            borderColor: '#F8F8F8',
          },
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#004AA1',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#000',
      secondary: '#F8F8F8',
    },
    divider: '#e4e4e4',
  },
  typography: {
    fontFamily: 'SuisseIntl',
    fontSize: 12,
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  shadows: Array(25).fill(
    '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)'
  ),
});
