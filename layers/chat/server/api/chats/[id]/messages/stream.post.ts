import type { H3Event } from 'h3';
import { getMessagesByChatId, createMessageForChat, getChatByIdForUser } from '#layers/chat/server/repository/chatRepository';
import { createOpenAIModel, streamChatResponse } from '#layers/chat/server/services/ai-service';
import { getAuthenticatedUserId } from '~~/layers/auth/server/utils/auth';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);
  const userId = await getAuthenticatedUserId(event);

  // Verify user owns the chat
  const chat = await getChatByIdForUser(id, userId);
  if (!chat) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Chat not found',
    });
  }

  const history = await getMessagesByChatId(id);

  const model = createOpenAIModel(useRuntimeConfig().openaiApiKey);

  const stream = await streamChatResponse(model, history);

  setResponseHeaders(event, {
    'Content-Type': 'text/html',
    'Cache-Control': 'no-cache',
    'Transfer-Encoding': 'chunked',
  });

  let completeResponse = '';

  const transformStream = new TransformStream({
    transform(chunk, controller) {
      completeResponse += chunk;
      controller.enqueue(chunk);
    },

    async flush() {
      await createMessageForChat({
        chatId: id,
        content: completeResponse,
        role: 'assistant',
      });
    },
  });

  return stream.pipeThrough(transformStream);
});
