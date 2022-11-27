import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svgr(), react()],
	base: "./",
	resolve: {
		alias: {
			assets: path.resolve(__dirname, "src/assets"),
			components: path.resolve(__dirname, "src/components"),
		},
	},
});
