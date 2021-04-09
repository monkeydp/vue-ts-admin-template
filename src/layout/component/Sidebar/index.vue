<template>
    <div :class="{'has-logo': false}">
        <sidebar-logo
                v-if="false"
                :collapse="isCollapse"
        />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                    :default-active="activeMenu"
                    :collapse="isCollapse"
                    :background-color="variables.menuBg"
                    :text-color="variables.menuText"
                    :unique-opened="false"
                    :collapse-transition="false"
                    mode="vertical"
            >
                <sidebar-item
                        v-for="route in routes"
                        :key="route.path"
                        :item="route"
                        :base-path="route.path"
                        :is-collapse="isCollapse"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {appModule} from '@/store/module/AppModule'
    import SidebarItem from './SidebarItem.vue'
    import variables from '@/style/_variables.scss'
    import {RouterOptions} from "vue-router/types/router";

    @Component({
        name: 'SideBar',
        components: {
            SidebarItem
        }
    })
    export default class extends Vue {

        get routes() {
            return (this.$router as unknown as { options: RouterOptions }).options.routes
        }

        get sidebar() {
            return appModule.sidebar
        }

        get variables() {
            return variables
        }

        get activeMenu() {
            const route = this.$route
            const {meta, path} = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        }

        get isCollapse() {
            return !this.sidebar.opened
        }
    }
</script>

<style lang="scss">
    .sidebar-container {
        // reset element-ui css
        .horizontal-collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
        }

        .scrollbar-wrapper {
            overflow-x: hidden !important;
        }

        .el-scrollbar__view {
            height: 100%
        }

        .el-scrollbar__bar {
            &.is-vertical {
                right: 0px;
            }

            &.is-horizontal {
                display: none;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .el-scrollbar {
        height: 100%
    }

    .has-logo {
        .el-scrollbar {
            height: calc(100% - 50px);
        }
    }

    .el-menu {
        border: none;
        height: 100%;
        width: 100% !important;
    }
</style>
