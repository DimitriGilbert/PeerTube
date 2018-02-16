import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SortMeta } from 'primeng/components/common/sortmeta'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'
import { BlacklistedVideo, ResultList } from '../../../../../shared'
import { environment } from '../../../environments/environment'
import { RestExtractor, RestPagination, RestService } from '../rest'
import { ComponentPagination } from '../rest/component-pagination.model'
import { VideoChannel as VideoChannelServerModel } from '../../../../../shared/models/videos/video-channel.model'
import { Video as VideoServerModel } from '../../../../../shared/models/videos/video.model'
import { VideoChannel } from './video-channel.model'
import { Video } from '../video/video.model'

@Injectable()
export class VideoChannelService {
  private static BASE_CHANNELS_URL = environment.apiUrl + '/api/v1/videos/channels'

  constructor (
    private authHttp: HttpClient,
    private restService: RestService,
    private restExtractor: RestExtractor
  ) {}

  getChannels (videoChannelPagination: ComponentPagination): Observable<{ channels: VideoChannel[], totalChannels: number}> {
    const pagination = this.restService.componentPaginationToRestPagination(videoChannelPagination)

    let params = new HttpParams()
    params = this.restService.addRestGetParams(params, pagination)

    return this.authHttp
      .get(VideoChannelService.BASE_CHANNELS_URL, { params })
      .map(this.extractChannels)
      .catch((res) => this.restExtractor.handleError(res))
  }

  getChannel (id: number): Observable< VideoChannel > {
    return this.authHttp
      .get<VideoChannelServerModel>(VideoChannelService.BASE_CHANNELS_URL + '/' + id)
      .map(channelHash => new VideoChannel(channelHash))
      .catch((res) => this.restExtractor.handleError(res))
  }

  getVideos (channelId: number, videoChannelVideoPagination: ComponentPagination): Observable<{ videos: Video[], totalVideos: number }> {
    const pagination = this.restService.componentPaginationToRestPagination(videoChannelVideoPagination)

    let params = new HttpParams()
    params = this.restService.addRestGetParams(params, pagination)

    return this.authHttp
      .get(VideoChannelService.BASE_CHANNELS_URL + '/' + channelId + '/videos', { params })
      .map(this.extractVideos)
      .catch((res) => this.restExtractor.handleError(res))
  }

  private extractChannels (result: ResultList<VideoChannelServerModel>) {
    const videoChannelsJson = result.data
    const totalChannels = result.total
    const channels = []

    for (const videoChannelJson of videoChannelsJson) {
      channels.push(new VideoChannel(videoChannelJson))
    }

    return { channels, totalChannels }
  }

  private extractVideos (result: ResultList<Video>) {
    const videosJson = result.data
    const totalVideos = result.total
    const videos = []

    for (const videoJson of videosJson) {
      videos.push(new Video(videoJson))
    }

    return { videos, totalVideos }
  }
}
