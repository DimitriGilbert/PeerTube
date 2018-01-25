import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SortMeta } from 'primeng/components/common/sortmeta'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'
import { BlacklistedVideo, ResultList } from '../../../../../shared'
import { environment } from '../../../environments/environment'
import { RestExtractor, RestPagination, RestService } from '../rest'
import { Utils } from '../utils'
import { ComponentPagination } from '../rest/component-pagination.model'
import { VideoChannel as VideoChannelServerModel } from '../../../../../shared/models/videos/video-channel.model'
import { VideoChannel } from './video-channel.model'

@Injectable()
export class VideoChannelService {
  private static BASE_CHANNELS_URL = environment.apiUrl + '/api/v1/videos/channels'
  
  constructor (
    private authHttp: HttpClient,
    private restService: RestService,
    private restExtractor: RestExtractor
  ) {}
  
  getChannels (videoPagination: ComponentPagination): Observable<{ channels: VideoChannelServerModel[], totalChannel: number}> {
    const pagination = this.restService.componentPaginationToRestPagination(videoPagination)
    
    let params = new HttpParams()
    params = this.restService.addRestGetParams(params, pagination)
    
    return this.authHttp
      .get(VideoChannelService.BASE_CHANNELS_URL, { params })
      .map(this.extractChannels)
      .catch((res) => this.restExtractor.handleError(res))
  }

  getChannel(id: number): Observable<VideoChannelServerModel>{
    return this.authHttp
      .get(VideoChannelService.BASE_CHANNELS_URL + '/' + id)
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
}
