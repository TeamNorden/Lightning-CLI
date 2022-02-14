import prompts from 'prompts'
import { string } from 'yargs'

class Prompter<TOptionNames extends string = string> {
    public options: prompts.PromptObject<TOptionNames>[]

    public config = new Map<TOptionNames, unknown>()

    constructor(options: prompts.PromptObject<TOptionNames>[]) {
        this.options = options
    }

    public async input<T extends string = string>(questions: prompts.PromptObject<T>) {
        const res = await prompts<T>(questions)

        return res
    }

    public async init() {
        for (const option of this.options) {
            const answer = await this.input(option)

            const optionName = (typeof option.name === 'string' ? option.name : Object.keys(answer)[0]) as TOptionNames
            const optionValue = answer[optionName]

            this.config.set(optionName, optionValue)
        }

        return this.config
    }
}

export default Prompter