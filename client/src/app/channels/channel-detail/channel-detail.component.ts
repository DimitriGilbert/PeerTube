import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'

import { VideoChannelService } from '@app/shared'
import { VideoChannel } from '@app/shared/video-channel/video-channel.model'
import { Video } from '@app/shared/video/video.model'
import { error } from 'util'
import { MarkdownService } from '@app/videos/shared'

@Component({
  selector: 'my-channel-detail',
  templateUrl: './channel-detail.component.html',
  styleUrls: ['./channel-detail.component.scss']
})
export class ChannelDetailComponent implements OnInit {
  descriptionHTML: string;
  channelNotFound: boolean
  channel: VideoChannel
  channelVideosObservable: { videos: Video[], totalVideos: number}
  private paramsSub: Subscription

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private channelService: VideoChannelService,
    private markdownService: MarkdownService
  ) { }

  ngOnInit () {
    this.paramsSub = this.route.params.subscribe(routeParams => {
      let id = routeParams['id']

      this.channelService.getChannel(id).subscribe(
        channel => {
          this.channel = channel
          if (this.channel.description) {
            this.descriptionHTML = this.markdownService.markdownToHTML(this.channel.description)
          }
        },
        error => {
          this.channelNotFound = true
          console.error(error)
        }
      )
    })

  }

  getAvatarUrl () {
    if (this.channel) {
      return this.channel.getAvatarPath()
    }
    return ''
  }

}