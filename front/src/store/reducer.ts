import {themeReducer} from "./module/theme/theme.reducer";
import {taskReducer} from "./module/task/task.reducer";


export const rootReducer = {
	theme: themeReducer,
	task: taskReducer
};
