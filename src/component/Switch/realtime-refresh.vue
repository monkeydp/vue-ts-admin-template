<template>
    <el-switch
            v-model="realtime"
            active-text="实时刷新"
            @change="realtimeChange"
    />
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from "vue-property-decorator";

    @Component({})
    export default class RealtimeRefresh extends Vue {
        @Emit()
        private repeatAction() {
            //
        }

        @Prop()
        private ms!: number | undefined

        private realtime = false
        private realtimeInterval!: NodeJS.Timeout

        private realtimeChange(realtime: boolean) {
            if (realtime) this.enableRealtime()
            else this.disableRealtime()
        }

        private enableRealtime() {
            this.realtimeInterval = setInterval(() => {
                this.repeatAction()
            }, this.ms ?? 1000)
        }

        private disableRealtime() {
            clearInterval(this.realtimeInterval)
        }

        beforeDestroy() {
            this.disableRealtime()
        }
    }
</script>
