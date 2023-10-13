import type { IPutPetBodyDto, IPutPetParamsDto, IPutPetQuerystringDto } from '#/dto/v1/pet/IPutPet';
import { update } from '#/repository/pet';
import { ApiErrorJsonSchema, ApiValidationErrorJsonSchema } from '@maeum/error-controller';
import type { FastifyRequest, RouteShorthandOptions } from 'fastify';

export const option: RouteShorthandOptions = {
  schema: {
    tags: ['Pet'],
    summary: 'Put Pet',
    operationId: 'put-pet',
    description: 'Put Pet',
    querystring: { $ref: 'IPutPetQuerystringDto' },
    params: { $ref: 'IPutPetParamsDto' },
    body: { $ref: 'IPutPetBodyDto' },
    response: {
      200: { $ref: 'IPetDto' },
      400: ApiValidationErrorJsonSchema,
      500: ApiErrorJsonSchema,
    },
  },
};

export default async function handler(
  req: FastifyRequest<{
    Querystring: IPutPetQuerystringDto;
    Params: IPutPetParamsDto;
    Body: IPutPetBodyDto;
  }>,
) {
  const pet = await update(req.query, req.params, req.body);
  return pet;
}
