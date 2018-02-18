import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'
import { UsersComponent } from './users.component'
import { UserDetailComponent } from './user-detail/user-detail.component'
import { UserVideosComponent } from './user-videos/user-videos.component'
import { UserChannelsComponent } from './user-channels/user-channels.component'

const routes: Routes = [
  {
    path: 'users/:id',
    component: UsersComponent,
    canActivateChild: [ MetaGuard ],
    children: [
      {
        path: 'videos',
        component: UserVideosComponent,
        data: {
          meta: {
            title: 'User videos'
          }
        }
      },
      {
        path: 'channels',
        component: UserChannelsComponent,
        data: {
          meta: {
            title: 'User channels'
          }
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
