<template>
    <div class="user-detail-container">
        <span class="lp-header-title" style="margin-bottom: 20px; width: 300px">
            <el-row>
                <el-col :span="3">
                    <router-link :to="{name:'user', query: {pqForm: $route.query.pqForm}}">
                        <el-icon name="back"/>
                    </router-link>
                </el-col>
                <el-col :span="4">
                     <el-image :src="user.avatar"
                               style="
                                  width: 40px;
                                  height: 40px;
                                  border-radius: 10px;
                                  flex: auto;
                               "
                     />
                </el-col>
                <el-col :span="16">
                    {{ user.name }}
                </el-col>
            </el-row>
        </span>

        <el-row style="margin-bottom: 30px">
            <el-col :span="leftColSpan" class="col-header">{{$translate('user', 'key')}}</el-col>
            <el-col :span="rightColSpan">{{ user.key }}</el-col>
        </el-row>

        <el-tabs value="userInfo">
            <el-tab-pane :label="$translate('user','info')" name="userInfo">
                <user-info-view/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import UserInfoView from "@/view/user-manage/user/info.vue";
    import userModule from "@/store/module/UserModule";
    import {Inject} from "typescript-ioc";
    import UserApi from "@/api/UserApi";

    @Component({
        components: {
            UserInfoView,
        },
    })
    export default class UserDetailView extends Vue {

        @Inject
        private userApi!: UserApi

        private leftColSpan = 2
        private rightColSpan = 10

        private get user() {
            return userModule.active
        }

        private async created() {
            const id = Number(this.$route.query.id)
            const user = await this.userApi.detail(id)
            await userModule.activate(user)
        }

        private destroyed() {
            userModule.destroy()
        }
    }
</script>

<style lang="scss" >
</style>
