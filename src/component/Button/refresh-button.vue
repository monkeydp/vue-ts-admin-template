<template>
    <div class="refresh-button-container">
        <el-button
                :circle="true"
                @click="click">
            <svg-icon name="refresh"/>
        </el-button>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Vue} from "vue-property-decorator";

    @Component({})
    export default class RefreshButton extends Vue {
        @Emit()
        protected click() {
            //
        }
    }
</script>

<style lang="scss">
    .refresh-button-container {
        display: inline-block;
        vertical-align: middle;

        .el-button {
            padding: 7px;
        }
    }

    .refresh-button-container:not(:first-child) {
        margin-left: 10px;
    }
</style>
