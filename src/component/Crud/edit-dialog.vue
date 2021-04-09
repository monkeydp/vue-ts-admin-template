<template>
    <div>
        <el-dialog
                :visible.sync="visible"
                :title="title"
                :close-on-click-modal="false"
                :append-to-body="true"
        >
            <slot/>
            <span slot="footer">
                <el-button @click="close()">{{$translate('cancel')}}</el-button>
                <el-button type="primary" @click="doConfirm">{{$translate('confirm')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator";
    import BaseDialog from "@/component/Dialog/base-dialog.vue";

    @Component({})
    export default class EditDialog extends BaseDialog {
    }
</script>
