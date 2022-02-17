<template>
    <div style="height: 650px; overflow: auto">
        <div class="info-block">
            <span class="lp-panel-title">
                <span> {{$translate('user','info')}}</span>
                <refresh-button @click="refresh()"/>
            </span>

            <el-card>
                <el-row>
                    <el-col :span="leftColSpan" class="col-header">{{$translate('name')}}</el-col>
                    <el-col :span="rightColSpan">{{user.name}}</el-col>
                    <el-col :span="leftColSpan" class="col-header">{{$translate('register', 'way')}}</el-col>
                    <el-col :span="rightColSpan">{{registerWayZh[user.registerWay]}}</el-col>
                </el-row>
                <el-divider/>
                <el-row>
                    <el-col :span="leftColSpan" class="col-header">{{$translate('loginName')}}</el-col>
                    <el-col :span="rightColSpan">
                        <span-nullable :content="user.loginName"/>
                    </el-col>
                    <el-col :span="leftColSpan" class="col-header">{{$translate('phoneNumber')}}</el-col>
                    <el-col :span="rightColSpan">
                        <span-nullable :content="user.mobile"/>
                    </el-col>
                    <el-col :span="leftColSpan" class="col-header">{{$translate('email')}}</el-col>
                    <el-col :span="rightColSpan">
                        <span-nullable :content="user.email"/>
                    </el-col>
                </el-row>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {Inject} from "typescript-ioc";
    import UserApi from "@/module/user/UserApi";
    import {registerWayZh, UserDetail} from "@/model/User";
    import userModule from "@/store/module/UserModule";
    import SpanNullable from "@/component/Span/span-nullable.vue";
    import RefreshButton from "@/component/Button/refresh-button.vue";

    @Component({
        components: {
            SpanNullable,
            RefreshButton,
        },
    })
    export default class UserInfoView extends Vue {

        @Inject
        private userApi!: UserApi

        private leftColSpan = 3
        private rightColSpan = 5

        private user = new UserDetail()

        private registerWayZh = registerWayZh

        private created() {
            this.getUserDetail()
        }

        private refresh() {
            this.getUserDetail()
        }

        private async getUserDetail() {
            const id = Number(this.$route.query.id)
            this.user = await this.userApi.detail(id)
            await userModule.activate(this.user)
        }
    }
</script>

<style lang="scss">

</style>
