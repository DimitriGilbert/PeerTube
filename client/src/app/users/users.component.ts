import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserService, User } from '@app/shared';
import { Subscription } from 'rxjs/Subscription';
import { error } from 'util';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userId: number
  user: User
  userSubsrciption: Subscription

  constructor (
    protected route: ActivatedRoute,
    protected router: Router,
    protected userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.userId = routeParams['id']
      this.userSubsrciption = this.userService.getUser(this.userId)
        .subscribe(
          user => { this.user = user },
          error => {
            console.error(error)
          }
        )
    })
  }
}
