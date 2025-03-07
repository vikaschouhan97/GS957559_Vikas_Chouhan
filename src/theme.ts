import { createTheme } from '@mui/material/styles';

const commonTypography = {
    fontFamily: '"Poppins", sans-serif',
};

// Light Theme
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3087ec', // Primary color for light theme
        },
        secondary: {
            main: '#f50057', // Secondary color for light theme
        },
        background: {
            default: '#d0d0d0', // Default background color for light theme
            paper: '#f5f5f5', // Paper background color for light theme
        },
        text: {
            primary: '#333333', // Primary text color for light theme
            secondary: '#666666', // Secondary text color for light theme
        },
        error: {
            main: '#f44336', // Error color for light theme
        },
        warning: {
            main: '#ff9800', // Warning color for light theme
        },
        info: {
            main: '#2196f3', // Info color for light theme
        },
        success: {
            main: '#4caf50', // Success color for light theme
        },
    },
    typography: {
        ...commonTypography,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.2rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
        },
        caption: {
            fontSize: '0.9rem',
            fontWeight: 400,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize', // Apply text capitalization to all Button components
                },
            },
        },
    },
});

// Dark Theme
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2', // Primary color for dark theme
        },
        secondary: {
            main: '#d32f2f', // Secondary color for dark theme
        },
        background: {
            default: '#121212', // Default background color for dark theme
            paper: '#1e1e1e', // Paper background color for dark theme
        },
        text: {
            primary: '#ffffff', // Primary text color for dark theme
            secondary: '#cccccc', // Secondary text color for dark theme
        },
        error: {
            main: '#f44336', // Error color for dark theme
        },
        warning: {
            main: '#ff9800', // Warning color for dark theme
        },
        info: {
            main: '#2196f3', // Info color for dark theme
        },
        success: {
            main: '#4caf50', // Success color for dark theme
        },
    },
    typography: {
        ...commonTypography,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.2rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
        },
        caption: {
            fontSize: '0.9rem',
            fontWeight: 400,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize', // Apply text capitalization to all Button components
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    '& .MuiPaper-elevation': {
                        // Add your styles here for paper with elevation...
                        background: "black",
                        // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                        boxShadow: 'rgba(0, 0, 255, 0.2) 0px 7px 29px 0px',
                        // border: "1px solid #3087ec"
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF', // Set background color to white
                },
            },
        },
    },
});

export { lightTheme, darkTheme };
