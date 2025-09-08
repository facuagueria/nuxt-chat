import type { H3Event } from 'h3';
import { createOpenAIModel, generateChatTitle } from '#layers/chat/server/services/ai-service';
import { updateChat } from '#layers/chat/server/repository/chatRepository';
import { UpdateChatTitleSchema } from '#layers/chat/server/schemas';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const { success, data } = await readValidatedBody(event, UpdateChatTitleSchema.safeParse);

  if (!success) {
    return 400;
  }

  const model = createOpenAIModel(useRuntimeConfig().openaiApiKey);
  const title = await generateChatTitle(model, data.message);

  return await updateChat(id, { title });
});
