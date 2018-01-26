import { Component, Input } from '@angular/core'
import { VideoChannel } from './video-channel.model'

@Component({
  selector: 'my-video-channel-miniature',
  styleUrls: [ './video-channel-miniature.component.scss' ],
  templateUrl: './video-channel-miniature.component.html'
})
export class VideoChannelMiniatureComponent {
  @Input() channel: VideoChannel
}
