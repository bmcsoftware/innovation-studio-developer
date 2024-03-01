import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import {
  IQrCodeGeneratorLabelParameters,
  IQrCodeGeneratorParameters,
  IQrCodeGeneratorPictureParameters
} from '../design/qr-code-generator.interface';
import { QR_CODE_GENERATOR_OPTIONS } from '../design/qr-code-generator.types';
import { takeUntil } from 'rxjs/operators';
import { RxViewComponent } from '@helix/platform/view/api';
import { CommonModule } from '@angular/common';
// Third party module used to generate the Qr code:
// https://github.com/werthdavid/ngx-kjua
import { NgxKjuaModule } from 'ngx-kjua';

// QR Code generator documentation:
// https://larsjung.de/kjua/
@Component({
  selector: 'com-example-test210500-com-example-test210500-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  standalone: true,
  imports: [CommonModule, NgxKjuaModule]
})
@RxViewComponent({
  name: 'comExampleTest210500QrCodeGenerator'
})
export class QrCodeGeneratorComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  qrCodeGenerator: string;

  componentData: IQrCodeGeneratorParameters;
  displayMode = QR_CODE_GENERATOR_OPTIONS.displayModes.plain;
  // It is necessary to display a 1x1 png transparent pixel in order to avoid a javascript
  // error in the qr code library.
  currentPicture = QR_CODE_GENERATOR_OPTIONS.defaultValues.emptyPicture;

  // This is not mentioned in the documentation but it is possible to pass an array of sizes
  // to the [msize] attribute.
  // If the mode imagelabel is enabled (displaying both an image and a label) then we would have:
  // [imageSize, labelSize]
  // In the other case if we display only the label we would have:
  // [labelSize].
  // If we display only the picture we would have:
  // [pictureSize]
  msizes = [0, 0];

  labelConfiguration: IQrCodeGeneratorLabelParameters = {
    fontColor: '',
    fontName: '',
    label: '',
    fontSize: 0
  };

  pictureConfiguration: IQrCodeGeneratorPictureParameters = {
    imageAsCode: false,
    pictureBase64: '',
    imageSize: 0
  };

  ngOnInit() {
    this.config.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((config: IQrCodeGeneratorParameters) => {
      this.componentData = config;

      if (this.componentData.usePicture) {
        this.currentPicture =  this.componentData.pictureBase64 || QR_CODE_GENERATOR_OPTIONS.defaultValues.emptyPicture;
        this.pictureConfiguration.pictureBase64 = this.componentData.pictureBase64;
        this.pictureConfiguration.imageAsCode = this.componentData.imageAsCode;
        this.pictureConfiguration.imageSize = this.componentData.imageSize;
      }

      // The setTimeout is necessary in the case where the the picture content is passed
      // as an expression (stored in a field for example).
      setTimeout(() => {
        if (this.componentData.useLabel) {
          this.labelConfiguration.label = this.componentData.label;
          this.labelConfiguration.fontColor = this.componentData.fontColor;
          this.labelConfiguration.fontName = this.componentData.fontName;
          this.labelConfiguration.fontSize = this.componentData.fontSize;

          if (this.componentData.usePicture && this.componentData.pictureBase64) {
            // We have an image and a label.
            this.displayMode = QR_CODE_GENERATOR_OPTIONS.displayModes.imagelabel;
            this.msizes = [this.pictureConfiguration.imageSize, this.labelConfiguration.fontSize];
          } else {
            // We have just a label.
            this.displayMode = QR_CODE_GENERATOR_OPTIONS.displayModes.label;
            this.msizes = [this.labelConfiguration.fontSize];
          }
        } else if (this.componentData.usePicture && this.componentData.pictureBase64) {
          // We have just a picture.
          this.displayMode = QR_CODE_GENERATOR_OPTIONS.displayModes.image;
          this.msizes = [this.pictureConfiguration.imageSize];
        } else {
          // We have nor a label nor a picture (or maybe a picture that was empty).
          this.displayMode = QR_CODE_GENERATOR_OPTIONS.displayModes.plain;
          this.msizes = [0, 0];
        }
      });
    });
  }
}
