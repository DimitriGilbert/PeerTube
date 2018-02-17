import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './users.component';
import { UserChannelsComponent } from './user-channels/user-channels.component';
import { UserVideosComponent } from './user-videos/user-videos.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [UserDetailComponent, UsersComponent, UserChannelsComponent, UserVideosComponent]
})
export class UsersModule { }
