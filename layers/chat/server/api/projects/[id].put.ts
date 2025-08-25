import type { H3Event } from 'h3';
import { getProjectById, updateProject } from '#layers/chat/server/repository/projectRepository';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const project = await getProjectById(id);

  if (!project) return null;

  const body = await readBody(event);

  return await updateProject(id, { name: body.name });
});
