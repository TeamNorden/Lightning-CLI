export interface IConfig {
    project: string,
    language: 'js' | 'ts',
    pkgManager: 'npm' | 'yarn'
}

export default class ConfigMap<K extends keyof IConfig = keyof IConfig, V = IConfig[K]> extends Map<K, V> implements IConfig{
    public project!: string
    public language!: 'js' | 'ts'
    public pkgManager!: 'npm' | 'yarn'
}