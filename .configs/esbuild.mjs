import * as esbuild from 'esbuild';
import readPkg from 'read-pkg';

const pkg = readPkg.sync();

if (process.env.FORMAT !== 'cjs' && process.env.FORMAT !== 'esm') {
  console.log(`support "cjs" or "esm"`);
  console.log(`eg. FORMAT=cjs node esbuild.mjs`);

  process.exit(1);
}

console.log('esbuild start bundling');
console.log(`version: ${pkg.version}`);
console.log(`FORMAT: ${process.env.FORMAT}`);
console.log(`MINIFY: ${process.env.FORMAT}`);

await esbuild.build({
  entryPoints: ['src/listen.ts', 'src/loader.ts'],
  target: 'es2021',
  bundle: true,
  sourcemap: true,
  platform: 'node',
  minify: process.env.MINIFY === 'true',
  outdir: 'dist',
  format: process.env.FORMAT,
  external: Object.keys(pkg.dependencies),
});
