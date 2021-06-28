import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import ElementUI from 'element-ui'
import i18n from '@/lang'
import SvgIcon from 'vue-svgicon'
import 'normalize.css'
import '@/style/element-variables.scss'
import '@/style/vue-json-pretty.scss'
import '@/style/index.scss'
import '@/icon/components'
import {appModule} from '@/store/module/AppModule';
import '@/error/ErrorHandler'
import '@/util/ElToast'

Vue.config.productionTip = false

Vue.use(ElementUI, {
    size: appModule.config.size, // Set element-ui default size
    i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.use(SvgIcon, {
    tagName: 'svg-icon',
    defaultWidth: '1em',
    defaultHeight: '1em',
})

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
