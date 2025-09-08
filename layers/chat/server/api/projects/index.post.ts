import type { H3Event } from 'h3';
import { createProject } from '#layers/chat/server/repository/projectRepository';
import { CreateProjectSchema } from '#layers/chat/server/schemas';

export default defineEventHandler(async (event: H3Event) => {
  const { success, data } = await readValidatedBody(event, CreateProjectSchema.safeParse);

  if (!success) {
    return 400;
  }

  return await createProject(data);
});
