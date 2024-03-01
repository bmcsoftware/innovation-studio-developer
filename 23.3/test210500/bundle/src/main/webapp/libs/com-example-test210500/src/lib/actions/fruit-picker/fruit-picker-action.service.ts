import { Injectable } from '@angular/core';
import { IViewActionService } from '@helix/platform/view/api';
import { IFruitPickerActionProperties, IFruitRestApiPayload } from './fruit-picker-action.interface';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FRUIT_PICKER_REST_ACTION } from './fruit-picker-action.types';
import { get } from 'lodash';

@Injectable()
export class FruitPickerActionService implements IViewActionService<IFruitPickerActionProperties, never> {
  constructor(private httpClient: HttpClient) {
  }

  // Method executed at runtime automatically.
  // inputParameters will contain the different Input parameter values.
  // This method must return an Observable.
  // In this example the Action calls a custom rest api that returns
  // a json object that will be output as the output parameter "fruitObject"
  // The output parameter can get consumed by the next actions.
  // This fruitObject has several children attributes that match the Rest Api Response.
  execute(inputParameters: IFruitPickerActionProperties): Observable<never> {
    // Since some attributes are optional depending on fruits we need to set some default values.
    // export interface IFruitAttributes {
    //   color: string;
    //   isGrowingOnTrees: string;
    //   length?: string;
    //   width?: string;
    //   vendor?: string;
    //   needsToBeCooked?: string;
    //   isForDessertOnly?: string;
    // }

    // Note:
    // During design time we saw that the dynamic properties are stored as 'fruitAttributes.color'
    // for example and were accessed during validation in the manager.service.ts as
    // actionParameters['fruitAttributes.color'].
    // Though at runtime the UI will create an object from those automatically.
    // So for example:
    // actionParameters['fruitAttributes.color'] = 'value';
    // actionParameters['fruitAttributes.length'] = 'value'
    // Would be at runtime:
    // {
    //   fruitAttributes: {
    //     color: 'value',
    //       length: 'value'
    //   }
    // }
    const payload: IFruitRestApiPayload = {
      fruit: inputParameters.fruit,
      fruitAttributes: {
        color: get(inputParameters.fruitAttributes, 'color'),
        isGrowingOnTrees: get(inputParameters.fruitAttributes, 'isGrowingOnTrees', '0'),
        length: get(inputParameters.fruitAttributes, 'length'),
        width: get(inputParameters.fruitAttributes, 'width'),
        vendor: get(inputParameters.fruitAttributes, 'vendor'),
        needsToBeCooked: get(inputParameters.fruitAttributes, 'needsToBeCooked', '0'),
        isForDessertOnly: get(inputParameters.fruitAttributes, 'isForDessertOnly', '0')
      }
    };

    // The output format must be of type IPlainObject and the value must
    // be an observable.
    // For example:
    // {
    //   fruitObject: <Observable>;
    // }
    // The fruit object in itself is coming as a Json object from the custom Rest api response:
    // src/main/java/com/example/bundle/FruitRest.java
    // Which returns an object FruitResponse src/main/java/com/example/bundle/FruitResponse.java (simplified version):
    // private String fruit;
    // private String configuration;
    // So we do not need to build the fruitObject children as we already defined their path in the
    // output parameter configuration in the .design-model.ts:
    // {
    //   label: 'fruitObject',
    //     expression: this.getOutputExpressionForPropertyPath('fruitObject'),
    //   children: [
    //   {
    //     label: 'fruit',
    //     expression: this.getOutputExpressionForPropertyPath('fruitObject.fruit'),
    //   },
    //   {
    //     label: 'configuration',
    //     expression: this.getOutputExpressionForPropertyPath('fruitObject.configuration'),
    //   }
    //  ]
    // }

    // "fruitObject" is the output parameter.
    const actionResult = {
      fruitObject: this.httpClient.post(FRUIT_PICKER_REST_ACTION.url, payload)
    }

    return forkJoin(actionResult);
  }
}
