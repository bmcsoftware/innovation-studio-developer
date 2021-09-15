import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YoutubePlayerDesignComponent } from './youtube-player-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [YoutubePlayerDesignComponent],
  entryComponents: [YoutubePlayerDesignComponent]
})
export class YoutubePlayerDesignModule {
}
