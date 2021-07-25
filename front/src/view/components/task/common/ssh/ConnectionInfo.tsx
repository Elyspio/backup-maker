import React from 'react';
import {ConnectionInfo as IConnectionInfo} from "../../../../../core/apis/backend";
import {Grid, TextField, Typography} from "@material-ui/core";
import {Services} from "../../../../../core/services";
import InputFile from "../../../utils/input-file/InputFile";


type ConnectionInfoProps = {
	data: IConnectionInfo,
	readonly?: boolean,
	onChange?: (val: IConnectionInfo) => void,
}

function ConnectionInfo({data, readonly, onChange}: ConnectionInfoProps) {

	const [host, setHost] = React.useState(data.host)
	const [port, setPort] = React.useState(data.port)
	const [password, setPassword] = React.useState(data.password)
	const [username, setUsername] = React.useState(data.username)
	const [privateKey, setPrivateKey] = React.useState(data.privateKey)


	React.useEffect(() => {
		if (!readonly && onChange) {
			onChange({host, port, password, username, privateKey})
		}
	}, [host, port, password, username, privateKey, readonly, onChange])


	const updateProperty = React.useCallback((key: keyof IConnectionInfo, event?: React.ChangeEvent<{ value: any }> | string) => {
		const setters = {
			host: setHost,
			port: setPort,
			password: setPassword,
			username: setUsername,
			privateKey: setPrivateKey
		}
		setters[key](typeof event === "string" ? event : event?.target.value);
	}, []);


	return (
		<Grid container direction={"row"} spacing={2}>
			<Grid item xs={12}>
				<TextField
					fullWidth
					label={"Host"}
					onChange={e => updateProperty("host", e)}
					value={host}
				/>
			</Grid>

			<Grid item xs={6}>
				<TextField
					label={"Username"}
					fullWidth
					error={Services.utility.string.isEmpty(username)}
					onChange={e => updateProperty("username", e)}
					value={username}
				/>
			</Grid>

			<Grid item xs={6}>
				<TextField
					label={"Port"}
					fullWidth
					error={Services.utility.string.isEmpty(port.toString())}
					onChange={e => updateProperty("port", e)}
					value={port}
				/>
			</Grid>

			<Grid container item direction={"row"}  alignItems={"center"} justifyContent={"space-evenly"} xs={12}>

				{readonly ?
					<Typography color={"textPrimary"}>
						{!Services.utility.string.isEmpty(password) && "Password Authentication"}
						{!Services.utility.string.isEmpty(privateKey) && "Private key Authentication"}
					</Typography>
					: <>
						<Grid item xs={6}>
							<TextField
								label={"Password"}
								fullWidth
								error={Services.utility.string.isEmpty(password) && Services.utility.string.isEmpty(privateKey)}
								onChange={e => updateProperty("password", e)}
								value={password}
							/>
						</Grid>

						<Grid item xs={6}>
							<InputFile
								error={Services.utility.string.isEmpty(password) && Services.utility.string.isEmpty(privateKey)}
								mode={"base64"}
								label={Services.utility.string.isEmpty(privateKey) ? "Select private key" : "Clear private key"}
								onSelect={(base64) => updateProperty("privateKey", base64)}/>
						</Grid>
					</>

				}


			</Grid>


		</Grid>
	);
}

export default ConnectionInfo;
