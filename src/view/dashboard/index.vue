<template>
    <div class="dashboard-container bg">
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import userSession from "@/store/module/UserSession";
    import UserApi from "@/module/user/UserApi";
    import {Inject} from "typescript-ioc";

    @Component({})
    export default class DashboardView extends Vue {

        @Inject
        private userApi!: UserApi

        async handleLogout() {
            if (userSession.isLogged) {
                await this.userApi.logout()
            }
            this.$redirector.login()
        }
    }
</script>

<style lang="scss">
    .dashboard {
        &-container {
            margin: 0px;
        }

        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }

    .bg {
        /* The image used */
        background-image: url("../../asset/home.jpg");

        /* Full height */
        height: 100%;

        /* Center and scale the image nicely */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
