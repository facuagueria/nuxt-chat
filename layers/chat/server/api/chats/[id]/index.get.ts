import type { H3Event } from 'h3';
import { getChatById } from '#layers/chat/server/repository/chatRepository';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);

  return await getChatById(id);
});
