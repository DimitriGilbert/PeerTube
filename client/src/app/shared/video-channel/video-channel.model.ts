import { VideoChannel as VideoChannelServerModel } from '../../../../../shared/models/videos/video-channel.model'
import { Avatar } from '../../../../../shared/models/avatars/avatar.model'
import { Video as VideoServerModel } from '../../../../../shared/models/videos/video.model'
import { Video } from '../video/video.model'
import { getAbsoluteAPIUrl } from '@app/shared/misc/utils'

export class VideoChannel implements VideoChannelServerModel {
  id: number
  uuid: string
  url: string
  name: string
  host: string
  followingCount: number
  followersCount: number
  createdAt: Date
  updatedAt: Date
  avatar: Avatar
  displayName: string
  description: string
  isLocal: boolean
  owner?: {
    name: string
    uuid: string
  }
  videos?: VideoServerModel[]

  constructor (hash: VideoChannelServerModel) {
    this.id = hash.id
    this.uuid = hash.uuid
    this.url = hash.url
    this.name = hash.name
    this.host = hash.host
    this.followingCount = hash.followingCount
    this.followersCount = hash.followersCount
    this.createdAt = new Date(hash.createdAt.toString());
    this.updatedAt = new Date(hash.updatedAt.toString());
    this.avatar = hash.avatar
    this.displayName = hash.displayName
    this.description = hash.description
    this.isLocal = hash.isLocal
    
    if (hash.owner !== undefined
      && hash.owner !== null
    ) {
      this.owner = {
        name:'',
        uuid:''
      }

      if (hash.owner.name !== undefined
        && hash.owner.name !== null
      ) {
        this.owner.name = hash.owner.name
      }

      if (hash.owner.uuid !== undefined
        && hash.owner.uuid !== null
      ) {
        this.owner.uuid = hash.owner.uuid
      }
    }

    this.videos = []
    if (hash.videos !== undefined
      && hash.videos !== null
      && hash.videos.length > 0
    ) {
      for (const video of hash.videos) {
        this.videos.push(new Video(video))
      }
    }
  }

  getAvatarPath (): string {
    const absoluteAPIUrl = getAbsoluteAPIUrl()

    if (this.avatar) return absoluteAPIUrl + this.avatar.path

    return window.location.origin + '/client/assets/images/default-avatar.png'
  }
}