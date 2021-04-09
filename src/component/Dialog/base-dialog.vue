<template>
    <el-dialog :visible.sync="visible" :title="getTitle">
        <slot/>
        <span slot="footer">
                <el-button @click="close()" v-if="getShowCancel()">{{getCancelText()}}</el-button>
                <el-button
                        type="primary"
                        @click="doConfirm"
                        v-if="getShowCancel()"
                >{{getConfirmText()}}</el-button>
            </span>
    </el-dialog>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class BaseDialog extends Vue {
        @Prop() protected title!: string | undefined
        @Prop() protected confirm!: (() => void) | undefined

        @Prop() protected cancelText!: string | undefined
        @Prop() protected confirmText!: string | undefined

        @Prop() protected showConfirm!: boolean | undefined
        @Prop() protected showCancel!: boolean | undefined

        @Prop() protected beforeOpen!: (() => void) | undefined
        @Prop() protected afterOpen!: (() => void) | undefined

        @Prop() protected before!: (() => void) | undefined
        @Prop() protected after!: (() => void) | undefined

        @Prop() protected beforeClose!: (() => void) | undefined
        @Prop() protected afterClose!: (() => void) | undefined

        protected visible = false

        async open() {
            if (this.beforeOpen != undefined)
                await this.beforeOpen()
            this.visible = true
            if (this.afterOpen != undefined)
                await this.afterOpen()
        }

        async close() {
            if (this.beforeClose != undefined)
            await this.beforeClose()

            this.visible = false
            if (this.afterClose != undefined)
            await this.afterClose()
        }

        protected getTitle() {
            return this.title ?? this.$translate('confirm')
        }

        protected getCancelText() {
            return this.cancelText ?? this.$translate('cancel')
        }

        protected getConfirmText() {
            return this.confirmText ?? this.$translate('confirm')
        }

        protected async doConfirm() {
            if (this.before != undefined)
            await this.before()
            if (this.confirm != undefined)
                await this.confirm()
            if (this.after != undefined)
            await this.after()
            this.close()
        }

        protected getShowConfirm() {
            return this.showConfirm ?? true
        }

        protected getShowCancel() {
            return this.showCancel ?? true
        }
    }
</script>
