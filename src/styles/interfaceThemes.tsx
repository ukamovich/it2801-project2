const LightTheme : { [key: string]: any } = {
    pageBackground: "white",
    textColor: "#ec658c",
    tagLineColor: "darkgrey",
    fontStyle: "black",
}

const DarkTheme : { [key: string]: any } = {
    pageBackground: "#282f38",
    textColor: "lightpink",
    tagLineColor: "lightblue",
    fontStyle: "lightgrey",
}

export const themes : { [key: string]: any } = {
    light: LightTheme,
    dark: DarkTheme,
}


export default themes;