import { execSync } from "child_process";
import { Client } from "ssh2";
import sshConfig from "../config/ssh.json";
import * as path from "path";
import * as fs from "fs";

class App {

    public static async main() {
        // App.sftpClient = new Client();
        // await App.sftpClient.connect({
        //     ...sshConfig
        // });
        // console.log("OK");

        this.zip("/media/elyspio/projects/desktop/cross-platform", "backup");

    }

    private static sftpClient: Client;

    private static async upload(filepath: string) {}

    private static zip(folder: string = ".", filename: string) {
        const date = new Date();


        let filepath = `${filename}-${date.getDay()}-${date.getMonth()}-${date.getFullYear()}.zip`;
        filepath = path.join(process.cwd(), filepath);
        const cmd: string = `zip -r ${filepath} ${folder}`;
        const str = execSync(cmd).toString();
        return filepath;
    }
}

App.main();
