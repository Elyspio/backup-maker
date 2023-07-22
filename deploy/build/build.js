const {spawnSync} = require("child_process");
const path = require("path");

const dockerCommand = `docker buildx bake -f docker-bake.hcl --push`
	.split(" ")
	.filter((str) => str.length);

const ret = spawnSync(dockerCommand[0], dockerCommand.slice(1), {
	cwd: __dirname,
	stdio: "inherit",
});

if (ret.status === 0) {
	spawnSync(
		"ssh",
		[
			"elyspio@192.168.0.59",
			"cd /apps/own/backup-maker && docker-compose pull && docker-compose up -d --remove-orphans",
		],
		{
			cwd: __dirname,
			stdio: "inherit",
		}
	);
}
