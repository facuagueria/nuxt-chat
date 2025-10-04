import type { H3Event } from 'h3';
import { getProjectById, updateProject } from '#layers/chat/server/repository/projectRepository';
import { UpdateProjectSchema } from '#layers/chat/server/schemas';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const { success, data } = await readValidatedBody(event, UpdateProjectSchema.safeParse);

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    });
  }

  const project = await getProjectById(id);
  if (!project) return 404;

  return await updateProject(id, data);
});
