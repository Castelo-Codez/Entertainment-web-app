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
</script>

<template>
    <div>
        <NuxtLoadingIndicator :height="2" :throttle="0" :duration="5000" />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
