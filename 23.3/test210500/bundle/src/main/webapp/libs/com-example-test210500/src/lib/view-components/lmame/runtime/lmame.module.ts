import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LmameComponent } from './lmame.component';
import { DynamicScriptLoaderServiceService } from '../../../services/dynamic-service-loader.service';
import { GetAssetPathService } from '../../../services/get-asset-path.service';

@NgModule({
  imports: [CommonModule],
  exports: [LmameComponent],
  declarations: [LmameComponent],
  entryComponents: [LmameComponent],
  providers: [DynamicScriptLoaderServiceService, GetAssetPathService]
})
export class LmameModule {
}
