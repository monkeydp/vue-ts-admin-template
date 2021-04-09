<template>
    <div>
        <el-dialog
                :visible.sync="visible"
                :title="getTitle()"
                :close-on-click-modal="false"
                :append-to-body="true"
        >
            <span v-if="objName!=undefined">{{$translate('confirm', getConfirmText())}} <strong>{{objName}}</strong>?</span>
            <slot v-else/>
            <span slot="footer">
                <el-button @click="close()">{{$translate(getCancelText())}}</el-button>
                <el-button type="danger" @click="doConfirm">{{$translate(getConfirmText())}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import BaseDialog from "@/component/Dialog/base-dialog.vue";

    @Component({})
    export default class DeleteDialog extends BaseDialog {
        @Prop() objName!: string | undefined
        @Prop() protected cancelText!: string | undefined
        @Prop() protected confirmText!: string | undefined

        protected getCancelText(): string {
            return this.cancelText ?? 'cancel'
        }

        protected getConfirmText(): string {
            return this.confirmText ?? 'confirm'
        }
    }
</script>
