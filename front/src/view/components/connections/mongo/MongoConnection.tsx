import React, { useMemo } from "react";
import { useAppSelector } from "@store";
import { CollectionInfo, CollectionSizes, MongoConnectionData } from "@apis/backend/generated";
import { IconButton, Stack, SxProps, Tooltip, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AppAccordion } from "@components/utils/accordion/AppAccordion";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useModal } from "@hooks/useModal";
import { DeleteMongoConnection } from "@components/connections/mongo/DeleteMongoConnection";
import { AddMongoConnection } from "@components/connections/mongo/AddMongoConnection";

enum ColumnField {
	Name = "name",
	Count = "count",
	SizeTotal = "sizes/total",
	SizeDocuments = "sizes/documents",
	SizeIndexes = "sizes/indexes",
}

const rootSx: SxProps = {
	".MuiDataGrid-footerContainer.MuiDataGrid-withBorderColor": {
		display: "none",
	},
};

function renderSize(size: number) {
	return size.toFixed(3) + " Mo";
}

const datagridColumns: GridColDef[] = [
	{
		field: ColumnField.Name,
		headerName: "Name",
		minWidth: 200,
	},
	{
		field: ColumnField.Count,
		headerName: "Document Count",
		minWidth: 160,
	},
	{
		field: ColumnField.SizeTotal,
		headerName: "Total size",
		renderCell: (params) => {
			return renderSize(params.value);
		},
		minWidth: 160,
	},
	{
		field: ColumnField.SizeDocuments,
		headerName: "Document size",
		renderCell: (params) => {
			return renderSize(params.value);
		},
		minWidth: 160,
	},
	{
		field: ColumnField.SizeIndexes,
		headerName: "Indexes size",
		sortable: false,
		flex: 1,
		renderCell: (params) => {
			const v = params.value as CollectionSizes;
			return (
				<Stack minHeight={40} justifyContent={"center"}>
					{Object.entries(v).map(([name, size]) => (
						<Typography key={name}>
							{name}: {renderSize(size)}
						</Typography>
					))}
				</Stack>
			);
		},
	},
];

function getRow(data: CollectionInfo): {
	id: string;
} & Record<ColumnField, any> {
	return {
		id: data.name,
		name: data.name,
		count: data.documents,
		"sizes/documents": data.sizes.documentsSize,
		"sizes/indexes": data.sizes.indexesSize,
		"sizes/total": data.sizes.totalSize,
	};
}

export function MongoConnection() {
	const { detail, name, id } = useAppSelector((s) => {
		const state = s.router.location?.state as MongoConnectionData | undefined;
		if (!state) return {};
		return {
			detail: s.databases.mongo.details[state.id],
			id: state.id,
			name: state.name,
		};
	});

	const arrays = useMemo(() => {
		const databaseInfos = Object.values(detail ?? {});
		databaseInfos.sort((info1, info2) => info1.name.localeCompare(info2.name));
		return databaseInfos.map((info) => {
			const databaseSize = info.collections.reduce((acc, current) => acc + current.sizes.totalSize, 0);

			return (
				<AppAccordion.Frame key={info.name}>
					<AppAccordion.Summary>
						<Stack direction={"row"} width={"100%"} spacing={3}>
							<Typography>{info.name}</Typography>
							<Typography sx={{ opacity: 0.9 }}>{renderSize(databaseSize)}</Typography>
						</Stack>
					</AppAccordion.Summary>
					<AppAccordion.Details>
						<DataGrid getRowHeight={() => "auto"} pageSizeOptions={[100]} columns={datagridColumns} rows={info.collections.map(getRow)} />
					</AppAccordion.Details>
				</AppAccordion.Frame>
			);
		});
	}, [detail]);

	const deleteModal = useModal(false);
	const updateModal = useModal(false);

	if (!detail || !name || !id) return null;

	return (
		<Stack height={"100%"} className={"MongoConnection"} sx={rootSx}>
			<Stack direction={"row"} spacing={2} alignItems={"center"} width={"100%"}>
				<Typography fontSize={"100%"} variant={"overline"}>
					Connection :
				</Typography>
				<Typography color={"primary"} sx={{ opacity: 0.9 }} fontSize={"110%"}>
					Mongo/{name}
				</Typography>
				<Tooltip title={"Update the connection"}>
					<IconButton color={"warning"} onClick={updateModal.setOpen}>
						<Edit />
					</IconButton>
				</Tooltip>
				<Tooltip title={"Delete the connection"}>
					<IconButton color={"error"} onClick={deleteModal.setOpen}>
						<DeleteForever />
					</IconButton>
				</Tooltip>
			</Stack>

			<Stack maxHeight={"100%"} overflow={"auto"} my={2} spacing={1}>
				{arrays}
			</Stack>

			<DeleteMongoConnection setClose={deleteModal.setClose} open={deleteModal.open} />
			<AddMongoConnection open={updateModal.open} setClose={updateModal.setClose} update={id} />
		</Stack>
	);
}
