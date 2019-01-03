<template>
    <div id="app">
        <h1>Font Discovery</h1>
        <FontCatalog v-bind:fonts="fonts" :categories="['sans-serif', 'serif', 'display']"></FontCatalog>
    </div>
</template>

<script>
    import {getFonts} from "./api";
    import FontCatalog from "./components/FontCatalog/FontCatalog";

    export default {
        name: 'app',
        components: {
            FontCatalog
        },
        async mounted() {
            const fonts = await getFonts();
            this.$store.dispatch("setFonts", fonts);
        },
        computed: {
            fonts() {
                return this.$store.state.fonts;
            },
        },
    }
</script>

<style lang="scss">
    @import "./mixins";

    :root {
        font-family: sans-serif;
        padding: 2rem;

        @include for-tablet-landscape-up {
            padding: 2rem 5%;
        }

        @include for-big-desktop-up {
            padding: 2rem 10%;
        }
    }

    #app > h1 {
        text-align: center;
    }

</style>
