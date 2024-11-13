<script setup lang="ts">
useHead({
    title: "Entertainment web app",
    meta: [
        {
            name: "description",
            content: "front end mentor | Entertainment web app",
        },
    ],
    htmlAttrs: {
        lang: "en",
    },
});

const user = useCurrentUser();
const headers = useRequestHeaders(["cookie"]) as HeadersInit;

await callOnce(async () => {
    user.value = await $fetch("/api/users/getCurrentUser", {headers});
});
</script>

<template>
    <div>
        <NuxtLoadingIndicator :height="4" :throttle="0" :duration="5000" />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
