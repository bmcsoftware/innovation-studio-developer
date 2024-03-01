import { AfterViewInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IAdminComponentSettings, RxAdminSettingsService, Tooltip } from '@helix/platform/shared/api';
import { ADMIN_PREFERENCES_OPTIONS } from './admin-preferences.types';
import { first, forEach } from 'lodash';
import { IAdminComponentSetting } from '@helix/platform/shared/api/administration/administration.types';
import { CommonModule } from '@angular/common';
import { AdaptButtonModule, AdaptCodeViewerModule, AdaptRxLabelModule } from '@bmc-ux/adapt-angular';
import { RxViewComponent } from '@helix/platform/view/api';

@Component({
  selector: 'com-example-test210500-com-example-test210500-admin-preferences',
  styleUrls: ['./admin-preferences.scss'],
  templateUrl: './admin-preferences.component.html',
  standalone: true,
  imports: [CommonModule, AdaptCodeViewerModule, AdaptButtonModule, AdaptRxLabelModule],
})
@RxViewComponent({
  name: 'comExampleTest210500AdminPreferences'
})
export class AdminPreferencesComponent extends BaseViewComponent implements IViewComponent, AfterViewInit {
  guid: string;
  config: Observable<any>;
  adminPreferences: string;
  adminComponentDataString = '';
  hasData = false;
  isFetchInProgress = true;
  tooltip = new Tooltip('We display here the bookWorm shared settings defined in the bundle "Configurations" tab.');

  private adminComponentData: IAdminComponentSetting[] = [];

  constructor(private rxAdminSettingsService: RxAdminSettingsService) {
    super();
  }

  // Here the "bookWorm" configuration has two fields, "preferred author" and "preferred Book".
  // Data comes as an array of IAdminComponentSettings in the values attributes.
  // You can see that:
  // -> The componentName property contains the Configuration name (bookWorm)
  // -> The settingName contains the field name,
  // -> The settingValue contains the field value,
  // -> The ownerKeyValue1 is the instance Id / identifier from the configuration, NOT from the settingName/settingValue,
  // So here the ownerKeyValue1 contains the same value for both fields.
  // For example:
  // {
  //   "values": [
  //     {
  //       "settingId": "AGGAAC47ADZ62AQSK43BQSK43BGQ7G",
  //       "componentName": "bookWorm",
  //       "settingName": "preferred author",
  //       "settingValue": "Frank Herbert",
  //       "ownerKeyValue1": "AGGAAC47ADZ62AQSK43BQSK43BGQ7G",
  //       "assigneeGroupPermission": ""
  //     },
  //     {
  //       "settingId": "AGGAAC47ADZ62AQSK43BQSK43BGQ7J",
  //       "componentName": "bookWorm",
  //       "settingName": "preferred Book",
  //       "settingValue": "Dune",
  //       "ownerKeyValue1": "AGGAAC47ADZ62AQSK43BQSK43BGQ7G",
  //       "assigneeGroupPermission": ""
  //     }
  //   ]
  // }

  getCurrentData(): void {
    this.isFetchInProgress = true;

    // Getting the data for the Configuration name "bookWorm":
    this.rxAdminSettingsService.getComponentSettings(ADMIN_PREFERENCES_OPTIONS.componentName).subscribe((result: IAdminComponentSettings) => {
      this.adminComponentDataString = JSON.stringify(result, undefined, 2);
      this.adminComponentData = result.values || [];
      this.hasData = this.adminComponentData.length > 0;
      this.isFetchInProgress = false;
    });
  }

  // Creating a new set of data for the "bookWorm" configuration.
  createNewData(): void {
    // We need to build the IAdminComponentSetting[] object, field per field.
    // As you can see we do not ned to set any value in the identifier.
    const values: IAdminComponentSetting[] = [
      {
        componentName: ADMIN_PREFERENCES_OPTIONS.componentName,
        settingName: ADMIN_PREFERENCES_OPTIONS.settingPreferredAuthorName,
        settingValue: 'Frank Herbert',
        // Default values when creating a new configuration.
        assigneeGroupPermission: null,
        ownerKeyValue1: null,
        settingId: null
      },
      {
        componentName: ADMIN_PREFERENCES_OPTIONS.componentName,
        settingName: ADMIN_PREFERENCES_OPTIONS.settingPreferredBookName,
        settingValue: 'Dune',
        // Default values when creating a new configuration.
        assigneeGroupPermission: null,
        ownerKeyValue1: null,
        settingId: null
      }
    ];

    this.isFetchInProgress = true;

    this.rxAdminSettingsService.createComponentSettings(ADMIN_PREFERENCES_OPTIONS.componentName, values).subscribe(() => {
      this.isFetchInProgress = false;
      this.getCurrentData();
    });
  }

  updateData(): void {
    if (this.hasData) {
      let ownerKey: string;

      this.isFetchInProgress = true;

      // The update call can modify all fields from the "bookWorm" configuration. Here we will just change
      // the existing values appending the current timestamp and the default values.
      forEach(this.adminComponentData, (componentSettingData: IAdminComponentSetting) => {
        ownerKey = componentSettingData.ownerKeyValue1;
        componentSettingData.settingValue = Date.now() + ' ' + ADMIN_PREFERENCES_OPTIONS.defaultValues[componentSettingData.settingName];
      });

      // Very important, we need for the update and delete operations to provide not only the configuration name but also the ownerKey (identifier), so for example:
      // bookWorm/AGGAAC47ADZ62AQSK43BQSK43BGQ7G
      this.rxAdminSettingsService.updateComponentSettings(`${ADMIN_PREFERENCES_OPTIONS.componentName}/${ownerKey}`, this.adminComponentData).subscribe(() => {
        this.getCurrentData();
      });
    }
  }

  deleteData(): void {
    if (this.hasData) {
      let ownerKey = first(this.adminComponentData).ownerKeyValue1;

      this.isFetchInProgress = true;

      // Very important, we need for the update and delete operations to provide not only the configuration name but also the ownerKey (identifier), so for example:
      // bookWorm/AGGAAC47ADZ62AQSK43BQSK43BGQ7G
      this.rxAdminSettingsService.deleteComponentSettings(`${ADMIN_PREFERENCES_OPTIONS.componentName}/${ownerKey}`).subscribe(() => {
        this.getCurrentData();
      });
    }
  }

  ngAfterViewInit(): void {
    this.getCurrentData();
  }
}
