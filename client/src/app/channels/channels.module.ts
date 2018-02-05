import { NgModule } from '@angular/core'
import { SharedModule } from '../shared'

import { ChannelsRoutingModule } from './channels-routing.module'
import { ChannelsComponent } from './channels.component'
import { ChannelsBrowseComponent } from './channels-list/channels-browse.component'
import { ChannelDetailComponent } from './channel-detail/channel-detail.component'
import { VideoChannelVideosComponent } from '@app/channels/video-channel-videos.component'

@NgModule({
  imports: [
    ChannelsRoutingModule,
    SharedModule
  ],
  declarations: [
    ChannelsComponent,
    ChannelsBrowseComponent,
    ChannelDetailComponent,
    VideoChannelVideosComponent
  ]
})
export class ChannelsModule { }
