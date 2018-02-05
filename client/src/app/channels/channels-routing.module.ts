import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'
import { ChannelsComponent } from '@app/channels/channels.component'
import { ChannelsBrowseComponent } from '@app/channels/channels-list/channels-browse.component'
import { ChannelDetailComponent } from '@app/channels/channel-detail/channel-detail.component'

const channelsRoute: Routes = [
  {
    path: 'channels',
    component: ChannelsComponent,
    canActivateChild: [ MetaGuard ],
    children: [
      {
        path: 'browse',
        component: ChannelsBrowseComponent,
        data: {
          meta: {
            title: 'Browse channels'
          }
        }
      },
      {
        path: ':id/detail',
        component: ChannelDetailComponent,
        data: {
          meta: {
            title: 'Browse channels'
          }
        }
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(channelsRoute)],
  exports: [RouterModule]
})
export class ChannelsRoutingModule { }
