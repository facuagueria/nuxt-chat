<script setup lang="ts">
const error = useError();

function handleError() {
  clearError({ redirect: '/' });
}
</script>

<template>
  <UContainer
    v-if="error"
    class="flex justify-center h-full p-4"
  >
    <UCard
      variant="soft"
      class="min-w-md"
    >
      <template #header>
        <h1 class="text-lg font-bold">
          Error - {{ error.statusCode }}
        </h1>
      </template>

      <p class="text-sm">
        {{ error.message }}
      </p>

      <UButton
        class="mt-4"
        color="primary"
        variant="soft"
        icon="i-heroicons-arrow-left"
        @click="handleError"
      >
        Go Back Home
      </UButton>
    </UCard>
  </UContainer>
</template>
