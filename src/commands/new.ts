import { client } from '../index'
import Prompter from '../modules/prompter'
import { IConfig } from '../modules/config-map'

export const command = 'new'
export const desc = 'Create a new Lightning Project'


export const handler = async () => {
    const prompter = new Prompter<keyof IConfig>()

    await prompter.init([{
        type: 'text',
        name: 'project',
        message: 'What do you want your project folder to be named? (type . for current directory as project)'
    }, {
        type: 'select',
        name: 'language',
        message: 'What language do you want to use for your project?',
        choices: [{
            title: 'Typescript',
            value: 'ts',
            selected: true
        }, {
            title: 'Javascript',
            value: 'js'
        }]
    }])

    client.fileManager.config = prompter.config
}