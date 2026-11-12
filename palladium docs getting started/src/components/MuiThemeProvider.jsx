import React, {useMemo} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {createTheme, ThemeProvider} from '@mui/material';

export default function MuiThemeProvider({children}) {
    const {colorMode} = useColorMode();
    const theme = useMemo(() => createTheme({
        palette: {
            mode: colorMode,
        },
        typography: {
            fontFamily: 'inherit',
        },
    }), [colorMode]);

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
