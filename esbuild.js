const esbuild = require('esbuild');
const { clean } = require('esbuild-plugin-clean');
const copyPlugin = require('esbuild-plugin-copy').default;
const postCssPlugin = require('esbuild-style-plugin');

const watch = process.argv.includes('--watch');

const config = {
  entryPoints: ['src/index.tsx'],
  outfile: 'build/content-script.js',
  format: 'esm',
  bundle: true,
  sourcemap: true,
  plugins: [
    clean({ patterns: ['build/*'] }),
    copyPlugin({
      assets: {
        from: ['./src/manifest.json'],
        to: ['./'],
      },
    }),
    postCssPlugin({
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    }),
  ],
};

(async () => {
  esbuild.build(config);

  if (watch) {
    const context = await esbuild.context(config);
    await context.watch();
    console.log('Watching...');
  }
})();
