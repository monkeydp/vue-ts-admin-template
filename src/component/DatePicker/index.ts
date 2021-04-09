import {DatePicker} from "element-ui";
import { DateUtil } from 'tools-ts/src/date/DateUtil';

export const datePickerOptions = {
    shortcuts: [
        {
            text: '全部',
            onClick(picker: DatePicker) {
                picker.$emit('pick', null)
            },
        },
        {
            text: '今天',
            onClick(picker: DatePicker) {
                const today = DateUtil.startOfDay()
                picker.$emit('pick', today)
            },
        },
        {
            text: '昨天',
            onClick(picker: DatePicker) {
                let yesterday = DateUtil.yesterday()
                yesterday = DateUtil.startOfDay(yesterday)
                picker.$emit('pick', yesterday)
            },
        }
    ],
    disabledDate(date: Date) {
        return date.getTime() > Date.now()
    }
}
