import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent, VIEW_COMPONENT_DEFAULT_EVENT_NAME } from '@helix/platform/view/runtime';
import { IImageClickParameters } from '../design/image-click.interface';
import { GetAssetPathService } from '../../../services/get-asset-path.service';
import { distinctUntilChanged, pluck, takeUntil } from 'rxjs/operators';
import { RxNotificationService } from '@helix/platform/shared/api';
import { CommonModule } from '@angular/common';
import { RxViewComponent } from '@helix/platform/view/api';

@Component({
  selector: 'com-example-test210500-image-click',
  styleUrls: ['./image-click.scss'],
  templateUrl: './image-click.component.html',
  standalone: true,
  imports: [CommonModule]
})
@RxViewComponent({
  name: 'com-example-test210500-image-click',
})
export class ImageClickComponent extends BaseViewComponent implements OnInit, IViewComponent {
  // Contains the view component instance id.
  guid: string;
  // Contains the view component configuration.
  config: Observable<any>;
  // Contains the view component instance parameters.
  inputParams: IImageClickParameters;

  assetRootPath = '';
  title = '';
  isInProgress = false;

  constructor(private getAssetPathService: GetAssetPathService, private rxNotificationService: RxNotificationService) {
    super();
  }

  ngOnInit() {
    this.assetRootPath = this.getAssetPathService.getAssetRootPath('com.example.test210500');

    // In this example we only "listen" to one specific Input Parameter (title)
    // and not the full configuration object.
    // The code will be triggered again only if the value is different.
    // This is done using standard rxJs operators.
    this.config.pipe(
      // Input parameter.
      pluck('title'),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    ).subscribe((title: string) => {
      this.title = title;
    });
  }

  // Triggering the button actions when a click is done of the picture.
  clickImage(): Promise<void> {
    if (this.isInProgress) {
      this.rxNotificationService.addInfoMessage('Please wait, you already clicked on the image :)');
    } else {
      this.isInProgress = true;

      // This service call triggers the actions added to this View Component.
      return this.runtimeViewModelApi.triggerViewActions(this.guid, VIEW_COMPONENT_DEFAULT_EVENT_NAME)
        .then((result) => {
          this.isInProgress = false;
        })
        .catch((error) => {
          this.isInProgress = false;
          this.rxNotificationService.addErrorMessage('Error triggering the actions ' + error);
        });
    }
  }
}
