<template>
    <div class="category">


        <div class="sample-text-input">
            <label for="sample-text">HTML Sample Text</label>
            <textarea id="sample-text" v-model="html" spellcheck="false"/>
        </div>

        <div class="inputs">
            <label class="search-input">
                Suche
                <input type="text" v-model="search">
            </label>

            <div class="checkboxes">
                <label v-for="type in categories" :key="type">
                    {{ type }}
                    <input type="checkbox" v-model="selectedCategories" :value="type">
                </label>
            </div>
        </div>

        <ul>
            <li v-for="font in filteredFonts" :data-font="font.family" :key="font.family" ref="fontRefs"
                :style="{fontFamily: font.family}">

                <h2>{{ font.family }}</h2>
                <div class="html-sample" v-html="html"></div>
            </li>
        </ul>

    </div>
</template>

<script>
    import {loadFont} from "../../api";

    export default {
        name: "FontCatalog",
        props: {
            fonts: Array,
            categories: Array,
        },
        data() {
            return {
                search: "",
                selectedCategories: this.categories,
                html: "<h1>Heading</h1>\n<p>\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequuntur harum iure nisi quidem unde vel. Eaque fugiat ipsa maiores!\n</p>",
            }
        },
        computed: {
            filteredFonts() {
                const filtered = this.fonts.filter(font =>
                    this.selectedCategories.some(
                        category => category === font.category && font.family.match(this.search)
                    )
                );

                if (filtered.length > 0) {
                    this.setupIntersectionObserver();
                }

                return filtered;
            }
        },
        methods: {

            setupIntersectionObserver() {
                this.$nextTick(function () {
                    const observer = new IntersectionObserver(this.intersectionCallback, {
                        threshold: 0,
                        rootMargin: "0px 0px 300px 0px",
                    });
                    this.$refs.fontRefs.forEach((li) => observer.observe(li)); // unobserve ?
                })
            },

            intersectionCallback(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let elem = entry.target;
                        const font = elem.dataset.font;
                        loadFont(this.$store.state.fontsByName[font]);
                    }
                });
            }

        }
    }

</script>

<style lang="scss" scoped>
    @import "../../mixins";

    .category ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr;

        @include for-tablet-portrait-up {
            grid-template-columns: repeat(2, 50%);
        }

        @include for-tablet-landscape-up {
            grid-template-columns: repeat(3, 33.3%);
        }

        @include for-big-desktop-up {
            grid-template-columns: repeat(4, 25%);
        }
    }

    .category li {
        display: inline-block;
        padding: 1rem;
        font-size: 1.2rem;
    }

    .sample-text-input {
        margin: 0 auto;
        min-width: 200px;
        width: 50%;

        > label {
            display: block;
            margin-bottom: 0.5rem;
        }

        > textarea {
            display: block;
            width: 100%;
            height: 100px;
        }
    }

    .inputs {
        padding: 1rem;
        text-align: center;
    }

    .checkboxes {
        display: inline-block;
        padding-left: 1rem;
    }

    .html-sample {
        word-break: break-word;
    }
</style>
