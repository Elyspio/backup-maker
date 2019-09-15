import {exec} from "child_process";
import {unlink} from "fs";
import {platform} from "os";
import * as path from "path";
import Client from "ssh2-sftp-client";
import {promisify} from "util";
import sshConfig from "../config/ssh.json";

const promises = {
    exec: promisify(exec),
    unlink: promisify(unlink)
};

interface IZipOption {
    outputPath?: string;
    inputPath?: string;
}

function joinOnNas(...str: string[]) {
    return path.join(...str).replace(/\\/g, "/");
}

class App {

    private static NAS_BACKUP_PATH: string = "/homes/jojo/backups";
    private sftpClient: Client;

    private static async zip(
        folder: string = ".",
        filename: string,
        options?: IZipOption
    ): Promise<{ path: string; name: string }> {

        // filename = `${filename}_${date.getHours()}h_${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}.zip`;
        filename = `${filename}-${Date.now()}.zip`;
        let filepath = filename;
        if (options && options.outputPath) {
            filepath = path.join(options.outputPath, filename);
        }

        const cmd: string = `jar -cMf ${filepath} ${folder}`;
        const str = await promises.exec(cmd);
        return {
            name: filename,
            path: filepath
        };
    }

    public async main() {

        const projectsRoot = (platform() === "win32" ? "P:/" : "/media/elyspio/projects/");
        const {path: filepath, name} = await App.zip(path.join(projectsRoot, "desktop/cross-platform"), "project");
        await this.upload(name, null, null, path.join(App.NAS_BACKUP_PATH, "projects"));
        await promises.unlink(filepath);
    }

    public async close() {
        await this.sftpClient.end();
    }

    private async upload(
        filename: string,
        filepath?: string,
        remoteFile?: string,
        remotePath?: string
    ) {

        if (filepath == null) {
            filepath = filename;
        }

        if (this.sftpClient === undefined) {
            this.sftpClient = new Client();
            await this.sftpClient.connect({
                ...sshConfig,
            });
        }

        let output;
        remotePath = remotePath === null ? App.NAS_BACKUP_PATH : remotePath;

        if (remoteFile) {
            output = await this.sftpClient.put(filepath, joinOnNas(remotePath, remoteFile));

        } else {
            output = await this.sftpClient.fastPut(filepath, joinOnNas(remotePath, filename));
        }

    }
}

(async () => {
    const app = new App();
    await app.main();
    await app.close();
})();
