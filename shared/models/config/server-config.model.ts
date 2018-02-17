export interface ServerConfig {
  serverVersion: string

  instance: {
    name: string
  }

  signup: {
    allowed: boolean
  }

  transcoding: {
    enabledResolutions: number[]
  }

  avatar: {
    file: {
      size: {
        max: number
      },
      extensions: string[]
    }
  }

  video: {
    image: {
      size: {
        max: number
      }
      extensions: string[]
    },
    file: {
      extensions: string[]
    }
  }
}
