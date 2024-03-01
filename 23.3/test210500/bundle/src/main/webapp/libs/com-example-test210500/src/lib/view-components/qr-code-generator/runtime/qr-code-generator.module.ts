import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodeGeneratorComponent } from './qr-code-generator.component';
// Third party module used to generate the Qr code:
// https://github.com/werthdavid/ngx-kjua
import { NgxKjuaModule } from 'ngx-kjua';

@NgModule({
  imports: [CommonModule, NgxKjuaModule],
  exports: [QrCodeGeneratorComponent],
  declarations: [QrCodeGeneratorComponent],
  entryComponents: [QrCodeGeneratorComponent]
})
export class QrCodeGeneratorModule {
}
