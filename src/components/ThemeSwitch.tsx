import React, { useState, useEffect } from 'react';
import { ThemeProvider } from "styled-components";
import themes from './../styles/interfaceThemes';
import { Wrapper } from '../styles/Wrapper';
import App from './App';

function ThemeSwitch() {

    const [theme, setTheme] = useState("light")

    useEffect(() => {
        let i = localStorage.getItem("theme")
    
        if (i !== null) {
          setTheme(i)
        }
      }, [theme]
    )
    
    return (
        <ThemeProvider theme={themes[theme]}>
            <Wrapper>
                <App theme={theme} setTheme={setTheme} />
            </Wrapper>
        </ThemeProvider>
    );
}

export default ThemeSwitch