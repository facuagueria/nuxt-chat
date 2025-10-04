import type { H3Event } from 'h3';
import { createProject } from '#layers/chat/server/repository/projectRepository';
import { CreateProjectSchema } from '#layers/chat/server/schemas';

export default defineEventHandler(async (event: H3Event) => {
  const { success, data } = await readValidatedBody(event, CreateProjectSchema.safeParse);

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    });
  }

  return await createProject(data);
});
