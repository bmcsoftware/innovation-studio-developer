import { Component, Input } from '@angular/core';
import { YoutubePlayerDesignModel } from './youtube-player-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-youtube-player-design',
  styleUrls: ['./youtube-player-design.scss'],
  templateUrl: './youtube-player-design.component.html'
})
export class YoutubePlayerDesignComponent {
  @Input()
  model: YoutubePlayerDesignModel;
}
