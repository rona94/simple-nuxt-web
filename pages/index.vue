<template>
    <HomeHeader />

    <section class="about">
        <div class="container">
            <p class="h1 text-center">Lorem ipsum</p>
            <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin venenatis ornare euismod. Mauris mollis nisi commodo diam venenatis elementum. Nullam pharetra commodo sem, non pretium diam placerat sit amet. Maecenas ac lectus sed elit imperdiet placerat in non lacus. Donec semper rutrum ligula eget placerat. Mauris congue nisi elit. Nam vestibulum urna ac orci vulputate, quis condimentum diam volutpat. Proin eu purus aliquet nibh laoreet porttitor eget sit amet erat. Donec ante nunc, ornare sed feugiat et, posuere nec orci. Donec at lectus euismod, condimentum ante imperdiet, rhoncus tortor.</p>
            <p class="text-center">Duis quis mattis mauris. In dignissim ligula eu nunc pulvinar bibendum. Aliquam semper, diam sed varius dignissim, urna purus facilisis lorem, quis faucibus mauris lectus sed massa. Vivamus condimentum elit at augue fringilla sodales. Sed a ipsum sed enim hendrerit pellentesque non id purus. Fusce mattis fringilla odio ultricies convallis. Nullam vehicula sagittis tellus. In hac habitasse platea dictumst. In tempor vitae dolor ac mollis. Pellentesque quis magna ex.</p>
        </div>
    </section>

    <section class="home-carousel">
        <div class="container">
            <p class="h1 text-center">Lorem ipsum</p>
            <ProductsCarousel />
            <div class="text-center">
                <NuxtLink to="/products" class="btn btn-rounded">View All Products</NuxtLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
.home-carousel {
    padding-top: 50px;
    padding-bottom: 100px;
}
</style>