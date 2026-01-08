import { injectCssPlugin } from "@bosh-code/tsdown-plugin-inject-css";
import { defineConfig } from "tsdown";

export default defineConfig([
	{
		entry: ["./src/index.ts"],
		dts: true,
		clean: true,
		plugins: [injectCssPlugin()],
		loader: { ".css": "css" },
	},
	{
		entry: ["./src/themes/index.ts"],
		outDir: "./dist/themes",
		dts: true,
		clean: true,
		plugins: [injectCssPlugin()],
		loader: { ".css": "css" },
	},
]);
