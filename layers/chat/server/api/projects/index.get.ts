import type { H3Event } from 'h3';
import { getAllProjectsByUser } from '#layers/chat/server/repository/projectRepository';
import { getAuthenticatedUserId } from '~~/layers/auth/server/utils/auth';

export default defineEventHandler(async (event: H3Event) => {
  const userId = await getAuthenticatedUserId(event);

  return getAllProjectsByUser(userId);
});
