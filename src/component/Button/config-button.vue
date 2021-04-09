<template>
    <div class="config-button-container">
        <el-button
                :circle="true"
                size="small"
                @click="click"
        >
            <svg-icon name="config"/>
        </el-button>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Vue} from "vue-property-decorator";

    @Component({})
    export default class ConfigButton extends Vue {
        @Emit()
        protected click() {
            //
        }
    }
</script>

<style lang="scss">
    .config-button-container {
        display: inline-block;
        vertical-align: middle;

        .el-button {
            padding: 6px;
            font-size: 16px;
        }
    }

    .config-button-container:not(:first-child) {
        margin-left: 10px;
    }
</style>
