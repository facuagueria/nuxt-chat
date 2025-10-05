import type { H3Event } from 'h3';
import { getChatByIdForUser } from '#layers/chat/server/repository/chatRepository';
import { getAuthenticatedUserId } from '~~/layers/auth/server/utils/auth';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const userId = await getAuthenticatedUserId(event);

  const chat = await getChatByIdForUser(id, userId);

  if (!chat) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Chat not found',
    });
  }

  return chat;
});
