import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { CustomGridComponent, CustomGridModule } from './runtime';
import { CustomGridDesignComponent, CustomGridDesignModel, CustomGridDesignModule } from './design';

// This example shows how to leveral the OOTB BMC RecordGridComponent
// to display record definition data, as well as adding custom columns.
// Note:
// In this example the refresh method is not implemented, you can refer to the other
// example to see how to implement it.
// To refresh the grid in the custom-grid.component.ts it would be:
// this.fruitsRecordGrid.api.refresh
// The different output parameters (firstSelectedRow, row count etc...) would need to
// be manually reimplemented as well but you could use each time the grid apis to get those
// such as (you can use Intellisense on this.fruitsRecordGrid.api to see the different available methods):
// this.fruitsRecordGrid.api.getSelectedRowCount()
// this.fruitsRecordGrid.api.getFirstSelectedRow()
// this.fruitsRecordGrid.api.getSelectedRows()
@NgModule({
  imports: [CustomGridDesignModule, CustomGridModule]
})
export class CustomGridRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500CustomGrid',
      name: 'Custom grid',
      // This is a trick to have a custom icon displayed in view designer.
      // View designer will automatically prefix this icon by "d-icon-"
      // the trick is so to have an icon that does not exist, so here overall:
      // d-icon-com-example-test210500-custom-grid-icon
      // This is a class in View designer, so in order to have a custom icon we just need
      // to implement a custom css class "d-icon-com-example-test210500-custom-grid-icon".
      // Here this class is created in "com-example-test210500.scss".
      //
      // Note:
      // As the css class is "global" the best practices are:
      // Not to use BMC class names,
      // prefix each icon with the fully qualified bundle, library and view component name
      // to avoid collision, so for example:
      // <bundleId>-<libraryName>-<viewComponentName>-icon, so here:
      // com-example-test210500-custom-grid-icon
      icon: 'com-example-test210500-custom-grid-icon',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(CustomGridComponent),
      // There are no input parameters in this example.
      properties: [],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(CustomGridDesignComponent),
      designComponentModel: CustomGridDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
