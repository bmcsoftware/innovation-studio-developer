import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IUserPreferencesColorObjects, IUserPreferencesParameters } from '../design/user-preferences.interface';
import { USER_PREFERENCES_OPTIONS } from './user-preferences.types';
import { UserPreferencesService } from './user-preferences.service';
import { RxNotificationService } from '@helix/platform/shared/api';

// In this example we will save colors for the current user in his / her user preferences and
// "remember" / fetch them the next time the user accesses the page.
// The colors are saved by view component instance Id.
// If there are multiple view components of the same type in the view, each one of them would have
// its own properties.
// This shows how to leverage the user preferences to store and retrieve data that are specific
// to one user and one view component instance.
@Component({
  selector: 'com-example-test210500-com-example-test210500-user-preferences',
  // LMA:: TODO:: Add css declaration in schematics.
  styleUrls: ['./user-preferences.scss'],
  templateUrl: './user-preferences.component.html'
})
export class UserPreferencesComponent extends BaseViewComponent implements OnInit, IViewComponent {
  // LMA:: TODO:: Those three properties seem useless now?
  // Remove from schematics?
  // userPreferences: string;

  // The following two parameters are inherited from BaseViewComponent.
  // guid will automatically contain the view component guid.
  guid: string;
  // config will automatically contain the configuration object.
  config: Observable<any>;

  // Default values:
  defaultBackgroundColor = USER_PREFERENCES_OPTIONS.default.backgroundColor
  backgroundColor = this.defaultBackgroundColor;
  defaultTextColor = USER_PREFERENCES_OPTIONS.default.textColor;
  textColor = this.defaultTextColor;
  sampleText = USER_PREFERENCES_OPTIONS.sampleText;

  // LMA:: TODO:: componentData should not be private since we use it
  // in the schematics html template.
  // private componentData: IUserPreferencesParameters;
  componentData: IUserPreferencesParameters;

  private userPreferencesColorObjects: IUserPreferencesColorObjects;

  constructor(private userPreferencesService: UserPreferencesService,
              private rxNotificationService: RxNotificationService) {
    super();
  }

  ngOnInit() {
    // There are no input parameters in this example so this call is not useful
    // as it is called whenever the input parameters are set / modified.
    // We could comment it out.
    this.config.subscribe((config: IUserPreferencesParameters) => {
      // LMA:: TODO:: Remove the console.log from the schematics.
      // console.log(config);
      this.componentData = config;
    });

    this.fetchUserPreferences();
  }

  // Getting the user preferences for this view component Instance Id.
  private fetchUserPreferences(): void {
    this.userPreferencesService.getCurrentValues(this.guid).subscribe((userPreferencesColorObjects: IUserPreferencesColorObjects) => {
      this.userPreferencesColorObjects = userPreferencesColorObjects;
      this.backgroundColor = userPreferencesColorObjects.backgroundColor.value;
      this.textColor = userPreferencesColorObjects.textColor.value;
    });
  }

  // Updating the colors set by the user and for the view component instance Id.
  saveColors(): void {
    this.userPreferencesColorObjects.backgroundColor.value = this.backgroundColor;
    this.userPreferencesColorObjects.textColor.value = this.textColor;

    this.userPreferencesService.createUpdateValues(this.guid, this.userPreferencesColorObjects).subscribe((result) => {
      // LMA:: TODO:: Localize message.
      this.rxNotificationService.addSuccessMessage('The color preferences have been saved successfully.')
    });
  }

  // Method called when the user selects a color in the Adapt color picker.
  onBackgroundColorUpdate(colorCode: string): void {
    this.backgroundColor = colorCode;
  }

  // Method called when the user selects a color in the Adapt color picker.
  onTextColorUpdate(colorCode: string): void {
    this.textColor = colorCode;
  }
}
