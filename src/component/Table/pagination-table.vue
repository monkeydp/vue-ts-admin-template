<template>
    <div>
        <el-table
                ref="table"
                stripe
                v-loading="loading"
                :data="paging.content"
                fit
                highlight-current-row
                :width="width"
                :height="height"
                :default-expand-all="defaultExpandAll"
        >
            <el-table-column
                    label="No."
                    type="index"
            />
            <slot/>
        </el-table>

        <pagination
                v-show="paging.total > 0"
                :total="paging.total"
                :page.sync="pqForm.currentPage"
                :limit.sync="pqForm.pageSize"
                @pagination="innerGetPaging"
        />
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Ref, Vue} from "vue-property-decorator";
    import Paging, {PagingQueryForm} from 'biz-ts/src/api/Paging';
    import Pagination from '@/component/Pagination/index.vue'
    import {Table} from "element-ui";

    @Component({
        components: {
            Pagination
        }
    })
    export default class PaginationTable extends Vue {

        @Prop() protected width!: [string, number]
        @Prop() protected height!: [string, number]
        @Prop() protected defaultExpandAll!: boolean

        @Ref() private table!: Table

        @Prop() protected pqForm!: PagingQueryForm
        @Prop() protected getPaging!: (() => Promise<Paging<unknown>>)

        private paging = new Paging<unknown>()
        private loading = true

        private async innerGetPaging() {
            this.loading = true
            this.paging = await this.getPaging()
            this.loading = false
        }

        private async created() {
            await this.innerGetPaging()
        }

        async refresh() {
            await this.innerGetPaging()
            this.table.doLayout()
        }
    }
</script>
