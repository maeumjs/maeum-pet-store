import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';
import { parse } from 'jsonc-parser';
import fs from 'node:fs';
import path from 'node:path';
import type { PackageJson as PackageJsonType } from 'type-fest';

export function makePackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const buf = fs.readFileSync(packageJsonPath);
  const json = parse(buf.toString()) as PackageJsonType;

  container.register(CE_DI.PACKAGE_JSON, json);
}
