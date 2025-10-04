import type { H3Event } from 'h3';
import { createChat } from '#layers/chat/server/repository/chatRepository';
import { CreateChatSchema } from '#layers/chat/server/schemas';

export default defineEventHandler(async (event: H3Event) => {
  const { success, data } = await readValidatedBody(event, CreateChatSchema.safeParse);

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    });
  }

  const { title, projectId } = data;

  const storage = useStorage('db');

  await storage.setItem('chats:has-new-chat', true);

  return await createChat({
    title,
    projectId,
  });
});
