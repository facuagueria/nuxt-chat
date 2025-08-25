import type { H3Event } from 'h3';
import { getMessagesByChatId } from '#layers/chat/server/repository/chatRepository';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);

  const messages = getMessagesByChatId(id);

  return messages;
});
