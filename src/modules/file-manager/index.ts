import { promises as fs } from 'fs'
import path from 'path'
import ConfigMap from '../config-map'
import { exec, execSync } from 'child_process'

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

    public async editFile(filePath: string, fileContent: string | string[]) {
        if (!(await this.pathExists(filePath))) throw new Error('Dir does not exist')

        await fs.writeFile(filePath, Array.isArray(fileContent) ? fileContent.join('\n') : fileContent)
        return filePath
    }

    public async createFile(rootPath: string, fileName: string, fileContent: string | string[] = '') {
        const filePath = path.join(rootPath, fileName)

        if (await this.pathExists(filePath)) throw new Error('Dir already exists')

        await fs.writeFile(filePath, '')

        await this.editFile(filePath, fileContent)
        return filePath
    }

    public async initProject() {
        console.log('\nCreating Project...')

        const projectPath = this.config.get('project') as string

        if (!(await this.pathExists(projectPath))) await this.createDir(projectPath, '.')

        console.log('\nCreating Source Folder...')

        const srcPath = await this.createDir(projectPath, 'src')

        console.log('\tSource Folder Created!')

        console.log('\nCreating Other Project Folders/Files...')

        await this.createFile(
            srcPath,
            'index.' + this.config.get('language')!,
            ['console.log("Hello World!")']
        )

        console.log('\tIndex File Created!')

        const pkgJsonTemplatePath = '../../../templates/package-template.json'

        const pkgJsonTemplate = (await import(pkgJsonTemplatePath)).default

        if (this.config.get('language') === 'js') {
            pkgJsonTemplate.main = 'src/index.js'
            pkgJsonTemplate.scripts.start = 'node --experimental-specifier-resolution=node .'
        }

        await this.createFile(srcPath, 'package.json', JSON.stringify(pkgJsonTemplate, null, 2))

        console.log('\tPackage File Created!')

        if (this.config.get('language') === 'ts') {
            const tsConfigTemplatePath = '../../../templates/tsconfig-template.json'

            const tsConfigTemplate = (await import(tsConfigTemplatePath)).default

            await this.createFile(srcPath, 'tsconfig.json', JSON.stringify(tsConfigTemplate, null, 2))

            console.log('\t[TS] TSConfig File Created!')
        }

        const pkgMn = this.config.get('pkgManager')!

        const cmd = pkgMn === 'npm' ? pkgMn + ' i' : pkgMn

        console.log('\nDone! Now you can start by installing the dependencies with `' + cmd + '`')
    }
}

export default FileManager