import { fileURLToPath } from 'node:url';
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const runbookLayout = fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url));

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for our own .svelte files; mdsvex's generated layout
				// wrapper for .svx pages still emits legacy `$$props`, so leave those on
				// auto-detect. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.endsWith('.svelte') && !filename.split(/[/\\]/).includes('node_modules')
						? true
						: undefined
			},
			adapter: adapter(),
			preprocess: [
				mdsvex({
					extensions: ['.svx', '.md'],
					layout: { runbook: runbookLayout }
				})
			],
			extensions: ['.svelte', '.svx', '.md']
		})
	]
});
