import { getPetStoreMysql } from '#/databases/data-sources/getPetStoreMysql';
import { CE_DI } from '#/modules/di/CE_DI';
import { container } from '#/modules/di/container';

export async function makePetDataSoruce() {
  const petStore = getPetStoreMysql();
  await petStore.initialize();
  container.register(CE_DI.PET_DATA_SOURCE, petStore);
}
