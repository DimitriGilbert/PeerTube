import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationsService } from 'angular2-notifications'
import { AuthService } from '../../core/auth'
import { AbstractVideoChannelList } from '../../shared/video-channel/abstract-video-channel-list'
import { SortField } from '../../shared/video-channel/sort-field.type'
import { VideoChannelService } from '../../shared/video-channel/video-channel.service'

@Component({
  selector: 'my-channels',
  styleUrls: [ '../../shared/video-channel/abstract-video-channel-list.scss' ],
  templateUrl: '../../shared/video-channel/abstract-video-channel-list.html'
})
export class ChannelsBrowseComponent extends AbstractVideoChannelList implements OnInit {
  titlePage = 'Browse channels'
  currentRoute = '/channels/browse'
  sort: SortField = '-createdAt'

  constructor (protected router: Router,
               protected route: ActivatedRoute,
               protected notificationsService: NotificationsService,
               protected authService: AuthService,
               private channelService: VideoChannelService) {
    super()
  }

  ngOnInit () {
    super.ngOnInit()
  }

  getChannelsObservable () {
    return this.channelService.getChannels(this.pagination/*, this.sort*/)
  }
}
