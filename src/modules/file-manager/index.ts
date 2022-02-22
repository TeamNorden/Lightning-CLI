import fs from 'fs'
import path from 'path'
import IConfig from '../../typings/IConfig'

class FileManager {
    public config: Map<string, IConfig>

    constructor(config: Map<string, IConfig>) {
        this.config = config
    }

    public createDir(rootPath: string, dirName: string) {
        const dirPath = path.join(rootPath, dirName)

        if (fs.existsSync(dirPath)) throw new Error('Dir already exists')

        fs.mkdirSync(dirPath)
    }

    public editFile(filePath: string, fileContentArray: string[]) {
        if (!fs.existsSync(filePath)) throw new Error('Dir does not exist')

        fs.writeFileSync(filePath, fileContentArray.join('\n'))
    }

    public createFile(rootPath: string, fileName: string, fileContentArray: string[] = []) {
        const filePath = path.join(rootPath, fileName)

        if (fs.existsSync(filePath)) throw new Error('Dir already exists')

        fs.writeFileSync(filePath, '')

        this.editFile(filePath, fileContentArray)
    }

    public initProject() {
        console.log(process.cwd())
    }
}

export default FileManager