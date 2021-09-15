import { Injectable } from '@angular/core';
import { IUserPreferencesData, RxUserPreferencesService } from '@helix/platform/shared/api';
import { USER_PREFERENCES_OPTIONS } from './user-preferences.types';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IUserPreferencesColorObjects, IUserPreferencesColorValues } from '../design/user-preferences.interface';

// The service must be declared in the providers view component runtime module.
@Injectable()
export class UserPreferencesService {
  constructor(private rxUserPreferencesService: RxUserPreferencesService) {
  }

  // User preferences are stored per view component instance, here the user-preferences example view component.
  // We store and get the values by view component instance Id (guid).
  // If there are multiple view components, each instance of it will have its own preferences.
  getCurrentValues(viewComponentGuid: string): Observable<IUserPreferencesColorObjects> {
    // Preparing the default values.
    const userPreferencesColorObjects: IUserPreferencesColorObjects = {
      backgroundColor: {
        value: USER_PREFERENCES_OPTIONS.default.backgroundColor
      },
      textColor: {
        value: USER_PREFERENCES_OPTIONS.default.textColor
      }
    };

    return this.rxUserPreferencesService.getUiComponentPreferences(viewComponentGuid)
      .pipe(
        switchMap((savedValues: IUserPreferencesColorValues) => {
          // If we have values already stored in the preferences we will have the following IUserPreferencesColorValues object.
          // We know we receive this object since we save this object in the createUpdateValues() method below
          // in the .preferences property.
          // Note:
          // We save a stringified json object (so a string) but we get an object back.
          // If there are no value stored, then we will receive null.
          // Here is an example of savedValues when values are already saved:
          // {
          //   textColor: string;
          //   backgroundColor: string;
          // }

          if (savedValues) {
            userPreferencesColorObjects.textColor.value = savedValues.textColor;
            userPreferencesColorObjects.backgroundColor.value = savedValues.backgroundColor;
          }

          return of(userPreferencesColorObjects);
        })
      );
  }

  // We use the same Api call for the preferences update and creation.
  createUpdateValues(viewComponentGuid: string, userPreferencesColorObjects: IUserPreferencesColorObjects): Observable<any> {
    // We prepare the payload.
    const userPreferencesData: IUserPreferencesData = {
      // Preferences values, stored as a string. The string is actually a stringified object.
      // In our use case it will contain a stringified version of this object IUserPreferencesColorValues:
      // {
      //   textColor: string;
      //   backgroundColor: string;
      // }
      preferences: '',
      // View component type (name), here in this example we use the view component type as defined in
      // the registration.module.
      componentTypeName: USER_PREFERENCES_OPTIONS.userPreferencesDefaultValues.componentName,
      // View component version. This can be any value.
      version: USER_PREFERENCES_OPTIONS.userPreferencesDefaultValues.componentVersion,
      // View component instance Id (guid).
      componentId: viewComponentGuid
    };

    // We want to store the color values as this object IUserPreferencesColorValues,
    // so we create the object, set it and stringify it:
    // {
    //   textColor: '#FFFFFF',
    //   backgroundColor: '#000000'
    // }

    const updatedColorValues: IUserPreferencesColorValues = {
      textColor: userPreferencesColorObjects.textColor.value,
      backgroundColor: userPreferencesColorObjects.backgroundColor.value
    }

    userPreferencesData.preferences = JSON.stringify(updatedColorValues);

    return this.rxUserPreferencesService.setUiComponentPreferences(userPreferencesData, viewComponentGuid);
  }
}
