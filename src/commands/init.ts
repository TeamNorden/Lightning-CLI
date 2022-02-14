import { CommandBuilder } from 'yargs'
import process from 'process'
import path from 'path'
import Prompter from '../modules/prompter'

export const command = 'init'
export const desc = 'Create a ltn-cli.ts file'

export const builder: CommandBuilder = {
    dir: {
        desc: 'The directory where the file will be created [default: \'.\']',
        default: '.',
        type: 'string',
    }
}


export const handler = async (argv: { dir: string }) => {
    if (!argv.dir || argv.dir === '.') {
        const options = await (new Prompter<'test'>([{
            type: 'text',
            name: 'test',
            message: 'Type something'
        }])).init()

        console.log(options)
    }
}