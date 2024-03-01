import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { GetDataExampleComponent } from './runtime';
import { GetDataExampleDesignComponent, GetDataExampleDesignModel } from './design';

// This view component aims to show how to:
// Get a specific record instance,
// Get a specific record instance from a grid first selectedRow,
// Get several record instances (datapagequery),
// Get associated data,
// Call a grid refresh method to refresh a grid,
// Set a grid filter,
// Create a new record instance,
// Update an existing record instance,
//
// How to display an object in HTML using the component rx-json-viewer,
// How to add a button in HTML using the Adapt button styles,
//
// Download an attachment and get its download url,
// Get an attachment picture and display it in the web browser,
//
// This view component is designed to be used with specific record definitions
// and in the view "com.example.test210500:VC Getting Record Definition Data".
@NgModule()
export class GetDataExampleRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500GetDataExample',
      name: 'Example of consuming record definition data',
      icon: 'binary_data',
      group: 'Test 21.05.00',
      component: GetDataExampleComponent,
      // We allow an expression as inputs.
      // We expect grid objects.
      // We will get their selectedRow at runtime and call their refresh methods.
      // We will define the input property types in the design model.
      properties: [
        {
          name: 'gridObject',
          // Since we are expecting an object (the grid) we should not
          // define a type here as it will be an expression.
          enableExpressionEvaluation: true
        },
        {
          name: 'gridObjectAssociation',
          enableExpressionEvaluation: true
        }
      ],
      designComponent: GetDataExampleDesignComponent,
      designComponentModel: GetDataExampleDesignModel
    });
  }
}
