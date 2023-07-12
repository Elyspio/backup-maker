import { BackupMakerRole } from "@apis/authentication/generated";
import { useAppSelector } from "@store";

export function usePermissions(role: BackupMakerRole | keyof typeof BackupMakerRole) {
	const user = useAppSelector((s) => s.authentication.user);

	return user?.authorizations.backupMaker?.roles.includes(role as BackupMakerRole) === true;
}
