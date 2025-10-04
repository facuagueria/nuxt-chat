import { createOpenAIModel, generateChatResponse } from '#layers/chat/server/services/ai-service';
import { ChatMessageSchema } from '#layers/chat/server/schemas';

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, ChatMessageSchema.safeParse);
  const { success, data } = body;

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
    });
  }

  const { messages } = data as {
    messages: ChatMessage[]; chatId: string;
  };

  const openaiApiKey = useRuntimeConfig().openaiApiKey;
  const openaiModel = createOpenAIModel(openaiApiKey);

  // const ollamaModel = createOllamaModel();

  const response = await generateChatResponse(
    openaiModel,
    messages,
  );

  return {
    id: messages.length.toString(),
    role: 'assistant',
    content: response,
  };
});
