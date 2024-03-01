import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { YoutubePlayerComponent } from './runtime';
import { YoutubePlayerDesignComponent, YoutubePlayerDesignModel } from './design';

// This component embeds a YouTube video leveraging the
// official Angular module.
// Source:
// https://jinalshah999.medium.com/official-angular-components-google-map-youtube-player-clipboard-67f04531ffc4
@NgModule()
export class YoutubePlayerRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500YoutubePlayer',
      name: 'Youtube Player',
      icon: 'video_square',
      group: 'Test 21.05.00',
      component: YoutubePlayerComponent,
      properties: [
        {
          name: 'videoId',
          type: ViewComponentPropertyType.String,
          enableExpressionEvaluation: true
        }
      ],
      designComponent: YoutubePlayerDesignComponent,
      designComponentModel: YoutubePlayerDesignModel
    });
  }
}
