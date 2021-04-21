<template>
    <div class="user-container">
        <refresh-button @click="refresh()"/>

        <pagination-table
                ref="ptable"
                :pq-form="pqForm"
                :get-paging="getPaging"
                :height="contentHeight"
        >
            <el-table-column
                    min-width="70"
                    property="id"
                    :label="$translate('id')"
            />

            <el-table-column
                    min-width="120"
                    property="name"
                    :label="$translate('user','name')"
                    show-overflow-tooltip
            />

            <el-table-column
                    min-width="120"
                    prop="key"
                    :label="$translate('key')"
                    show-overflow-tooltip
            />

            <el-table-column
                    prop="registerWay"
                    :formatter="registerWayFmt"
                    :label="$translate('register', 'way')"
                    show-overflow-tooltip
            />

            <el-table-column
                    min-width="120"
                    prop="loginName"
                    :label="$translate('loginName')"
                    show-overflow-tooltip
            />

            <el-table-column
                    min-width="120"
                    prop="mobile"
                    :label="$translate('phoneNumber')"
                    show-overflow-tooltip
            />

            <el-table-column
                    min-width="120"
                    prop="email"
                    :label="$translate('email')"
                    show-overflow-tooltip
            />

            <el-table-column
                    min-width="50"
                    prop="avatar"
                    :label="$translate('avatar')"
            >
                <template slot-scope="scope">
                    <el-image :src="scope.row.avatar"
                              style="
                                  width: 30px;
                                  height: 30px;
                                  border-radius: 10px;
                              "
                    />
                </template>
            </el-table-column>

            <el-table-column
                    min-width="120"
                    property="createdAtPretty"
                    :label="$translate('createdAt')"
                    show-overflow-tooltip
            />

            <el-table-column
                    align="center"
                    :label="$translate('table.actions')"
                    min-width="185"
            >
                <template slot-scope="scope">
                    <el-button
                            type="primary"
                            size="mini"
                            icon="el-icon-view"
                            @click="handleDetailClick(scope.row)"
                    >
                        {{$translate('detail')}}
                    </el-button>
                    <el-button
                            v-if="scope.row.deletable"
                            type="danger"
                            size="mini"
                            icon="el-icon-delete"
                            style="margin-left: 10px"
                            @click="handleDeleteClick(scope.row)"
                    >
                        {{$translate('delete')}}
                    </el-button>
                </template>
            </el-table-column>
        </pagination-table>

        <delete-dialog
                ref="deleteDialog"
                :title="$translate('delete', 'user')"
                :obj-name="user.name"
                :confirm="deleteUser"
                :after="refresh"
        />
    </div>
</template>

<script lang="ts">
    import {Component, Ref, Vue} from 'vue-property-decorator'
    import UserApi, {UpqForm} from "@/api/UserApi";
    import {Inject} from "typescript-ioc";
    import Pagination from '@/component/Pagination/index.vue'
    import DeleteDialog from "@/component/Crud/delete-dialog.vue";
    import CreateDialog from "@/component/Crud/create-dialog.vue";
    import RefreshButton from "@/component/Button/refresh-button.vue";
    import PaginationTable from "@/component/Table/pagination-table.vue";
    import User, {registerWayZh} from "@/model/User";

    @Component({
        components: {
            Pagination,
            DeleteDialog,
            CreateDialog,
            RefreshButton,
            PaginationTable,
        },
    })
    export default class UserView extends Vue {
        @Inject
        private userApi!: UserApi

        @Ref()
        private ptable!: PaginationTable

        @Ref()
        private deleteDialog!: DeleteDialog

        private user = new User()

        private pqForm = this.initPqForm()

        private initPqForm(): UpqForm {
            const pqFormJson = this.$route.query.pqForm as string | null
            if (pqFormJson != null)
                return JSON.parse(pqFormJson)
            else
                return new UpqForm()
        }

        private refresh() {
            this.ptable?.refresh()
        }

        private async getPaging() {
            return this.userApi.paging(this.pqForm)
        }

        private registerWayZh = registerWayZh

        private registerWayFmt(user: User) {
            return this.registerWayZh[user.registerWay]
        }

        private async handleDetailClick(user: User) {
            this.$redirector.userDetail({
                id: user.id.toString(),
                pqForm: JSON.stringify(this.pqForm)
            })
        }

        private async handleDeleteClick(user: User) {
            this.user = user
            this.deleteDialog.open()
        }

        private async deleteUser() {
            await this.userApi.delete(this.user.id)
        }

        private get contentHeight() {
            return window?.innerHeight - 240
        }
    }
</script>

<style lang="scss">
</style>
