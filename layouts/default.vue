<script setup lang="ts">
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import {Input} from "@/components/ui/input";
import {MagnifyingGlassIcon} from "@radix-icons/vue";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const {data, signOut} = useAuth();
const changeTheme = useColorMode();
const user = useCurrentUser();
function $changeTheme() {
    return changeTheme.preference === "dark"
        ? (changeTheme.preference = "light")
        : (changeTheme.preference = "dark");
}
</script>

<template>
    <div
        aria-label="app"
        class="md:grid md:grid-cols-[250px_1fr] items-start lg:gird-cols-[300px_1fr] min-h-screen"
    >
        <aside class="bg-muted/30 md:min-h-full border-b md:border-r py-4">
            <nav
                role="navigation"
                aria-label="small screens navigation links & search bar container"
                class="md:hidden px-4 flex justify-between items-center gap-x-4"
            >
                <section class="flex gap-x-3">
                    <Sheet>
                        <SheetTrigger class="border">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    class="fill:black dark:fill-white"
                                    d="M4.5 17.27q-.213 0-.356-.145T4 16.768t.144-.356t.356-.143h15q.213 0 .356.144q.144.144.144.357t-.144.356t-.356.143zm0-4.77q-.213 0-.356-.144T4 11.999t.144-.356t.356-.143h15q.213 0 .356.144t.144.357t-.144.356t-.356.143zm0-4.77q-.213 0-.356-.143Q4 7.443 4 7.23t.144-.356t.356-.143h15q.213 0 .356.144T20 7.23t-.144.356t-.356.144z"
                                />
                            </svg>
                        </SheetTrigger>

                        <SheetContent class="min-w-[300px] sm:w-[350px]">
                            <SheetHeader
                                class="relative mt-10 border-t border-b flex-row justify-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        class="fill:black dark:fill-white"
                                        d="m4.616 5l1.5 3h3l-1.5-3h2l1.5 3h3l-1.5-3h2l1.5 3h3l-1.5-3h1.769q.69 0 1.153.463T21 6.616v10.769q0 .69-.462 1.153T19.385 19H4.615q-.69 0-1.152-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5"
                                    />
                                </svg>
                            </SheetHeader>
                            <ul role="list" class="relative mt-10">
                                <li role="listitem" class="mb-5 px-1">
                                    <RouterLink
                                        to="/"
                                        class="flex gap-x-4 mb-5 items-center rounded-md py-1"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                class="fill:black dark:fill-white"
                                                d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1s1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m2.19 12.19L6 18l3.81-8.19L18 6z"
                                            />
                                        </svg>
                                        <span>Explore</span>
                                    </RouterLink>
                                    <RouterLink
                                        to="/movies/favourites"
                                        class="flex gap-x-4 mb-5 items-center rounded-md py-1"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                class="fill-red-600"
                                                d="M11.98 19.094q-.291 0-.577-.106q-.286-.105-.503-.323L9.752 17.63q-2.67-2.425-4.71-4.717Q3 10.622 3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.094 0 2.279.553T12 6.289q1.037-1.533 2.221-2.086T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 2.529-2.125 4.862t-4.652 4.622l-1.142 1.031q-.218.218-.513.323t-.587.106"
                                            />
                                        </svg>

                                        <span>Favourites</span>
                                    </RouterLink>
                                </li>
                                <li role="listitem">
                                    <button
                                        class="flex gap-x-4 items-center"
                                        @click="$changeTheme"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                class="fill-black dark:fill-white"
                                                d="M12.058 20q-3.334 0-5.667-2.333T4.058 12q0-3.039 1.98-5.27t4.904-2.634q.081 0 .159.006t.153.017q-.506.706-.801 1.57T10.158 7.5q0 2.667 1.866 4.533t4.534 1.867q.951 0 1.813-.295t1.548-.801q.012.075.017.153t.006.159q-.384 2.923-2.615 4.903T12.057 20"
                                            />
                                        </svg>
                                        Change Theme
                                    </button>
                                </li>
                            </ul>
                        </SheetContent>
                    </Sheet>
                    <section
                        aria-label="input wrapper"
                        class="relative max-w-sm items-center"
                    >
                        <Input
                            id="search"
                            type="text"
                            placeholder="Search..."
                            class="pl-10"
                        />
                        <span
                            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
                        >
                            <MagnifyingGlassIcon
                                class="size-6 text-muted-foreground"
                            />
                        </span>
                    </section>
                </section>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button
                            variant="secondary"
                            size="icon"
                            class="rounded-full"
                        >
                            <img
                                :src="data.user.image"
                                :alt="user.username"
                                v-if="user.username"
                                class="max-w-none w-[25px] h-[25px] rounded-full"
                            />
                            <svg
                                v-else
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    class="fill:black dark:fill-white"
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"
                                />
                            </svg>
                            <span class="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-56 md:hidden">
                        <DropdownMenuLabel
                            class="capitalize"
                            v-if="user.username"
                            >{{ user.username }}</DropdownMenuLabel
                        >
                        <DropdownMenuLabel class="capitalize" v-else
                            >SignIn</DropdownMenuLabel
                        >
                        <DropdownMenuSeparator />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Button
                                class="flex justify-between items-center w-full h-full p-0"
                                @click="signOut"
                                variant="outline"
                            >
                                <span>log out </span>
                                <DropdownMenuShortcut
                                    class="text-muted-foreground"
                                    >⇧⌘Q</DropdownMenuShortcut
                                >
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
            <nav
                role="navigation"
                class="hidden md:block px-4"
                aria-label="large screens navigation links container"
            >
                <section aria-label="application logo" class="border-b pb-4">
                    <article role="article" class="flex items-center gap-x-2">
                        <span role="img">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    class="fill:black dark:fill-white"
                                    d="m4.616 5l1.5 3h3l-1.5-3h2l1.5 3h3l-1.5-3h2l1.5 3h3l-1.5-3h1.769q.69 0 1.153.463T21 6.616v10.769q0 .69-.462 1.153T19.385 19H4.615q-.69 0-1.152-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5"
                                />
                            </svg>
                        </span>
                        <h1 role="heading" class="font-[700]" aria-level="1">
                            Movies App
                        </h1>
                    </article>
                </section>
                <section aria-label="nav links section">
                    <ul role="list" class="mt-5">
                        <li role="listitem" class="mb-5">
                            <RouterLink
                                to="/"
                                class="flex gap-x-4 items-center rounded-md py-1"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        class="fill:black dark:fill-white"
                                        d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1s1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m2.19 12.19L6 18l3.81-8.19L18 6z"
                                    />
                                </svg>
                                <span>Explore</span>
                            </RouterLink>
                        </li>
                        <li role="listitem" class="mb-5">
                            <RouterLink
                                to="/movies/favourites"
                                class="flex gap-x-4 items-center rounded-md py-1"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        class="fill-red-600"
                                        d="M11.98 19.094q-.291 0-.577-.106q-.286-.105-.503-.323L9.752 17.63q-2.67-2.425-4.71-4.717Q3 10.622 3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.094 0 2.279.553T12 6.289q1.037-1.533 2.221-2.086T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 2.529-2.125 4.862t-4.652 4.622l-1.142 1.031q-.218.218-.513.323t-.587.106"
                                    />
                                </svg>

                                <span>Favourites</span>
                            </RouterLink>
                        </li>
                        <li role="listitem">
                            <button
                                class="flex gap-x-4 items-center"
                                @click="$changeTheme"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        class="fill-black dark:fill-white"
                                        d="M12.058 20q-3.334 0-5.667-2.333T4.058 12q0-3.039 1.98-5.27t4.904-2.634q.081 0 .159.006t.153.017q-.506.706-.801 1.57T10.158 7.5q0 2.667 1.866 4.533t4.534 1.867q.951 0 1.813-.295t1.548-.801q.012.075.017.153t.006.159q-.384 2.923-2.615 4.903T12.057 20"
                                    />
                                </svg>
                                Change Theme
                            </button>
                        </li>
                    </ul>
                </section>
            </nav>
        </aside>
        <main>
            <header
                class="hidden md:flex md:justify-between md:items-center bg-muted/30 py-3 px-4 pr-14 border-b"
            >
                <section
                    aria-label="input wrapper"
                    class="relative w-full max-w-sm items-center"
                >
                    <Input
                        id="search"
                        type="text"
                        placeholder="Search For Movie Or Tv Series"
                        class="pl-10"
                    />
                    <span
                        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
                    >
                        <MagnifyingGlassIcon
                            class="size-6 text-muted-foreground"
                        />
                    </span>
                </section>
                <section aria-label="prfile button & theme switcher wrapper">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="secondary" size="icon">
                                <img
                                    :src="data.user.image"
                                    :alt="user.username"
                                    v-if="user.username"
                                    class="max-w-none w-[25px] h-[25px] rounded-full"
                                />
                                <svg
                                    v-else
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        class="fill:black dark:fill-white"
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.95 9.95 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"
                                    />
                                </svg>
                                <span class="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            class="w-56 large-screens-dropdown"
                        >
                            <DropdownMenuLabel
                                class="capitalize"
                                v-if="user.username"
                                >{{ user.username }}</DropdownMenuLabel
                            >
                            <DropdownMenuLabel class="capitalize" v-else
                                >SignIn</DropdownMenuLabel
                            >
                            <DropdownMenuSeparator />
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Button
                                    class="flex justify-between items-center w-full h-full p-0"
                                    @click="signOut"
                                    variant="none"
                                >
                                    <span>log out </span>
                                    <DropdownMenuShortcut
                                        class="text-muted-foreground"
                                        >⇧⌘Q</DropdownMenuShortcut
                                    >
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </section>
            </header>
            <slot />
        </main>
    </div>
</template>
<style scoped>
.router-link-exact-active {
    @apply bg-primary-foreground;
}
</style>
