import { defineConfig } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import path from "path";
import electron from "vite-plugin-electron";
import electronRenderer from "vite-plugin-electron-renderer";

import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

function resolve(str){
	return path.resolve(__dirname, str)
}

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
		  "@": resolve("./src"),
		  'utils': resolve("./src/utils"),
		  'components': resolve("./src/components"),
		  'types': resolve("./src/types"),
		  'assets': resolve('./src/assets')
		},
		extensions: ['.js', '.jsx', '.json', '.vue', '.scss', '.css'],
	},
	plugins: [
		vue(),
		AutoImport({
			imports: ['vue'],
			vueTemplate: true,
			resolvers: [ElementPlusResolver(), IconsResolver({ prefix: 'Icon' })],
		}),
		Components({
			resolvers: [IconsResolver({ enabledCollections: ['ep'] }), ElementPlusResolver()],
		}),
		Icons({ autoInstall: true }),
		electron([
			{
				entry: "./src/electron/main/index.ts",
				onstart(options) {
					options.startup();
				},
				vite: {
					build: {
						outDir: "./dist/electron/main",
					},
				},
			},
			{
				entry: "./src/electron/preload/index.ts",
				onstart(options) {
					options.reload();
				},
				vite: {
					build: {
						outDir: "./dist/electron/preload",
					},
				},

			}
		]),
		electronRenderer(),
		Inspect()
	]
})