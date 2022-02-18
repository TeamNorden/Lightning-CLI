import { CommandBuilder } from 'yargs'
import process from 'process'
import path from 'path'
import fs from 'fs'

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

    const filePath = path.join(dirPath, 'bolt-cli.ts')

    if (fs.existsSync(filePath)) return console.log('file already exists')

    fs.writeFileSync(filePath, '')

    console.log('File made!')
}