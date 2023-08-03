import joi from 'joi';

import { cookies } from 'next/headers';

import { apiHandler } from '_helpers/server/api';
import { usersRepo } from '_helpers/server';

module.exports = apiHandler({
  GET: getById,
});

async function getById(req: Request, { params: { id } }: any) {
  return await usersRepo.getById(id);
}
