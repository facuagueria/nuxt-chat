import type { H3Event } from 'h3';
import { createChat } from '#layers/chat/server/repository/chatRepository';

export default defineEventHandler(async (event: H3Event) => {
  const { title, projectId } = await readBody(event);

  const storage = useStorage('db');

  await storage.setItem('chats:has-new-chat', true);

  return await createChat({
    title,
    projectId,
  });
});
