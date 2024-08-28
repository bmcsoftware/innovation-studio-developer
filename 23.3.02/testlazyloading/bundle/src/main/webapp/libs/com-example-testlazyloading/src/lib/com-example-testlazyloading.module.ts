import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxLocalizationService } from '@helix/platform/shared/api';
import * as defaultApplicationStrings from './i18n/localized-strings.json';
import { LabelLazyLoadedRegistrationModule } from './view-components/label-lazy-loaded/label-lazy-loaded-registration.module';
import { LazyLoadedActionActionModule } from './actions/lazy-loaded-action/lazy-loaded-action-action.module';

@NgModule({
  imports: [
    CommonModule,
    // View Component.
    LabelLazyLoadedRegistrationModule,
    // View Action.
    LazyLoadedActionActionModule
  ]
})
export class ComExampleTestlazyloadingModule {
  constructor(private rxLocalizationService: RxLocalizationService) {
    this.rxLocalizationService.setDefaultApplicationStrings(defaultApplicationStrings['default']);
  }
}
