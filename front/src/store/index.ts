import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { themeReducer } from "@modules/theme/theme.reducer";
import { authenticationReducer } from "@modules/authentication/authentication.reducer";
import { container } from "@/core/di";
import { mongoDatabaseReducer } from "@modules/mongo/mongo.database.reducer";

const store = configureStore({
	reducer: {
		theme: themeReducer,
		authentication: authenticationReducer,
		["databases/mongo"]: mongoDatabaseReducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: { container } as ExtraArgument } }),
});

export type RealStoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ExtraArgument = { container: typeof container };

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type StoreState = {
	theme: RealStoreState["theme"];
	authentication: RealStoreState["authentication"];
	databases: {
		mongo: RealStoreState["databases/mongo"];
	};
};

export const useAppSelector = <T>(selector: (state: StoreState) => T) => {
	const state = useSelector((state) => state) as RealStoreState;
	return selector({
		theme: state.theme,
		authentication: state.authentication,
		databases: {
			mongo: state["databases/mongo"],
		},
	});
};

export default store;
