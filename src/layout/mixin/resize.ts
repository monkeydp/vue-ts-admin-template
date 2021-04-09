import { Component, Vue, Watch } from 'vue-property-decorator'
import {appModule, DeviceType} from '@/store/module/AppModule'

const WIDTH = 992 // refer to Bootstrap's responsive design

@Component({
    name: 'ResizeMixin'
})
export default class extends Vue {
    get device() {
        return appModule.config.device
    }

    get sidebar() {
        return appModule.sidebar
    }

    @Watch('$route')
    private onRouteChange() {
        if (this.device === DeviceType.MOBILE && this.sidebar.opened) {
            appModule.closeSidebar(false)
        }
    }

    beforeMount() {
        window.addEventListener('resize', this.resizeHandler)
    }

    mounted() {
        const isMobile = this.isMobile()
        if (isMobile) {
            appModule.toggleDevice(DeviceType.MOBILE)
            appModule.closeSidebar(true)
        }
    }

    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler)
    }

    private isMobile() {
        const rect = document.body.getBoundingClientRect()
        return rect.width - 1 < WIDTH
    }

    private resizeHandler() {
        if (!document.hidden) {
            const isMobile = this.isMobile()
            appModule.toggleDevice(isMobile ? DeviceType.MOBILE : DeviceType.DESKTOP)
            if (isMobile) {
                appModule.closeSidebar(true)
            }
        }
    }
}
