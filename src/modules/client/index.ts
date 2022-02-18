import FileManager from '../file-manager'
import Prompter from '../prompter'
import { Class } from 'type-fest'

class BoltCLIClient {
    public fileManager: FileManager
    public prompter: Prompter

    constructor(FileManagerClass: Class<FileManager>, PrompterClass: Class<Prompter>) {
        this.fileManager = new FileManagerClass()
        this.prompter = new PrompterClass()
    }

    start() {
        
    }
}

export default BoltCLIClient