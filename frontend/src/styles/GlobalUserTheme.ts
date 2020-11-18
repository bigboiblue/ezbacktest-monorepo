import React from "react";

/** Not currently used or working */
const theme = {
    palette: {
        primary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff7961",
            main: "#f44336",
            dark: "#ba000d",
            contrastText: "#000",
        },
    },
    navbar: {
        height: "6rem",
    },
};

export type ThemeType = typeof theme;
export const ThemeContext = React.createContext(theme);

