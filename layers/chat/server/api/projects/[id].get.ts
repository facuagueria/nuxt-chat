import type { H3Event } from 'h3';
import { getProjectByIdForUser } from '#layers/chat/server/repository/projectRepository';
import { getAuthenticatedUserId } from '~~/layers/auth/server/utils/auth';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const userId = await getAuthenticatedUserId(event);

  const project = await getProjectByIdForUser(id, userId);

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found',
    });
  }

  return project;
});
