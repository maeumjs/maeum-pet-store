import { selectById } from '#/databases/repository/v1/categories/selectById';
import { ApiError } from '@maeum/error-controller';
import type { II18nParameters } from '@maeum/i18n-controller';
import httpStatusCodes from 'http-status-codes';

export async function selectByIdOrThrow(
  data: Parameters<typeof selectById>[0],
  options?: Parameters<typeof selectById>[1],
) {
  const category = await selectById(data, options);

  if (category == null) {
    throw new ApiError({
      status: httpStatusCodes.NOT_FOUND,
      i18n: {
        phrase: 'categories.main.not-found-category',
        option: { id: data.id },
      } as II18nParameters,
    });
  }

  return category;
}
