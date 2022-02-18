import prompts from 'prompts'
import { string } from 'yargs'

class Prompter<TOptionNames extends string = string> {
    public config = new Map<TOptionNames, unknown>()

    public async input<T extends string = string>(questions: prompts.PromptObject<T>) {
        const res = await prompts<T>(questions)

        return res
    }

    public async init(options: prompts.PromptObject<TOptionNames>[]) {
        for (const option of options) {
            const answer = await this.input(option)

            const optionName = (typeof option.name === 'string' ? option.name : Object.keys(answer)[0]) as TOptionNames
            const optionValue = answer[optionName]

            this.config.set(optionName, optionValue)
        }

        return this.config
    }
}

export default Prompter