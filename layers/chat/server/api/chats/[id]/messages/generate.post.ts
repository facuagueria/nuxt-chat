import type { H3Event } from 'h3';
import { getMessagesByChatId, createMessageForChat } from '#layers/chat/server/repository/chatRepository';
import { createOpenAIModel, generateChatResponse } from '#layers/chat/server/services/ai-service';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);

  const history = getMessagesByChatId(id);

  const model = createOpenAIModel(useRuntimeConfig().openaiApiKey);

  const reply = await generateChatResponse(model, history);

  return createMessageForChat({
    chatId: id,
    content: reply,
    role: 'assistant',
  });
});
