<template>
    <div>
        <span v-if="content">{{content}}</span>
        <span v-else>--</span>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({})
    export default class SpanNullable extends Vue {
        @Prop()
        private content: unknown | null
    }
</script>
