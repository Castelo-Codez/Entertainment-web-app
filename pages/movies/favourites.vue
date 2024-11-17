<script setup lang="ts">
const user = useCurrentUser();
definePageMeta({
    middleware: "auth",
});
</script>

<template>
    <div class="p-14 h-full" aria-label="favourite movies page">
        <ul
            aria-label="popular movies list"
            role="list"
            class="grid grid-cols-Grid6 gap-10"
            v-if="user.favMovies.length"
        >
            <li
                v-for="mv in user.favMovies"
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
                        :aria-label="'information about' + mv.original_title"
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
                                    new Date(`${mv.release_date}`).getFullYear()
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
        <div class="flex justify-center gap-4 flex-col items-center" v-else>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 24 24"
            >
                <path
                    class="fill-black dark:fill-white"
                    d="M6 18h5.5v-4H6zm0-5h5.5V6H6zm6.5 5H18v-7h-5.5zm0-8H18V6h-5.5zM3 21V3h18v4h2v2h-2v2h2v2h-2v2h2v2h-2v4zm2-2h14V5H5zM5 5v14z"
                />
            </svg>
            <span class="text-center">Your Favourites Movie List Is Empty</span>
        </div>
    </div>
</template>
