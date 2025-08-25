import type { H3Event } from 'h3';
import { createProject } from '#layers/chat/server/repository/projectRepository';

export default defineEventHandler(async (event: H3Event) => {
  const { name } = await readBody(event);

  return await createProject({ name });
});
