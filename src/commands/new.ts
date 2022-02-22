import { CommandBuilder } from 'yargs'
import process from 'process'
import path from 'path'
import fs from 'fs'
import { client } from '../index'
import Prompter from '../modules/prompter'

export const command = 'new'
export const desc = 'Create a new Lightning Project'


export const handler = async () => {
    const prompter = new Prompter()

    await prompter.init([{
        type: 'text',
        name: 'Project',
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

    console.log(prompter.config)
}