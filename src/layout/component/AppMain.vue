<template>
    <section class="app-main">
        <div class="app-container">
            <transition
                    name="fade-transform"
                    mode="out-in"
            >
                <router-view :key="key"/>
            </transition>
        </div>
    </section>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'

    @Component({
        name: 'AppMain'
    })
    export default class extends Vue {

        get key() {
            return this.$route.path
        }
    }
</script>

<style lang="scss" scoped>
    .app-main {
        /* 50= navbar  50  */
        min-height: calc(100vh - 50px);
        width: 100%;
        position: relative;
        overflow: auto;
    }

    .app-container{
        height: 100%;
    }

    .app-container>:not(.dashboard-container){
        padding: 20px;
    }

    .fixed-header + .app-main {
        padding-top: 50px;
        height: 100vh;
    }

    .hasTagsView {
        .app-main {
            /* 84 = navbar + tags-view = 50 + 34 */
            min-height: calc(100vh - 84px);
        }

        .fixed-header + .app-main {
            padding-top: 84px;
        }
    }
</style>
