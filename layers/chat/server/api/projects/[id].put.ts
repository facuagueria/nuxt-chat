import type { H3Event } from 'h3';
import { getProjectByIdForUser, updateProject } from '#layers/chat/server/repository/projectRepository';
import { UpdateProjectSchema } from '#layers/chat/server/schemas';
import { getAuthenticatedUserId } from '~~/layers/auth/server/utils/auth';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const userId = await getAuthenticatedUserId(event);

  // Verify user owns the project
  const project = await getProjectByIdForUser(id, userId);
  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found',
    });
  }

  const { success, data } = await readValidatedBody(event, UpdateProjectSchema.safeParse);

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    });
  }

  return await updateProject(id, data);
});
