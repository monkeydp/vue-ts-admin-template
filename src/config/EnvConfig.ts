class EnvConfig {
    private env = process.env
    readonly backendUrl: string = this.env.VUE_APP_BACKEND_URL as string
}

const envconfig = new EnvConfig()
export default envconfig
