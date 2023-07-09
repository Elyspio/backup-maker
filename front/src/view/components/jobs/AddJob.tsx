import React, { useCallback, useMemo } from "react";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store";
import { IdConnection } from "@modules/databases/mongo/mongo.database.types";
import { usePropsState } from "@hooks/usePropsState";
import { Backup, Deploy, JobData } from "@apis/backend/generated";
import { DeployState } from "@modules/deploys/deploys.types";
import { TasksState } from "@modules/tasks/tasks.types";
import { manageJobs } from "@modules/jobs/jobs.async.actions";

export interface AddEntityProps<T> {
	open: boolean;
	setClose: () => void;
	update?: T;
}

const enumToField: {
	deploy: Record<Deploy, keyof DeployState>;
	backup: Record<Backup, keyof TasksState>;
} = {
	deploy: {
		[Deploy.Local]: "locals",
	},
	backup: {
		[Backup.Mongo]: "mongo",
	},
};

export function AddJob({ open, setClose, update }: AddEntityProps<IdConnection>) {
	const { previousValue, deploys, tasks } = useAppSelector((s) => ({
		previousValue: s.jobs.data[update!],
		tasks: s.tasks,
		deploys: s.deploys,
	}));

	const dispatch = useAppDispatch();

	const [name, setName] = usePropsState(previousValue?.name ?? "");
	const [cronInterval, setCronInterval] = usePropsState(previousValue?.cronInterval ?? "");
	const [deployType, setDeployType] = usePropsState(previousValue?.deployType ?? "Local");
	const [idDeploy, setIdDeploy] = usePropsState(previousValue?.idDeploy ?? null);
	const [backupType, setBackupType] = usePropsState(previousValue?.backupType ?? "Mongo");
	const [idBackup, setIdBackup] = usePropsState(previousValue?.idBackup ?? null);

	const updateName = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setName(e.target.value);
		},
		[setName]
	);

	const updateField = useCallback(
		(type: keyof Omit<JobData, "id" | "name" | "cronInterval">) => (_: React.SyntheticEvent, val: any | null) => {
			const setters: Record<typeof type, React.Dispatch<React.SetStateAction<any>>> = {
				backupType: setBackupType,
				deployType: setDeployType,
				idBackup: setIdBackup,
				idDeploy: setIdDeploy,
			};
			setters[type](val);
		},
		[setBackupType, setDeployType, setIdBackup, setIdDeploy]
	);

	const createNewLocalDeploy = useCallback(() => {
		const action = !update
			? manageJobs.add({
					name,
					idDeploy,
					idBackup,
					backupType,
					deployType,
					cronInterval,
			  })
			: manageJobs.update({
					id: update,
					name,
					idDeploy,
					idBackup,
					backupType,
					deployType,
					cronInterval,
			  });

		dispatch(action);
		setClose();
	}, [update, name, idDeploy, idBackup, backupType, deployType, cronInterval, dispatch, setClose]);

	const deploymentsAvailable = useMemo(() => deploys[enumToField.deploy[deployType]], [deploys, deployType]);
	const tasksAvailable = useMemo(() => tasks[enumToField.backup[backupType]], [tasks, backupType]);

	return (
		<Dialog open={open} onClose={setClose} maxWidth={"xs"} fullWidth>
			<DialogTitle>{update ? "Update" : "Create"} a job</DialogTitle>
			<DialogContent dividers>
				<Stack spacing={3} p={3}>
					<TextField onChange={updateName} disabled={!!update} value={name} label={"Name"} />
					<Stack direction={"row"} spacing={2}>
						<Autocomplete
							fullWidth
							value={deployType}
							disableClearable={true}
							onChange={updateField("deployType")}
							renderInput={(params) => <TextField color={"secondary"} {...params} label="Deployment type" />}
							options={Object.values(Deploy)}
						/>
						<Autocomplete
							fullWidth
							value={idDeploy ?? null}
							onChange={updateField("idDeploy")}
							getOptionLabel={(option) => deploymentsAvailable[option].name}
							renderInput={(params) => <TextField {...params} label="Deployement name" />}
							options={Object.keys(deploymentsAvailable)}
						/>
					</Stack>

					<Stack direction={"row"} spacing={2}>
						<Autocomplete
							fullWidth
							value={backupType}
							disableClearable={true}
							onChange={updateField("backupType")}
							renderInput={(params) => <TextField color={"secondary"} {...params} label="Task type" />}
							options={Object.values(Backup)}
						/>

						<Autocomplete
							fullWidth
							value={idBackup ?? null}
							onChange={updateField("idBackup")}
							getOptionLabel={(option) => tasksAvailable[option].name}
							renderInput={(params) => <TextField {...params} label="Task name" />}
							options={Object.keys(tasksAvailable)}
						/>
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Stack direction={"row"} spacing={3}>
					<Button color={"primary"} variant={"outlined"} disabled={![name, idBackup, idDeploy].every(Boolean)} onClick={createNewLocalDeploy}>
						Add
					</Button>
					<Button color={"inherit"} variant={"outlined"} onClick={setClose}>
						Cancel
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
}
