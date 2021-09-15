import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { SignaturePad } from 'angular2-signaturepad';

// This example shows how to display a digital signature field, allowing
// an end user to sign with the mouse or finger on a tablet or phone for example.
// This example is leveraging several dependencies:
// https://www.npmjs.com/package/angular2-signaturepad
// npm install angular2-signaturepad --save
// Which leverages:
// https://www.npmjs.com/package/signature_pad
// https://github.com/szimek/signature_pad
@Component({
  selector: 'com-example-test210500-com-example-test210500-digital-signature',
  styleUrls: ['./digital-signature.scss'],
  templateUrl: './digital-signature.component.html'
})
export class DigitalSignatureComponent extends BaseViewComponent implements IViewComponent {
  @ViewChild('signaturePad', {static: true})
  signaturePad: SignaturePad;

  guid: string;
  config: Observable<any>;
  digitalSignature: string;

  // Signature pad options.
  signaturePadOptions: any = {
    'minWidth': 0.5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  clearSignature(): void {
    this.signaturePad.clear();
    // Setting the output parameter to the base 64 picture.
    this.notifyPropertyChanged('signature', '');
  }

  // This button will broadcast the signature in the view component
  // output parameter.
  addSignature(): void {
    // Setting the output parameter to the base 64 picture (png by default).
    this.notifyPropertyChanged('signature', this.cleanBase64Signature());
  }

  // Resetting the signature when the user clicks on the signature pad.
  drawStart(): void {
    this.notifyPropertyChanged('signature', '');
  }

  // Broadcasting the signature in the view component output parameter.
  drawComplete(): void {
    this.addSignature();
  }

  // We are removing the base 64 png "header" as the create attachment process
  // activity does not need it.
  // data:image/png;base64,iVBORw(...)Jggg==
  private cleanBase64Signature(): string {
    let pngSignature: string = this.signaturePad.toDataURL() || '';

    const base64Header = ';base64,';
    const index = pngSignature.indexOf(base64Header);

    if (index !== -1) {
      pngSignature = pngSignature.substr(index + base64Header.length);
    }

    return pngSignature;
  }
}
