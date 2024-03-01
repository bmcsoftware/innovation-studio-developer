import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { DelayRegistrationComponent, DelayRegistrationModule } from './runtime';
import { DelayRegistrationDesignComponent, DelayRegistrationDesignModel, DelayRegistrationDesignModule } from './design';
import { IViewComponentDescriptor } from '@helix/platform/view/api/registries/view-component-descriptor.types';
import { RX_RECORD_DEFINITION, RxRecordInstanceService } from '@helix/platform/record/api';
import { DELAY_REGISTRATION_OPTIONS } from './delay-registration.types';


@NgModule({
  imports: [DelayRegistrationDesignModule, DelayRegistrationModule]
})
export class DelayRegistrationRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private rxRecordInstanceService: RxRecordInstanceService
  ) {
    // Instead of directly passing the object that describes the View Component,
    // we will pass a Promise. This allows for example to get data from a record
    // instance, here to change the "name" of the view component.
    // In real life, this could be used to change the group name, in which bundle
    // a View Component could be available, etc...
    // If a Promise object is not used, this could lead to problems where the View Designer
    // be loaded and the View Component might not be available because the rest api
    // to get the "name" property would not be finished.

    // View Component default properties.
    const defaultComponentDescriptor: IViewComponentDescriptor  = {
      type: 'com-example-test210500-delay-registration',
      name: '<The name will be replaced>',
      group: 'Test 21.05.00',
      icon: 'clock_o',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(DelayRegistrationComponent),
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(DelayRegistrationDesignComponent),
      designComponentModel: DelayRegistrationDesignModel,
      bundleId: 'com.example.test210500',
      // This setting is used to declare which bundles can use the View Component, aka appear in the
      // View Designer palette.
      // This can be an array of bundles using Strings or RegExp expressions.
      availableInBundles: ['com.example.test210500'],
      properties: [
        {
          name: 'message',
          enableExpressionEvaluation: true
        }
      ]
    };

    // We want to get the "name" property from a specific record instance "description" field.
    // As the Innovation Studio Record Instance service is an Observable,
    // we will need to convert it as a Promise.
    // The flow would be:
    // -> Getting the record instance,
    // -> Modifying the value of the "componentDescriptor" "name" property.
    // The promise is then passed to the register that will execute the promise.
    // The View Component will be registered once the Promise is fully satisfied.

    // Since the description dynamic property here is only really interesting at
    // design time (aka View Designer), we will only create the promise to get the
    // name in the Innovation Studio bundle.
    const viewComponentDescriptorPromise = this.rxRecordInstanceService
      // Getting the record instance where the name is stored.
      .get(DELAY_REGISTRATION_OPTIONS.recordDefinitionName, DELAY_REGISTRATION_OPTIONS.recordInstanceId)
      // Converting the Observable to a Promise
      .toPromise()
      // At evaluation, we get the record instance
      .then((recordInstance) => {
        // We return the component descriptor previously created, but overriding its name property
        // with the value of the record instance "description" field.
        return {
          ...defaultComponentDescriptor,
          name: recordInstance.fieldInstances[RX_RECORD_DEFINITION.coreFieldIds.description].value
        }
      }).catch((error) => {
        // In case of error, we return the default descriptor.
        return defaultComponentDescriptor;
      });

    // We pass the promise to the View Component Registry service, but only if we are in Innovation Studio.
    // If we are not, we just send the default Component Descriptor, aka the rest api call to get the record
    // instance will not be used.
    // Here we are checking if we are in View Designer, or not.
    const isDesignTime = window.location.href.indexOf('com.bmc.arsys.rx.innovationstudio') !== -1;

    if (isDesignTime) {
      console.log('Initializing the delay-registration view component with a rest api call.');
      rxViewComponentRegistryService.register(viewComponentDescriptorPromise);
    } else {
      console.log('Initializing the delay-registration view component without a rest api call.');
      rxViewComponentRegistryService.register(defaultComponentDescriptor);
    }
  }
}
