import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationsService } from 'angular2-notifications'
import { AuthService } from '../../core/auth'
import { AbstractVideoChannelList } from '../../shared/video-channel/abstract-video-channel-list'
import { SortField } from '../../shared/video-channel/sort-field.type'
import { UserService } from '../../shared/users/user.service'

@Component({
  selector: 'my-user-channels',
  styleUrls: [ '../../shared/video-channel/abstract-video-channel-list.scss' ],
  templateUrl: '../../shared/video-channel/abstract-video-channel-list.html'
})
export class UserChannelsComponent extends AbstractVideoChannelList implements OnInit {
  titlePage = 'Browse channels'
  currentRoute = '/user/:id/channels'
  sort: SortField = '-createdAt'
  userId: number

  constructor (protected router: Router,
               protected route: ActivatedRoute,
               protected notificationsService: NotificationsService,
               protected authService: AuthService,
               private userService: UserService) {
    super()
  }

  ngOnInit () {
    this.route.parent.params.subscribe(routeParams => {
      this.userId = routeParams['id']
    })
    super.ngOnInit()
  }

  getChannelsObservable () {
    return this.userService.getUserChannels(this.userId/*, this.sort*/)
  }
}
