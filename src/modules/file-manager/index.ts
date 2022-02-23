import fs from 'fs'
import path from 'path'
import ConfigMap from '../config-map'

class FileManager {
    public config = new ConfigMap()

    constructor(config: ConfigMap) {
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