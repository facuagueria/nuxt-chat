import type { H3Event } from 'h3';
import { getMessagesByChatId, createMessageForChat } from '#layers/chat/server/repository/chatRepository';
import { createOpenAIModel, streamChatResponse } from '#layers/chat/server/services/ai-service';

export default defineEventHandler(async (event: H3Event) => {
  const { id } = getRouterParams(event);

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
