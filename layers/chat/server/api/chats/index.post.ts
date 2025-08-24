import type { H3Event } from 'h3';
import { createChat } from '#layers/chat/server/repository/chatRepository';

export default defineEventHandler(async (event: H3Event) => {
  const { title, projectId } = await readBody(event);

  return await createChat({
    title,
    projectId,
  });
});
