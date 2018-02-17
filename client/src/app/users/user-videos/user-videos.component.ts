import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationsService } from 'angular2-notifications'
import { AbstractVideoList } from '../../shared/video/abstract-video-list';
import { SortField } from '../../shared/video/sort-field.type';
import { AuthService } from '@app/core';
import { UserService } from '../../shared';

@Component({
  selector: 'my-user-videos-list',
  styleUrls: [ '../../shared/video/abstract-video-list.scss' ],
  templateUrl: '../../shared/video/abstract-video-list.html'
})
export class UserVideosComponent extends AbstractVideoList implements OnInit {
  titlePage = 'User\'s videos'
  currentRoute = '/user/:id/videos'
  sort: SortField = '-createdAt'

  @Input()
  userId: number

  constructor (
    protected router: Router,
    protected route: ActivatedRoute,
    protected notificationsService: NotificationsService,
    protected authService: AuthService,
    private UserService: UserService
  ) {
    super()
  }

  ngOnInit () {
    super.ngOnInit()
  }

  getVideosObservable () {
    return this.UserService.getUserVideos(this.userId)
  }
}
