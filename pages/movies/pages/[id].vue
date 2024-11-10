<script setup lang="ts">
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

const $router = useRoute();
const nuxtApp = useNuxtApp();
const url = `https://api.themoviedb.org/3/movie/${$router.query.search}?language=en-US&page=${$router.params.id}`;

const {data}: any = await useFetch(url as string, {
    headers: {
        accept: "application/json",
        Authorization: process.env.API_KEY,
    },
    getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
});
import {
    Pagination,
    PaginationEllipsis,
    PaginationList,
    PaginationListItem,
} from "@/components/ui/pagination";

</script>

<template>
    <div>
        <section aria-lable="grid section" class="p-14 pb-8 mb-7">
            <div
                aria-label="header"
                class="flex justify-between items-center mb-10 pr-6"
            >
                <h2
                    class="text-[8.5vw] sm:text-[6.5vw] md:text-[3.5vw] lg:text-[2.5vw] xl:text-[2.1vw] 2xl:text-[2vw] font-[600] flex gap-x-3 items-center"
                >
                    Total Results
                    <Badge class="relative mt-5 text-xs">{{
                        data.total_results
                    }}</Badge>
                </h2>
            </div>
            <ul
                aria-label="popular movies list"
                role="list"
                class="grid grid-cols-Grid6 gap-10"
            >
                <li
                    v-for="mv in data.results"
                    role="listitem"
                    :aria-label="mv.original_title + 'movie'"
                    :key="mv.id"
                >
                    <RouterLink
                        :to="{params: {id: mv.id}, name: 'movies-id'}"
                        class="flex flex-col gap-y-5 h-50 group w-fit"
                    >
                        <div aria-lable="image container">
                            <img
                                :src="
                                    'https://image.tmdb.org/t/p/original/' +
                                    `${mv.backdrop_path}`
                                "
                                :alt="mv.original_title"
                                class="max-w-none w-full rounded-2xl"
                            />
                        </div>
                        <article
                            role="article"
                            class="pl-5 font-[600]"
                            :aria-label="
                                'information about' + mv.original_title
                            "
                        >
                            <h3
                                aria-level="3"
                                aria-label="main heading"
                                role="heading"
                                class="mb-3"
                            >
                                {{ mv.original_title }}
                            </h3>
                            <ul
                                role="list"
                                class="flex gap-x-5 text-xs items-center"
                            >
                                <li
                                    aria-label="row information"
                                    role="listitem"
                                    class="flex gap-x-1 items-center"
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

                                    {{
                                        new Date(
                                            `${mv.release_date}`
                                        ).getFullYear()
                                    }}
                                </li>
                                <li
                                    aria-label="row information"
                                    role="listitem"
                                    class="flex items-center gap-x-2"
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
                                </li>
                            </ul>
                        </article>
                    </RouterLink>
                </li>
            </ul>
        </section>
        <section
            aria-label="pagination section"
            class="pb-10 flex justify-center items-center"
        >
            <Pagination
                class="w-[80%] sm:w-[90%] md:w-full"
                v-slot="{page}"
                :total="5000"
                :sibling-count="1"
                show-edges
                :default-page="+$router.params.id"
            >
                <PaginationList
                    v-slot="{items}"
                    class="flex justify-center items-center gap-1"
                >
                    <template v-for="(item, index) in items">
                        <PaginationListItem
                            v-if="item.type === 'page'"
                            :key="index"
                            :value="item.value"
                            as-child
                        >
                            <Button
                                class="w-10 h-10 p-0 block"
                                :variant="
                                    item.value === +$router.params.id
                                        ? 'default'
                                        : 'outline'
                                "
                            >
                                <RouterLink
                                    :to="{
                                        name: 'movies-pages-id',
                                        params: {id: item.value},
                                        query: {search: $router.query.search},
                                    }"
                                    class="flex justify-center items-center w-full h-full"
                                >
                                    {{ item.value }}
                                </RouterLink>
                            </Button>
                        </PaginationListItem>
                        <PaginationEllipsis
                            v-else
                            :key="item.type"
                            :index="index"
                        />
                    </template>
                </PaginationList>
            </Pagination>
    
        </section>
    </div>
</template>
