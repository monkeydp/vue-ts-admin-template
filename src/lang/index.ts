import Vue from 'vue'
import VueI18n from 'vue-i18n'
// element-ui built-in lang
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import elementEsLocale from 'element-ui/lib/locale/lang/es'
import elementJaLocale from 'element-ui/lib/locale/lang/ja'
import elementKoLocale from 'element-ui/lib/locale/lang/ko'
// User defined lang
import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'
import jaLocale from './ja'
import koLocale from './ko'
import {appModule} from "@/store/module/AppModule";
import Translator from "@/lang/Translator";
import {Container} from "typescript-ioc";

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    },
    es: {
        ...esLocale,
        ...elementEsLocale
    },
    ja: {
        ...jaLocale,
        ...elementJaLocale
    },
    ko: {
        ...koLocale,
        ...elementKoLocale
    }
}

export const getLocale = () => {
    const cookieLanguage = appModule.config.language
    if (cookieLanguage) {
        return cookieLanguage
    }

    const language = navigator.language.toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale
        }
    }

    // Default language is english
    return 'en'
}

const i18n = new VueI18n({
    locale: getLocale(),
    messages
})

export default i18n

declare module 'vue/types/vue' {
    interface Vue {
        $translate: typeof Translator.prototype.translate;
    }
}

const translator = Container.get(Translator)

Vue.prototype.$translate = translator.translate
