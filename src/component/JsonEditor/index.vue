<template>
    <div class="json-editor">
        <textarea ref="textarea"/>
    </div>
</template>

<script lang="ts">
    import CodeMirror, {Editor} from 'codemirror'
    import 'codemirror/addon/lint/lint.css'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/rubyblue.css'
    import 'codemirror/mode/javascript/javascript'
    import 'codemirror/addon/lint/lint'
    import 'codemirror/addon/lint/json-lint'
    import "codemirror/addon/fold/foldgutter.css"
    import 'codemirror/addon/fold/foldcode.js';
    import 'codemirror/addon/fold/foldgutter.js';
    import 'codemirror/addon/fold/xml-fold.js';
    import 'codemirror/addon/fold/indent-fold.js';
    import "codemirror/addon/fold/brace-fold";
    import 'codemirror/addon/fold/markdown-fold.js';
    import 'codemirror/addon/fold/comment-fold.js';
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator'

    // HACK: have to use script-loader to load jsonlint
    require('script-loader!jsonlint')

    @Component({
        name: 'JsonEditor'
    })
    export default class extends Vue {
        @Prop({required: true}) private value!: unknown

        private get content(): string {
            if (typeof this.value == 'string')
                return this.value as string
            else return JSON.stringify(this.value, null, 2)
        }

        private jsonEditor?: Editor

        @Watch('value')
        private onValueChange(value: string) {
            if (this.jsonEditor) {
                const editorValue = this.jsonEditor.getValue()
                if (value !== editorValue) {
                    this.jsonEditor.setValue(this.content)
                }
            }
        }

        mounted() {
            this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea as HTMLTextAreaElement, {
                lineNumbers: true,
                mode: 'application/json',
                theme: 'rubyblue',
                lint: true,
                //代码折叠
                lineWrapping: true,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"]
            })

            this.jsonEditor.setValue(this.content)
            this.jsonEditor.on('change', (editor: Editor) => {
                this.$emit('changed', editor.getValue())
                this.$emit('input', editor.getValue())
            })
        }

        public setValue(value: string) {
            if (this.jsonEditor) {
                this.jsonEditor.setValue(value)
            }
        }

        public getValue() {
            if (this.jsonEditor) {
                return this.jsonEditor.getValue()
            }
            return ''
        }
    }
</script>

<style lang="scss">
    .CodeMirror {
        height: auto;
        min-height: 300px;
        font-family: inherit;
    }

    .CodeMirror-scroll {
        min-height: 300px;
    }

    .cm span.cm-string {
        color: #F08047;
    }
</style>

<style lang="scss" scoped>
    .json-editor {
        height: 100%;
        position: relative;
    }
</style>
