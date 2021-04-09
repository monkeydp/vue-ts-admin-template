<template>
    <div class="info-dialog">
        <el-dialog :visible.sync="visible" :title="title" :close-on-click-modal="false">
            <slot/>
            <span slot="footer">
                <el-button type="primary" @click="close">{{$translate('dialog.close')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator";
    import BaseDialog from "@/component/Dialog/base-dialog.vue";

    @Component({})
    export default class InfoDialog extends BaseDialog {
    }
</script>

<style lang="scss">
    .info-dialog {
        .el-dialog {
            .el-form {
                .el-form-item__label{
                    opacity: 0.5;
                }
                .el-form-item {
                    width: 100%;
                }
            }
        }
    }
</style>
