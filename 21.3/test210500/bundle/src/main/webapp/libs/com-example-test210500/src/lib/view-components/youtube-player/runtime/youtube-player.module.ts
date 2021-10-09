import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubePlayerComponent } from './youtube-player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { DynamicScriptLoaderServiceService } from '../../../services/dynamic-service-loader.service';

// This example shows how to consume an Angular module youtube-player here:
// \webapp\libs\com-example-test210500>npm install @angular/youtube-player --save
// This should lead to an entry in the library package.json dependencies, for example:
// "dependencies": {
//     "@angular/youtube-player": "^11.2.10"
// }
@NgModule({
  imports: [CommonModule, YouTubePlayerModule],
  exports: [YoutubePlayerComponent],
  declarations: [YoutubePlayerComponent],
  providers: [DynamicScriptLoaderServiceService],
  entryComponents: [YoutubePlayerComponent]
})
export class YoutubePlayerModule {
}
