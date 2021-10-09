import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { YoutubePlayerComponent, YoutubePlayerModule } from './runtime';
import { YoutubePlayerDesignComponent, YoutubePlayerDesignModel, YoutubePlayerDesignModule } from './design';

// This component embeds a YouTube video leveraging the
// official Angular module.
// Source:
// https://jinalshah999.medium.com/official-angular-components-google-map-youtube-player-clipboard-67f04531ffc4
@NgModule({
  imports: [YoutubePlayerDesignModule, YoutubePlayerModule]
})
export class YoutubePlayerRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500YoutubePlayer',
      name: 'Youtube Player',
      icon: 'video_square',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(YoutubePlayerComponent),
      properties: [
        {
          name: 'videoId',
          type: ViewComponentPropertyType.String,
          enableExpressionEvaluation: true
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(YoutubePlayerDesignComponent),
      designComponentModel: YoutubePlayerDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
