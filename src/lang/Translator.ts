import {BaseInnerError} from "tools-ts/src/error/InnerError";
import _ from "lodash";
import i18n, {getLocale} from "@/lang/index";
import {Container, Singleton} from "typescript-ioc";

@Singleton
export default abstract class Translator {
    abstract translate: (...keys: string[]) => string
}

class TranslateKeyNotExistError extends BaseInnerError {

    constructor(key: string) {
        super("The translate key `" + key + "` doesn't exist!");
    }
}

class TranslatorImpl implements Translator {

    /**
     * key = "aa.bb.cc"
     * cut once = "bb.cc"
     * cut twice = "cc"
     * cut three times = ""
     */
    private cutKey(key: string, separator = "."): string {
        if (_.isEmpty(key)) return ""
        const arr = key.split(separator)
        const newArr = _.drop(arr)
        return newArr.length == 1 ? newArr[0]
            : newArr.join(separator)
    }

    private recurTranslate(key: string): string {
        if (i18n.te(key))
            return i18n.tc(key)

        const newKey = this.cutKey(key)
        if (_.isEmpty(newKey))
            throw new TranslateKeyNotExistError(key)

        return this.recurTranslate(newKey)
    }

    private recurTranslateDefault(key: string, defaultPrefix = "default."): string {
        const realKey = defaultPrefix + key
        if (i18n.te(realKey))
            return i18n.tc(realKey)

        const newKey = this.cutKey(key)
        if (_.isEmpty(newKey))
            throw new TranslateKeyNotExistError(key)

        return this.recurTranslateDefault(newKey)
    }

    translateOne = (key: string): string => {
        try {
            return this.recurTranslate(key)
        } catch (err) {
            if (err instanceof TranslateKeyNotExistError) {
                try {
                    return this.recurTranslateDefault(key)
                } catch (err) {
                    if (err instanceof TranslateKeyNotExistError) {
                        return key
                    }
                    throw err
                }
            }
            throw err
        }
    }

    translate = (...keys: string[]): string => {
        const values: Array<string> = []
        keys.forEach(key => {
            values.push(this.translateOne(key))
        })
        return values.join(getLocale() == 'zh' ? "" : " ")
    }
}

Container.bind(Translator).to(TranslatorImpl)

export const translator = new TranslatorImpl()
