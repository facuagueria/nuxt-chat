import type { H3Event } from 'h3';
import { createOpenAIModel, generateChatTitle } from '#layers/chat/server/services/ai-service';
import { updateChat } from '#layers/chat/server/repository/chatRepository';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const { message } = await readBody(event);

  const model = createOpenAIModel(useRuntimeConfig().openaiApiKey);
  const title = await generateChatTitle(model, message);

  return await updateChat(id, { title });
});
