import type { H3Event } from 'h3';
import { createMessageForChat } from '#layers/chat/server/repository/chatRepository';
import { CreateMessageSchema } from '#layers/chat/server/schemas';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const { success, data } = await readValidatedBody(event, CreateMessageSchema.safeParse);

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    });
  }

  return createMessageForChat({
    chatId: id,
    content: data.content,
    role: data.role,
  });
});
