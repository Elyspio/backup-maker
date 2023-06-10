import { getDefaultConfig } from "@elyspio/vite-eslint-config/vite/vite.config";
import { defineConfig } from "vite";

const config = getDefaultConfig({ basePath: __dirname });

export default defineConfig({
	...config,
	base: "/backup",
	build: { ...config.build, outDir: "build" },
});
