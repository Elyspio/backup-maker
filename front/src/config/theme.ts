import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import * as colors from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import darkScrollbar from "@mui/material/darkScrollbar";

const scrollbarTheme = (mode: Themes) => ({
	...darkScrollbar(
		mode === "light"
			? {
					track: grey[200],
					thumb: grey[400],
					active: grey[400],
			  }
			: undefined
	),
	//scrollbarWidth for Firefox
	scrollbarWidth: "thin",
});

const getComponents = (mode: Themes): ThemeOptions["components"] => ({
	MuiPaper: {
		styleOverrides: {
			root: {
				"&.MuiPaper-root": {
					backgroundImage: "unset !important",
				},
			},
		},
	},
	MuiTextField: {
		defaultProps: {
			variant: "standard",
		},
	},
	MuiCssBaseline: {
		styleOverrides: {
			html: {
				...scrollbarTheme(mode),
			},
		},
	},
});

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		secondary: {
			...colors.grey,
			main: colors.lightGreen["200"],
		},
		primary: {
			...colors.blue,
			main: colors.blue["200"],
		},
		background: {
			paper: "#1d1d1d",
			default: "#181818",
		},
	},
	components: getComponents("dark"),
});

const lightTheme = createTheme({
	palette: {
		mode: "light",
		secondary: {
			...colors.blueGrey,
			main: colors.blueGrey["900"],
		},
		primary: {
			...colors.blue,
			main: colors.blue["400"],
		},
		background: {
			paper: "#ffffff",
			default: "#e6e6e6",
		},
	},
	components: getComponents("light"),
});

export const themes = {
	dark: darkTheme,
	light: lightTheme,
};

export type Themes = "dark" | "light";
export const getUrlTheme = (): Themes => new URL(window.location.toString()).searchParams.get("theme") || ("dark" as any);

export const getCurrentTheme = (theme: Themes): Theme => themes[theme];
