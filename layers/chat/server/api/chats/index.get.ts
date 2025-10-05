import type { H3Event } from 'h3';
import { getAllChats } from '#layers/chat/server/repository/chatRepository';
import { getAuthenticatedUserId } from '#layers/auth/server/utils/auth';

export default defineCachedEventHandler(async (event: H3Event) => {
  const userId = await getAuthenticatedUserId(event);

  const storage = useStorage('db');
  await storage.setItem(`chats:has-new-chat:${userId}`, false);

  return await getAllChats();
}, {
  name: 'getAllChats',
  maxAge: 0,
  swr: false,
  async shouldInvalidateCache(event) {
    const userId = await getAuthenticatedUserId(event);

    const storage = useStorage('db');

    const hasNewChat = await storage.getItem<boolean>(`chats:has-new-chat:${userId}`);

    return hasNewChat || false;
  },
});
