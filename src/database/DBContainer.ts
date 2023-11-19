import { CE_DATASORUCE_NAME } from '#/database/const-enum/CE_DATASORUCE_NAME';
import { getPetStoreMysql } from '#/database/data-sources/getPetStoreMysql';
import type { DataSource } from 'typeorm';

export class DBContainer {
  static #it: DBContainer;

  static get it(): Readonly<DBContainer> {
    return this.#it;
  }

  static #isBootstrap: boolean = false;

  static get isBootstrap(): Readonly<boolean> {
    return this.#isBootstrap;
  }

  static async bootstrap() {
    const petStore = getPetStoreMysql();
    await petStore.initialize();

    DBContainer.#it = new DBContainer(
      new Map<CE_DATASORUCE_NAME, DataSource>([[CE_DATASORUCE_NAME.PET_STORE, petStore]]),
    );
    DBContainer.#isBootstrap = true;
  }

  #dses: Map<CE_DATASORUCE_NAME, DataSource>;

  constructor(ds: Map<CE_DATASORUCE_NAME, DataSource>) {
    this.#dses = ds;
  }

  get dses(): Readonly<Map<CE_DATASORUCE_NAME, DataSource>> {
    return this.#dses;
  }

  ds(name: CE_DATASORUCE_NAME): DataSource {
    const dataSource = this.#dses.get(name);

    if (dataSource == null) {
      throw new Error(`Cannot found data-source: ${name}`);
    }

    return dataSource;
  }
}
