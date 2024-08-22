import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { DynamicScriptLoaderServiceService } from '../../../services/dynamic-service-loader.service';
import { distinctUntilChanged, pluck, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { RxViewComponent } from '@helix/platform/view/api';

// This example shows how to consume an Angular module youtube-player here:
// \webapp\libs\com-example-test210500>npm install @angular/youtube-player --save
// This should lead to an entry in the library package.json dependencies, for example:
// "dependencies": {
//     "@angular/youtube-player": "^11.2.10"
// }
@Component({
  selector: 'com-example-test210500-com-example-test210500-youtube-player',
  templateUrl: './youtube-player.component.html',
  standalone: true,
  imports: [CommonModule, YouTubePlayerModule]
})
@RxViewComponent({
  name: 'comExampleTest210500YoutubePlayer'
})
export class YoutubePlayerComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  youtubePlayer: string;
  videoId: string;

  constructor(private dynamicScriptLoaderServiceService: DynamicScriptLoaderServiceService) {
    super();
  }

  ngOnInit() {
    // We need to load Youtube apis, if needed as we can have multiple view components
    // in the same view.
    // Due to YouTube security measures some videos might not load with the "Video unavailable"
    // error message if the hosting domain has an IP address and not a domain name with SSL enabled.
    // It should however work fine if the domain is "localhost".

    this.dynamicScriptLoaderServiceService.loadScriptByUrl('https://www.youtube.com/iframe_api', 'youtube').then((result) => {
      // We subscribe to the "videoId" input parameter changes.
      this.config.pipe(
        pluck('videoId'),
        distinctUntilChanged(),
        takeUntil(this.destroyed$)
      ).subscribe((videoId: string) => {
        this.videoId = videoId;
      });
    });
  }
}
