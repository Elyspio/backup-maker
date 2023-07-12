import React, { useMemo } from "react";
import { useAppSelector } from "@store";
import { CollectionInfo, CollectionSizes } from "@apis/backend/generated";
import { Stack, SxProps, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AppAccordion } from "@components/utils/accordion/AppAccordion";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useModal } from "@hooks/useModal";
import { DeleteEntity } from "@components/entity/DeleteEntity";
import { AddMongoConnection } from "@components/connections/mongo/AddMongoConnection";
import { useParams } from "react-router";
import { manageMongoConnections } from "@modules/databases/mongo/mongo.database.async.actions";
import { UnableToFindEntity } from "@components/entity/UnableToFindEntity";
import { IconWithTooltip } from "@components/utils/tooltip/IconWithTooltip";
import { usePermissions } from "@hooks/usePermissions";
import { BackupMakerRole } from "@apis/authentication/generated";
import { slugifyRoute } from "@/config/routes";

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
	const { details, connections } = useAppSelector((s) => {
		return {
			details: s.databases.mongo.details,
			connections: s.databases.mongo.connections,
		};
	});

	const { slug } = useParams<{
		slug: string;
	}>();

	const connection = useMemo(() => Object.values(connections).find((con) => slugifyRoute(con.name) === slug), [connections, slug]);

	const detail = useMemo(() => (connection ? details[connection?.id] : null), [details, connection]);

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

	const isAdmin = usePermissions(BackupMakerRole.Admin);

	if (!connection) return <UnableToFindEntity description={"MongoDB connection"} name={slug!} />;

	return (
		<Stack height={"100%"} className={"MongoConnection"} sx={rootSx}>
			<Stack direction={"row"} spacing={2} alignItems={"center"} width={"100%"}>
				<Typography fontSize={"100%"} variant={"overline"}>
					Connection :
				</Typography>
				<Typography color={"primary"} sx={{ opacity: 0.9 }} fontSize={"110%"}>
					Mongo/{connection.name}
				</Typography>

				<IconWithTooltip disabled={!isAdmin} title={"Update the connection"} disabledTitle={"You must be an admin"} onClick={updateModal.setOpen} color={"warning"}>
					<Edit />
				</IconWithTooltip>
				<IconWithTooltip disabled={!isAdmin} title={"Delete the connection"} disabledTitle={"You must be an admin"} onClick={deleteModal.setOpen} color={"error"}>
					<DeleteForever />
				</IconWithTooltip>
			</Stack>

			{detail && (
				<Stack maxHeight={"100%"} overflow={"auto"} my={2} spacing={1}>
					{arrays}
				</Stack>
			)}
			{connection.error && (
				<Stack p={2} maxHeight={"100%"} overflow={"auto"} my={2} bgcolor={"background.default"}>
					{connection.error.split("\n\r").map((line) => (
						<Typography whiteSpace={"pre-wrap"}>{line}</Typography>
					))}
				</Stack>
			)}

			{connection && (
				<>
					<DeleteEntity
						setClose={deleteModal.setClose}
						open={deleteModal.open}
						title={"Delete mongo connection"}
						deleteFn={manageMongoConnections.delete}
						entity={connection}
						description={"mongo connection"}
					/>
					<AddMongoConnection open={updateModal.open} setClose={updateModal.setClose} update={connection.id} />
				</>
			)}
		</Stack>
	);
}
