import {Log} from "../utils/decorators/logger";
import {getLogger} from "../utils/logger";
import {Service} from "@tsed/common";

@Service()
export class AuthenticationService {

	private static log = getLogger.service(AuthenticationService)

	@Log(AuthenticationService.log)
	public async isAuthenticated(token: string) {
		return true;
	}

}
