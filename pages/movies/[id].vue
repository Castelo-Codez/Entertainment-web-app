<script setup lang="ts">
import {Skeleton} from "@/components/ui/skeleton";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
const {status, signIn} = useAuth();
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
const showDrawer = ref(false);
const $router = useRoute();
console.log($router.redirectedFrom);
const url = `https://api.themoviedb.org/3/movie/${$router.params.id}?language=en-US`;

const {data}: any = await useFetch(url as string, {
    headers: {
        accept: "application/json",
        Authorization: process.env.API_KEY,
    },
});
const Casturl = `https://api.themoviedb.org/3/movie/${$router.params.id}/credits?language=en-US`;

const resp: any = await useFetch(Casturl as string, {
    headers: {
        accept: "application/json",
        Authorization: process.env.API_KEY,
    },
});

const user = useCurrentUser();
const cast = resp.data.value.cast;
const isFav = computed((): boolean => {
    if (!user.value.favMovies) {
        return false;
    }
    let isF = user.value.favMovies.find(
        (el: any) => el.original_title == data.value.original_title
    );
    return isF ? true : false;
});
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
function $addToFav(): void {
    if (status.value === "unauthenticated") {
        showDrawer.value = true;
        return;
    }
    let $checkIfMovieIsFav = user.value.favMovies.find(
        (el: any) => el.original_title == data.value.original_title
    );
    if ($checkIfMovieIsFav) {
        user.value.favMovies = user.value.favMovies.filter(
            (el: any) => el.original_title !== data.value.original_title
        );
        $fetch(`/api/movies/removemovie/${$checkIfMovieIsFav.id}`, {
            headers,
            method: "POST",
        });
    } else {
        user.value.favMovies.push(data.value);
        $fetch("/api/movies/addmovie", {
            headers,
            method: "POST",
            body: data.value,
        });
    }
    document.body.style.position = "static";
}

function $logWithGithub() {
    signIn("github");
}
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
                                    <Button @click="$addToFav">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            v-if="isFav"
                                        >
                                            <path
                                                class="fill-red-600"
                                                d="M11.98 19.094q-.291 0-.577-.106q-.286-.105-.503-.323L9.752 17.63q-2.67-2.425-4.71-4.717Q3 10.622 3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.094 0 2.279.553T12 6.289q1.037-1.533 2.221-2.086T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 2.529-2.125 4.862t-4.652 4.622l-1.142 1.031q-.218.218-.513.323t-.587.106"
                                            />
                                        </svg>
                                        <svg
                                            v-else
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
                                    v-if="showDrawer"
                                    class="sm:w-[80%] mx-auto min-h-14"
                                >
                                    <DrawerHeader>
                                        <DrawerTitle
                                            >Please Login In
                                        </DrawerTitle>
                                        <DrawerDescription
                                            >This action cannot be Done until to
                                            login
                                        </DrawerDescription>
                                    </DrawerHeader>
                                    <DrawerFooter>
                                        <Button
                                            variant="outline"
                                            @click="$logWithGithub"
                                            class="w-full mt-5 p-2 flex justify-center gap-x-3 items-center"
                                        >
                                            Github
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="25"
                                                height="25"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    class="fill-black dark:fill-white"
                                                    fill-rule="evenodd"
                                                    d="M7.976 0A7.977 7.977 0 0 0 0 7.976c0 3.522 2.3 6.507 5.431 7.584c.392.049.538-.196.538-.392v-1.37c-2.201.49-2.69-1.076-2.69-1.076c-.343-.93-.881-1.175-.881-1.175c-.734-.489.048-.489.048-.489c.783.049 1.224.832 1.224.832c.734 1.223 1.859.88 2.3.685c.048-.538.293-.88.489-1.076c-1.762-.196-3.621-.881-3.621-3.964c0-.88.293-1.566.832-2.153c-.05-.147-.343-.978.098-2.055c0 0 .685-.196 2.201.832c.636-.196 1.322-.245 2.007-.245s1.37.098 2.006.245c1.517-1.027 2.202-.832 2.202-.832c.44 1.077.146 1.908.097 2.104a3.16 3.16 0 0 1 .832 2.153c0 3.083-1.86 3.719-3.62 3.915c.293.244.538.733.538 1.467v2.202c0 .196.146.44.538.392A7.98 7.98 0 0 0 16 7.976C15.951 3.572 12.38 0 7.976 0"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </Button>
                                        <DrawerClose>
                                            <Button
                                                variant="outline"
                                                class="flex w-full"
                                            >
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
