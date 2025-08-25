import type { H3Event } from 'h3';
import { getAllProjects } from '#layers/chat/server/repository/projectRepository';

export default defineEventHandler(async (_event: H3Event) => {
  return await getAllProjects();
});
