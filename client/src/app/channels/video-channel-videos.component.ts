import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationsService } from 'angular2-notifications'
import { AuthService } from '../core/auth'
import { AbstractVideoList } from '../shared/video/abstract-video-list'
import { SortField } from '../shared/video/sort-field.type'
import { VideoChannelService } from '../shared/video-channel/video-channel.service'

@Component({
  selector: 'my-video-channel-videos',
  styleUrls: [ '../shared/video/abstract-video-list.scss' ],
  templateUrl: '../shared/video/abstract-video-list.html'
})
export class VideoChannelVideosComponent extends AbstractVideoList implements OnInit {
  titlePage = 'Channel\'s videos'
  currentRoute = '/videos/channels/:id/videos'
  sort: SortField = '-createdAt'

  @Input()
  channelId: number

  constructor (protected router: Router,
               protected route: ActivatedRoute,
               protected notificationsService: NotificationsService,
               protected authService: AuthService,
               private videoChannelService: VideoChannelService) {
    super()
  }

  ngOnInit () {
    super.ngOnInit()
  }

  getVideosObservable () {
    return this.videoChannelService.getVideos(this.channelId, this.pagination)
  }
}
