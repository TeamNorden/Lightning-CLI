export interface IConfig {
    project: string,
    language: 'js' | 'ts',
    pkgManager: 'npm' | 'yarn'
}

// Doesnt really have full typings. Will be worked on later
export default class ConfigMap<K extends keyof IConfig = keyof IConfig, V = IConfig[K]> extends Map<K, V> { }