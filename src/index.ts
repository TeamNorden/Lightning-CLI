import yargs from 'yargs'
import BoltCLIClient from './modules/client'
import Prompter from './modules/prompter'
import FileManager from './modules/file-manager'

export const client = new BoltCLIClient(FileManager, Prompter)

yargs.version('0.1.0')

yargs
    .scriptName("bolt")
    .usage('$0 <cmd> [args]')
    .commandDir('commands')
    .demandCommand()
    .help()
    .argv
