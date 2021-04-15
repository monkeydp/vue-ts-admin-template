<template>
    <div>
        <el-dialog :visible.sync="visible" :title="title" :close-on-click-modal="false">
            <slot/>
            <span slot="footer">
                <el-button @click="close()" v-if="getShowCancel()">{{getCancelText()}}</el-button>
                <el-button
                        type="primary"
                        @click="doConfirm"
                        v-if="getShowConfirm()"
                >{{getConfirmText()}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Prop} from "vue-property-decorator";
    import BaseDialog from "@/component/Dialog/base-dialog.vue";

    @Component({})
    export default class ConfirmDialog extends BaseDialog {
        @Prop() protected cancelText!: string | undefined
        @Prop() protected confirmText!: string | undefined
    }
</script>
