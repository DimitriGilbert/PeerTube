import { Component, OnInit, Input } from '@angular/core'
import { User, UserService } from '@app/shared'
import { Subscription } from 'rxjs/Subscription'
import { Router, ActivatedRoute } from '@angular/router'
import { UsersComponent } from '@app/users/users.component'

@Component({
  selector: 'my-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input()
  userId: number
  user: User
  userSubsrciption: Subscription

  constructor (
    protected route: ActivatedRoute,
    protected router: Router,
    protected userService: UserService
  ) {}

  ngOnInit () {
    this.userSubsrciption = this.userService.getUser(this.userId)
      .subscribe(
        user => { this.user = user },
        error => {
          console.error(error)
        }
      )

  }

  public getAvatarUrl () {
    if (this.user) {
      return this.user.getAvatarUrl()
    }
  }

}
