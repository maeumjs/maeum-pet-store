import type { IClassContainer } from '@maeum/tools';
import { asValue, createContainer } from 'awilix';

const $container = createContainer();

export const container: IClassContainer = {
  resolve<K>(name: string | symbol): K {
    return $container.resolve<K>(name);
  },

  register<T>(name: string | symbol, registration: T): IClassContainer {
    $container.register(name, asValue(registration));
    return container;
  },
};
