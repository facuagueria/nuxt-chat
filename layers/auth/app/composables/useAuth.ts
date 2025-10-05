export const useAuth = () => {
  const { loggedIn, user, session, fetch, clear } = useUserSession();

  const logout = async () => {
    await clear();

    await navigateTo('/login');
  };

  const isAuthenticated = computed(() => loggedIn.value && session.value?.databaseUserId !== undefined);

  const userName = computed(() => (user.value as GithubUser)?.name ?? (user.value as GithubUser)?.email ?? 'User');

  const userAvatar = computed(() => (user.value as GithubUser)?.avatar ?? null);

  const userEmail = computed(() => (user.value as GithubUser)?.email ?? null);

  return {
    isAuthenticated,
    user: readonly(user),
    session: readonly(session),
    userName,
    userAvatar,
    userEmail,
    refresh: fetch,
    logout,
  };
};
