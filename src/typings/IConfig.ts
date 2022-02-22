export default interface IConfig {
    project: string,
    language: 'js' | 'ts',
    pkgManager: 'npm' | 'yarn'
}