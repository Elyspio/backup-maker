import "reflect-metadata";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import store, { history, useAppSelector } from "./store";
import { Frame } from "@components/Frame";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { themes } from "./config/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Provider as DiProvider } from "inversify-react";
import { container } from "./core/di";
import { HistoryRouter } from "redux-first-history/rr6";
import { CssBaseline } from "@mui/material";

function Wrapper() {
	const { theme, current } = useAppSelector((state) => ({
		theme: state.theme.current === "dark" ? themes.dark : themes.light,
		current: state.theme.current,
	}));

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<Frame />
				<CssBaseline />
				<ToastContainer theme={current} position={"top-right"} />
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

function App() {
	return (
		<DiProvider container={container}>
			<HistoryRouter history={history} basename={"/backup"}>
				<Provider store={store}>
					<Wrapper />
				</Provider>
			</HistoryRouter>
		</DiProvider>
	);
}

createRoot(document.getElementById("root")!).render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
