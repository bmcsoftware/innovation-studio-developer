import { NgModule } from '@angular/core';
import { StepEditorComponent } from './step-editor.component';
// The following modules are necessary because stepEditor component and
// the dialog components are using some Adapt components.
import {
    AdaptAccordionModule,
    AdaptButtonModule,
    AdaptEmptyStateModule,
  AdaptIconModule,
    AdaptRxLabelModule,
    AdaptRxSelectModule,
    AdaptRxTextfieldModule
} from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { StepEditorDialogComponent } from './dialog-component/step-editor-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { StepEditorDialogService } from './dialog-component/step-editor-dialog.service';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Do not forget to import the module in the view component or action design module if you are using the component.

// This Component is designed to be used when defining a View Component or Action Input
// parameter in a design model.ts file.
// For example this Component is used in the wizard view component.
@NgModule({
  declarations: [StepEditorComponent, StepEditorDialogComponent],
  entryComponents: [StepEditorComponent, StepEditorDialogComponent],
  exports: [StepEditorComponent, StepEditorDialogComponent],
  providers: [StepEditorDialogService],
    imports: [
        AdaptRxLabelModule,
        FormsModule,
        AdaptButtonModule,
        AdaptRxTextfieldModule,
        TranslateModule,
        AdaptRxSelectModule,
        CommonModule,
        AdaptAccordionModule,
        DragDropModule,
        AdaptEmptyStateModule,
        AdaptIconModule
    ]
})
export class StepEditorModule {
}
