import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { themeReducer } from "@modules/theme/theme.reducer";
import { authenticationReducer } from "@modules/authentication/authentication.reducer";
import { container } from "@/core/di";
import { mongoDatabaseReducer } from "@modules/databases/mongo/mongo.database.reducer";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";
import { deploysReducer } from "@modules/deploys/deploys.reducer";
import { tasksReducer } from "@modules/tasks/tasks.reducer";
import { jobsReducer } from "@modules/jobs/jobs.reducer";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ history: createBrowserHistory() });

const store = configureStore({
	reducer: {
		theme: themeReducer,
		authentication: authenticationReducer,
		router: routerReducer,
		["databases/mongo"]: mongoDatabaseReducer,
		deploys: deploysReducer,
		tasks: tasksReducer,
		jobs: jobsReducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: { container } as ExtraArgument } }).prepend(routerMiddleware),
});

export type RealStoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ExtraArgument = {
	container: typeof container;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type StoreState = Omit<RealStoreState, "databases/mongo"> & {
	databases: {
		mongo: RealStoreState["databases/mongo"];
	};
};

export const useAppSelector = <T>(selector: (state: StoreState) => T) => {
	const state = useSelector((state) => state) as RealStoreState;
	return selector({
		theme: state.theme,
		router: state.router,
		authentication: state.authentication,
		databases: {
			mongo: state["databases/mongo"],
		},
		deploys: state.deploys,
		tasks: state.tasks,
		jobs: state.jobs,
	});
};

export const history = createReduxHistory(store);

export default store;
