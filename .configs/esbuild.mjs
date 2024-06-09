import * as esbuild from 'esbuild';
import readPkg from 'read-pkg';
import builtinModules from 'builtin-modules';

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
  entryPoints: ['src/**/*.ts'],
  target: 'es2022',
  bundle: true,
  sourcemap: true,
  platform: 'node',
  minify: process.env.MINIFY === 'true',
  outdir: 'dist',
  format: process.env.FORMAT,
  external: Object.keys(pkg.dependencies),
  
  plugins: [
    {
      // from: https://github.com/evanw/esbuild/issues/622#issuecomment-769462611
      name: 'add-ext',
      setup(build) {
        build.onResolve({ filter: /.*/ }, args => {
          // console.log('onResolve', pkg.dependencies[args.path], args.path, builtinModules.includes(args.path.replace('node:', '')));
          if (
            pkg.dependencies[args.path] == null && 
            args.importer != null && 
            !builtinModules.includes(args.path.replace('node:', ''))
          ) {
            return { path: `${args.path}.js`, external: true };
          } else if (args.importer != null) {
            return { path: args.path, external: true };
          }
        })
      },
    }
  ],
});
