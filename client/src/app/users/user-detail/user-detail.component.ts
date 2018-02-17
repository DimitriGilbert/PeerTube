import { Component, OnInit, Input } from '@angular/core'
import { User, UserService } from '@app/shared'
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router'
import { UsersComponent } from '@app/users/users.component'

@Component({
  selector: 'my-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends UsersComponent implements OnInit {

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected userService: UserService
  ) {
    super(
      route,
      router,
      userService
    );
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
