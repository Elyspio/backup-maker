import { BackupMakerRole } from "@apis/authentication/generated";
import { useAppSelector } from "@store";

export function usePermissions(role: BackupMakerRole) {
	const user = useAppSelector((s) => s.authentication.user);

	return user?.authorizations.backupMaker?.roles.includes(role) === true;
}
