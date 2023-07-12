import React, { useCallback, useMemo } from "react";
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store";
import { IdConnection } from "@modules/databases/mongo/mongo.database.types";
import { usePropsState } from "@hooks/usePropsState";
import { JobBackup, JobData, JobDeploy } from "@apis/backend/generated";
import { DeployState } from "@modules/deploys/deploys.types";
import { TasksState } from "@modules/tasks/tasks.types";
import { manageJobs } from "@modules/jobs/jobs.async.actions";
import cronstrue from "cronstrue";
import { AddEntityProps } from "@components/entity/EntityManager";

const enumToField: {
	deploy: Record<JobDeploy, keyof DeployState>;
	backup: Record<JobBackup, keyof TasksState>;
} = {
	deploy: {
		[JobDeploy.Ftp]: "ftp",
		[JobDeploy.Local]: "local",
	},
	backup: {
		[JobBackup.Mongo]: "mongo",
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
	const [cronInterval, setCronInterval] = usePropsState(previousValue?.cronInterval ?? "* * * * *");
	const [deployType, setDeployType] = usePropsState(previousValue?.deployType ?? "Local");
	const [idDeploy, setIdDeploy] = usePropsState(previousValue?.idDeploy ?? null);
	const [backupType, setBackupType] = usePropsState(previousValue?.backupType ?? "Mongo");
	const [idBackup, setIdBackup] = usePropsState(previousValue?.idBackup ?? null);

	const updateStringField = useCallback(
		(prop: keyof Pick<JobData, "name" | "cronInterval">) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const setters: Record<typeof prop, React.Dispatch<React.SetStateAction<any>>> = {
				name: setName,
				cronInterval: setCronInterval,
			};

			setters[prop](e.target.value);
		},
		[setCronInterval, setName]
	);

	const updateAutoCompleteField = useCallback(
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

	const cronNextOccurence = useMemo(() => {
		try {
			return cronstrue.toString(cronInterval, { use24HourTimeFormat: true });
		} catch (e) {
			return null;
		}
	}, [cronInterval]);

	return (
		<Dialog open={open} onClose={setClose} maxWidth={"xs"} fullWidth>
			<DialogTitle align={"center"}>{update ? "Update" : "Create"} a job</DialogTitle>
			<DialogContent dividers>
				<Stack spacing={3} p={3}>
					<TextField onChange={updateStringField("name")} disabled={!!update} value={name} label={"Name"} />
					<Stack direction={"row"} spacing={2}>
						<Autocomplete
							fullWidth
							value={deployType}
							disableClearable={true}
							onChange={updateAutoCompleteField("deployType")}
							renderInput={(params) => <TextField color={"secondary"} {...params} label="Deployment type" />}
							options={Object.values(JobDeploy)}
						/>
						<Autocomplete
							fullWidth
							value={idDeploy ?? null}
							onChange={updateAutoCompleteField("idDeploy")}
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
							onChange={updateAutoCompleteField("backupType")}
							renderInput={(params) => <TextField color={"secondary"} {...params} label="Task type" />}
							options={Object.values(JobBackup)}
						/>

						<Autocomplete
							fullWidth
							value={idBackup ?? null}
							onChange={updateAutoCompleteField("idBackup")}
							getOptionLabel={(option) => tasksAvailable[option].name}
							renderInput={(params) => <TextField {...params} label="Task name" />}
							options={Object.keys(tasksAvailable)}
						/>
					</Stack>

					<Stack direction={"row"} spacing={2} alignItems={"center"}>
						<TextField
							label={"Cron expression"}
							value={cronInterval}
							onChange={updateStringField("cronInterval")}
							helperText={"minute | hour | day (month) | month | day (week) "}
						/>
						<Box pb={"22px"}>
							<Typography>{cronNextOccurence}</Typography>
						</Box>
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Stack direction={"row"} spacing={3}>
					<Button color={"primary"} variant={"outlined"} disabled={![name, idBackup, idDeploy].every(Boolean)} onClick={createNewLocalDeploy}>
						{update ? "Update" : "Add"}
					</Button>
					<Button color={"inherit"} variant={"outlined"} onClick={setClose}>
						Cancel
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
}
