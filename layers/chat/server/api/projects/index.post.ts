import type { H3Event } from 'h3';
import { createProject } from '#layers/chat/server/repository/projectRepository';
import { CreateProjectSchema } from '#layers/chat/server/schemas';
import { getAuthenticatedUserId } from '~~/layers/auth/server/utils/auth';

export default defineEventHandler(async (event: H3Event) => {
  const userId = await getAuthenticatedUserId(event);
  const { success, data } = await readValidatedBody(event, CreateProjectSchema.safeParse);

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    });
  }

  return await createProject({ ...data, userId });
});
