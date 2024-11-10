<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
const $router = useRoute();
const url = `https://api.themoviedb.org/3/movie/${$router.params.id}?language=en-US`;

const {data}: any = await useFetch(url as string, {
    headers: {
        accept: "application/json",
        Authorization:process.env.API_KEY as string,
    },
});
const Casturl = `https://api.themoviedb.org/3/movie/${$router.params.id}/credits?language=en-US`;

const resp: any = await useFetch(Casturl as string, {
    headers: {
        accept: "application/json",
        Authorization:process.env.API_KEY as string,
    },
});
const cast = resp.data.value.cast;
</script>

<template>
    <div :aria-label="data.original_title + 'movie page'" class="px-11 py-14">
        <Head>
            <Title>{{ data.original_title }}</Title>
            <Meta name="description" :content="data.overview" />
        </Head>
        <section :aria-label="data.original_title + 'information'">
            <div
                class="data-container max-w-full sm:max-w-[90%] md:max-w-[80%] mx-auto grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-y-10 gap-x-14"
                aria-label="data container"
            >
                <div
                    class="poster lg:h-[525px] relative overflow-hidden"
                    :aria-label="data.original_title + 'poster'"
                >
                    <img
                        :src="
                            'https://image.tmdb.org/t/p/original/' +
                            data.poster_path
                        "
                        :alt="data.original_title + 'poster'"
                        class="max-w-none w-full rounded-xl sm:-translate-y-2/4 sm:top-2/4 relative z-10"
                    />
                    <Skeleton
                        class="rounded-xl hidden lg:block absolute top-0 left-0 w-full h-full z-[-1]"
                    />
                </div>
                <div
                    :aria-label="
                        'general information about ' + data.original_title
                    "
                >
                    <ul role="list">
                        <li role="listitem" class="mb-8">
                            <h1
                                aria-label="the original title of the movie"
                                class="font-[800] text-center sm:text-left text-[8vw] md:text-[2.5vw]"
                            >
                                {{ data.original_title }}
                            </h1>
                        </li>
                        <li role="listitem" class="mb-8">
                            <Badge class="relative mb-5 text-xs"
                                >Overview</Badge
                            >
                            <br />
                            {{ data.overview }}
                        </li>
                        <li role="listitem" class="mb-8">
                            <Badge class="relative mb-5 text-xs">Cast</Badge>
                            <br />
                            <ul
                                :aria-label="data.original_title + 'cast'"
                                role="list"
                                class=" flex gap-3 flex-wrap"
                            >
                                <li v-for="castOne in cast" role="listitem">
                                    <Badge
                                        class="relative  text-xs"
                                        variant="secondary"
                                    >
                                        {{ castOne.original_name }}
                                    </Badge>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </section>
    </div>
</template>
