import { CommandBuilder } from 'yargs'
import process from 'process'
import path from 'path'
import fs from 'fs'
import { client } from '../index'

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
    const dirPath = path.join(process.cwd(), argv.dir)

    client.fileManager.createFile(dirPath, 'bolt-cli.ts', [
        'export default {',
        '   commandsDir: \'commands\',',
        '   eventsDir: \'events\'',
        '}'
    ])

    console.log('File made!')
}