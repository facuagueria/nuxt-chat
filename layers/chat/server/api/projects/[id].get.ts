import type { H3Event } from 'h3';
import { getProjectById } from '#layers/chat/server/repository/projectRepository';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);

  return await getProjectById(id);
});
