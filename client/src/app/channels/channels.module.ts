import { NgModule } from '@angular/core';
import { SharedModule } from '../shared'
// import { CommonModule } from '@angular/common';

import { ChannelsRoutingModule } from './channels-routing.module';
import { ChannelsComponent } from './channels.component';
import { ChannelsBrowseComponent } from './channels-list/channels-browse.component';

@NgModule({
  imports: [
    ChannelsRoutingModule,
    SharedModule
  ],
  declarations: [
    ChannelsComponent,
    ChannelsBrowseComponent
  ]
})
export class ChannelsModule { }
