<script lang="ts" setup>
import Carousel from "@/components/custom/Carousel.vue";
import GridSec from "@/components/custom/GridSec.vue";

</script>

<template>
    <div aria-label="index page" class="px-4 pt-10 md:pl-10">
        <Carousel
            url="https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
            carousel-name="Trending"
        />
        <GridSec
            -grid-sec-name="Popular"
            url="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
        />
        <GridSec
            -grid-sec-name="Top Rated"
            url="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
        />
    </div>
</template>
