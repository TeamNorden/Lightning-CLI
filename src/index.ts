import yargs from 'yargs'
import BoltCLIClient from './modules/client'
import Prompter from './modules/prompter'
import FileManager from './modules/file-manager'

export const client = new BoltCLIClient(FileManager, Prompter)

;(async () => {
    (await client.build()).argv
})()
