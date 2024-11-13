<script setup lang="ts">
import {Skeleton} from "@/components/ui/skeleton";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

const $router = useRoute();
console.log($router.redirectedFrom);
const url = `https://api.themoviedb.org/3/movie/${$router.params.id}?language=en-US`;

const {data}: any = await useFetch(url as string, {
    headers: {
        accept: "application/json",
        Authorization: process.env.API_KEY as string,
    },
});
const Casturl = `https://api.themoviedb.org/3/movie/${$router.params.id}/credits?language=en-US`;

const resp: any = await useFetch(Casturl as string, {
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Zjc5NmUwMDExM2JkMDAwZDk4ZWE0YzI3MmY1ZmM5YyIsIm5iZiI6MTczMTA1MjQzNi44NTE5OTA3LCJzdWIiOiI2NzJiN2EzY2RlNTQ2NTg1ZDA0ZDk3YjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KD3HjY_D8OWtE4QY-dhaV6n5pIeiwk5Xvr8UqS9zrzg",
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
                        <li
                            role="listitem"
                            class="mb-8 flex items-center justify-between"
                        >
                            <h1
                                aria-label="the original title of the movie"
                                class="font-[800] text-[4vw] md:text-[2.5vw]"
                            >
                                {{ data.original_title }}
                            </h1>
                            <Drawer>
                                <DrawerTrigger>
                                    <Button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                class="fill-white dark:fill-black"
                                                d="M11.98 19.094q-.291 0-.577-.106q-.286-.105-.503-.323L9.752 17.63q-2.67-2.425-4.71-4.717Q3 10.622 3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.094 0 2.279.553T12 6.289q1.037-1.533 2.221-2.086T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 2.529-2.125 4.862t-4.652 4.622l-1.142 1.031q-.218.218-.513.323t-.587.106m-.47-11.767q-.898-1.448-1.867-2.063Q8.675 4.65 7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 1.108.627 2.272q.627 1.165 1.684 2.386q1.056 1.22 2.429 2.498q1.371 1.277 2.856 2.629q.173.154.404.154t.404-.154q1.485-1.352 2.857-2.63q1.372-1.276 2.429-2.497q1.056-1.222 1.683-2.386T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.144.615q-.97.614-1.867 2.062q-.08.135-.214.202T12 7.596t-.275-.067t-.213-.202M12 11.398"
                                            />
                                        </svg>
                                    </Button>
                                </DrawerTrigger>
                                <DrawerContent
                                    class="sm:w-[80%] mx-auto min-h-14"
                                >
                                    <DrawerHeader>
                                        <DrawerTitle
                                            >Are you absolutely
                                            sure?</DrawerTitle
                                        >
                                        <DrawerDescription
                                            >This action cannot be
                                            undone.</DrawerDescription
                                        >
                                    </DrawerHeader>
                                    <DrawerFooter>
                                        <Button>Submit</Button>
                                        <DrawerClose>
                                            <Button variant="outline">
                                                Cancel
                                            </Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
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
                                class="flex gap-3 flex-wrap"
                            >
                                <li v-for="castOne in cast" role="listitem">
                                    <Badge
                                        class="relative text-xs"
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
