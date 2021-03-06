import { client } from '../index'
import Prompter from '../modules/prompter'
import { IConfig } from '../modules/config-map'
import path from 'path'

export const command = 'new'
export const desc = 'Create a new Lightning Project'

export const handler = async () => {
    const prompter = new Prompter<keyof IConfig>()

    await prompter.init([{
        type: 'text',
        name: 'project',
        message: 'What do you want your project folder to be named? (type . for current directory as project)',
        format: val => path.join(process.cwd(), val)
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
    }, {
        type: 'select',
        name: 'pkgManager',
        message: 'What package manager are you using?',
        choices: [{
            title: 'npm',
            value: 'npm',
            selected: true
        }, {
            title: 'yarn',
            value: 'yarn'
        }]
    }])

    client.fileManager.config = prompter.config

    await client.fileManager.initProject()
}