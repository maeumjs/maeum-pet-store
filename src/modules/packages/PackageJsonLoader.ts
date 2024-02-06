import { parse } from 'jsonc-parser';
import fs from 'node:fs';
import path from 'node:path';
import type { PackageJson } from 'type-fest';

export class PackageJsonLoader {
  static #it: PackageJsonLoader;

  static get it(): Readonly<PackageJsonLoader> {
    return this.#it;
  }

  static #isBootstrap: boolean = false;

  static get isBootstrap(): Readonly<boolean> {
    return this.#isBootstrap;
  }

  static bootstrap() {
    if (PackageJsonLoader.#isBootstrap) {
      return;
    }

    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const buf = fs.readFileSync(packageJsonPath);
    const json = parse(buf.toString()) as PackageJson;

    PackageJsonLoader.#it = new PackageJsonLoader(json);
    PackageJsonLoader.#isBootstrap = true;
  }

  #packages: PackageJson;

  constructor(packages: PackageJson) {
    this.#packages = packages;
  }

  get packages(): PackageJson {
    return this.#packages;
  }
}
