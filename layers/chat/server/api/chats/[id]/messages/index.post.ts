import type { H3Event } from 'h3';
import { createMessageForChat } from '#layers/chat/server/repository/chatRepository';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const body = await readBody(event);

  return createMessageForChat({
    chatId: id,
    content: body.content,
    role: body.role,
  });
});
