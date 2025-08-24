import type { H3Event } from 'h3';
import { getAllChats } from '#layers/chat/server/repository/chatRepository';

export default defineEventHandler(async (_event: H3Event) => {
  return await getAllChats();
});
