import FileManager from '../file-manager'
import Prompter from '../prompter'
import { Class } from 'type-fest'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { readdirSync } from 'fs'
import path from 'path'
import ConfigMap from '../config-map'

class BoltCLIClient {
    public fileManager: FileManager
    public prompter: Prompter

    constructor(FileManagerClass: Class<FileManager>, PrompterClass: Class<Prompter>) {
        this.fileManager = new FileManagerClass(new ConfigMap())
        this.prompter = new PrompterClass()
    }

    async build() {
        const cli = yargs(hideBin(process.argv)).scriptName('bolt')

        for (const commandFile of readdirSync(path.join(__dirname, '../../commands'))
                .filter(f => f.endsWith('.js'))
            ) {
            const command = await import(path.join(__dirname, '../../commands', commandFile))

            yargs.command(command)
        }

        const pkgJson = '../../../package.json'

        cli
            .version((await import(pkgJson)).version)
            .help()
            .demandCommand()
            .usage('$0 <cmd> [args]')

        return cli
    }
}

export default BoltCLIClient