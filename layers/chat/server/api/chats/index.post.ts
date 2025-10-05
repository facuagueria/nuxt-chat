import type { H3Event } from 'h3';
import { createChat } from '#layers/chat/server/repository/chatRepository';
import { CreateChatSchema } from '#layers/chat/server/schemas';
import { getAuthenticatedUserId } from '~~/layers/auth/server/utils/auth';

export default defineEventHandler(async (event: H3Event) => {
  const userId = await getAuthenticatedUserId(event);
  const { success, data } = await readValidatedBody(event, CreateChatSchema.safeParse);

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    });
  }

  const { title, projectId } = data;

  const storage = useStorage('db');

  await storage.setItem(`chats:has-new-chat:${userId}`, true,
  );

  return await createChat({
    title,
    projectId,
    userId,
  });
});
