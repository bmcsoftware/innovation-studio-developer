import { Component, Input } from '@angular/core';
import { YoutubePlayerDesignModel } from './youtube-player-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-youtube-player-design',
  styleUrls: ['./youtube-player-design.scss'],
  templateUrl: './youtube-player-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class YoutubePlayerDesignComponent {
  @Input()
  model: YoutubePlayerDesignModel;
}
