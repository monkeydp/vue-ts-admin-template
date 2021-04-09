<template>
    <el-button
            :circle="true"
            size="small"
            icon="el-icon-search"
            @click="click"
    />
</template>

<script lang="ts">
    import {Component, Emit, Vue} from "vue-property-decorator";

    @Component({})
    export default class SearchButton extends Vue {
        @Emit()
        protected click() {
            //
        }
    }
</script>
