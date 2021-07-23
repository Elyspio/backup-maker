import React, {useRef} from 'react';
import {Grid} from "@material-ui/core";
import {Services} from "../../../../core/services";
import {Button} from "../button/Button";


interface InputFileProps {
	mode: "base64",
	error?: boolean,
	onSelect: (base64?: string) => void,
	label: string
}


function InputFile({onSelect, mode, error, label}: InputFileProps) {

	const ref = useRef<HTMLInputElement>(null);
	const [selected, setSelected] = React.useState(false);
	const openDialog = React.useCallback(() => {
		if (selected) {
			onSelect(undefined)
			setSelected(false);
			return;
		}
		ref.current?.click();


	}, [selected, ref, onSelect])

	const onFileChange = React.useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {


		const file = [...e.target.files ?? []][0];
		if (mode === "base64") {
			onSelect(file ? await Services.file.toBase64(file) : undefined)
		}

		setSelected(!!file)


	}, [mode, onSelect])

	return (
		<Grid container justify={"center"} alignItems={"center"}>
			<Grid item>
				<input type="file" hidden ref={ref} onChange={onFileChange}/>
			</Grid>
			<Grid item>
				<Button color={error ? "error" : "secondary"} variant={selected ? "outlined" : "outlined"} onClick={openDialog}>{label}</Button>
			</Grid>
		</Grid>
	);
}

export default InputFile;
