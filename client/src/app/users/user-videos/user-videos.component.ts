import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationsService } from 'angular2-notifications'
import { AbstractVideoList } from '../../shared/video/abstract-video-list';
import { SortField } from '../../shared/video/sort-field.type';
import { AuthService } from '@app/core';
import { UserService } from '../../shared';
import { User } from '@app/shared/users';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-user-videos-list',
  styleUrls: [ '../../shared/video/abstract-video-list.scss' ],
  templateUrl: '../../shared/video/abstract-video-list.html'
})
export class UserVideosComponent extends AbstractVideoList implements OnInit {
  titlePage = 'User\'s videos'
  currentRoute = '/user/:id/videos'
  sort: SortField = '-createdAt'
  userId: number

  constructor (
    protected router: Router,
    protected route: ActivatedRoute,
    protected notificationsService: NotificationsService,
    protected authService: AuthService,
    private userService: UserService
  ) {
    super()
  }

  ngOnInit () {
    this.route.parent.params.subscribe(routeParams => {
      this.userId = routeParams['id']
    })
    super.ngOnInit()
  }

  getVideosObservable () {
    return this.userService.getUserVideos(this.userId)
  }
}
