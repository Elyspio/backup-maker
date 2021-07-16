import React from 'react';
import {ConnectOptions} from "../../../../../core/apis/backend";
import {Grid, TextField} from "@material-ui/core";


type ConnectionInfoProps = {
	data: ConnectOptions,
	readonly?: boolean,
	onChange?: (val: ConnectOptions) => void
}

function ConnectionInfo({data, readonly, onChange}: ConnectionInfoProps) {

	const [host, setHost] = React.useState(data.host)
	const [port, setPort] = React.useState(data.port)
	const [password, setPassword] = React.useState(data.password)
	const [username, setUsername] = React.useState(data.username)


	React.useEffect(() => {
		if (!readonly && onChange) {
			onChange({host, port, password, username})
		}
	}, [host, port, password, username, readonly, onChange])


	const updateProperty = React.useCallback((key: keyof ConnectOptions, event: React.ChangeEvent<{ value: any }>) => {
		const setters = {
			host: setHost,
			port: setPort,
			password: setPassword,
			username: setUsername
		}
		setters[key](event.target.value);
	}, []);

	return (
		<Grid container direction={"row"}>
			<Grid item>
				<TextField
					fullWidth
					label={"Host"}
					onChange={e => updateProperty("host", e)}
					value={host}
				/>
			</Grid>

			<Grid item>
				<TextField
					label={"Port"}
					fullWidth
					onChange={e => updateProperty("port", e)}
					value={port}
				/>
			</Grid>

			<Grid item>
				<TextField
					label={"Username"}
					fullWidth
					onChange={e => updateProperty("username", e)}
					value={username}
				/>
			</Grid>

			<Grid item>
				<TextField
					label={"Password"}
					fullWidth
					onChange={e => updateProperty("password", e)}
					value={password}
				/>
			</Grid>
		</Grid>
	);
}

export default ConnectionInfo;
