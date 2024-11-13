<script setup lang="ts">
interface Props {
    url?: string;
    carouselName?: string;
}

const nuxtApp = useNuxtApp();
const $props = defineProps<Props>();
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import {Badge} from "@/components/ui/badge";
const url = $props.url;

const {data} = await useFetch(url as string, {
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Zjc5NmUwMDExM2JkMDAwZDk4ZWE0YzI3MmY1ZmM5YyIsIm5iZiI6MTczMTA1MjQzNi44NTE5OTA3LCJzdWIiOiI2NzJiN2EzY2RlNTQ2NTg1ZDA0ZDk3YjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KD3HjY_D8OWtE4QY-dhaV6n5pIeiwk5Xvr8UqS9zrzg",
    },
    getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
});
const {results}: any = data.value;
</script>
<template>
    <section aria-label="trending movies" class="w-full pb-14">
        <h2
            class="mb-10 text-[8.5vw] sm:text-[6.5vw] md:text-[3.5vw] lg:text-[2.5vw] xl:text-[2.1vw] 2xl:text-[2vw] font-[600] flex gap-x-3 items-center"
        >
            {{ $props.carouselName }}
            <Badge class="relative mt-5 text-xs">Movies</Badge>
        </h2>
        <Carousel>
            <CarouselContent class="-ml-4">
                <CarouselItem
                    class="pl-4 sm:basis-1/2 lg:basis-1/3"
                    v-for="mv in results"
                >
                    <RouterLink
                        :to="{params: {id: mv.id}, name: 'movies-id'}"
                        class="flex flex-col h-50 group w-fit"
                    >
                        <div
                            aria-label="image-container"
                            class="w-full relative group overflow-hidden after:content-[''] after:absolute after:w-full after:h-full after:bg-muted/50 after:left-0 after:bottom-0 transition after:hidden hover:after:block"
                        >
                            <img
                                :src="
                                    'https://image.tmdb.org/t/p/original/' +
                                    mv.backdrop_path
                                "
                                :alt="mv.original_title + 'poster'"
                                class="max-w-none w-full rounded-xl relative z-10"
                            />

                            <article
                                role="article"
                                class="absolute z-10 w-[90%] left-4 bottom-4 transition translate-y-24 group-hover:translate-y-0"
                            >
                                <h3
                                    aria-label="movieName"
                                    class="text-[1.1rem] font-[800] mb-2"
                                >
                                    {{ mv.original_title }}
                                </h3>
                                <h4
                                    aria-label="movieInfo"
                                    class="flex justify-between items-center"
                                >
                                    <span
                                        aria-label="icon"
                                        class="text-[0.8rem] font-[800] flex gap-x-2 items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="25"
                                            height="25"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                class="fill:black dark:fill-white"
                                                d="M10 5h4v14h-4z"
                                                opacity=".3"
                                            />
                                            <path
                                                class="fill:black dark:fill-white"
                                                d="M20 21V3h-2v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2zM8 17H6v-2h2zm0-4H6v-2h2zm0-4H6V7h2zm6 10h-4V5h4zm2-12h2v2h-2zm0 4h2v2h-2zm0 6v-2h2v2z"
                                            />
                                        </svg>

                                        <span>Movie</span>

                                        <span v-if="mv.release_date">{{
                                            new Date(
                                                `${mv.release_date}`
                                            ).getFullYear()
                                        }}</span>
                                        <span v-if="mv.first_air_date">{{
                                            new Date(
                                                `${mv.first_air_date}`
                                            ).getFullYear()
                                        }}</span>
                                    </span>

                                    <span
                                        aria-label="rating"
                                        class="text-[0.8rem] font-[800] flex gap-x-2 items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                class="fill:black dark:fill-white"
                                                d="m22 9.24l-7.19-.62L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27L18.18 21l-1.63-7.03zM12 15.4l-3.76 2.27l1-4.28l-3.32-2.88l4.38-.38L12 6.1l1.71 4.04l4.38.38l-3.32 2.88l1 4.28z"
                                            />
                                        </svg>
                                        {{ mv.vote_average }}
                                    </span>
     
                                </h4>
                            </article>
                        </div>
                    </RouterLink>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </section>
</template>
<style scoped></style>
