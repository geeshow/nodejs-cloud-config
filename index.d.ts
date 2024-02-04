export default function loadEnv(): Promise<void>;
declare function getCloudConfigFilenameByNodeEnv(): string;
declare function getTypedConfig(cloudConfigFilePath: string): {
    type: string;
    param: {
        url: string;
    } | {
        token: string;
        owner: string;
        repo: string;
        path: string;
    };
};
declare function setEnvVariables(envVariables: any): void;
export { loadEnv, setEnvVariables, getCloudConfigFilenameByNodeEnv, getTypedConfig };
