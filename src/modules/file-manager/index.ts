import { promises as fs } from 'fs'
import path from 'path'
import ConfigMap from '../config-map'

class FileManager {
    public config = new ConfigMap()

    constructor(config: ConfigMap) {
        this.config = config
    }
    
    public async pathExists(path: string) {
        try {
            await fs.access(path)
            return true
        } catch (e) {
            return false
        }
    }
    
    public async createDir(rootPath: string, dirName: string) {
        const dirPath = path.join(rootPath, dirName)

        if (await this.pathExists(dirPath)) throw new Error('Dir already exists')

        await fs.mkdir(dirPath)
        return dirPath
    }

    public async editFile(filePath: string, fileContentArray: string[]) {
        if (!(await this.pathExists(filePath))) throw new Error('Dir does not exist')

        await fs.writeFile(filePath, fileContentArray.join('\n'))
        return filePath
    }

    public async createFile(rootPath: string, fileName: string, fileContentArray: string[] = []) {
        const filePath = path.join(rootPath, fileName)

        if (await this.pathExists(filePath)) throw new Error('Dir already exists')

        await fs.writeFile(filePath, '')

        await this.editFile(filePath, fileContentArray)
        return filePath
    }

    public async initProject() {
        console.log('Creating Project...\n\n')

        const projectPath = this.config.get('project') as string

        if (!(await this.pathExists(projectPath))) await this.createDir(projectPath, '.')

        console.log('Creating Source Folder...')

        const srcPath = await this.createDir(projectPath, 'src')

        console.log('\tSource Folder Created!\n')

        console.log('Creating Other Project Folders/Files...')

        await this.createFile(
            srcPath,
            'index.' + this.config.get('language')!,
            ['console.log("Hello World!")']
        )
    }
}

export default FileManager