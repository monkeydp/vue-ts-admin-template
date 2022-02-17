<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import UserApi from "@/module/user/UserApi";
    import {Inject} from "typescript-ioc";

    @Component({})
    export default class App extends Vue {

        @Inject
        private userApi!: UserApi

        private async created() {
            /**
             * 下次访问时检查是否登录
             */
            // await this.userApi.info()
        }
    }
</script>

<style lang="scss">

</style>
