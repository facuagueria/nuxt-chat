import type { H3Event } from 'h3';
import { getChatByIdForUser, getMessagesByChatId } from '#layers/chat/server/repository/chatRepository';
import { getAuthenticatedUserId } from '~~/layers/auth/server/utils/auth';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const userId = await getAuthenticatedUserId(event);

  // Verify user owns the chat
  const chat = await getChatByIdForUser(id, userId);
  if (!chat) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Chat not found',
    });
  }

  const messages = getMessagesByChatId(id);

  return messages;
});
