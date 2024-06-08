import { getAsyncStore } from '#/modules/logging/store/getAsyncStore';
import { ApiError } from '@maeum/error-controller';
import type { II18nParameters } from '@maeum/i18n-controller';
import httpStatusCodes from 'http-status-codes';

export function getAsyncStoreOrThrow() {
  const store = getAsyncStore();

  if (store == null) {
    throw new ApiError({
      status: httpStatusCodes.NOT_FOUND,
      i18n: {
        phrase: 'common.main.not-found-store',
      } as II18nParameters,
    });
  }

  return store;
}
