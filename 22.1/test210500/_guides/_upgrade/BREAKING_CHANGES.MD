<h1 style="text-align:center">Breaking Changes</h1>

## Table Of Contents:
* [Introduction](#introduction)
* [Breaking changes from 21.3 to 22.x](#breaking-changes-213-22x)


<a name="introduction"></a>
## Introduction
There can be breaking changes due to some library updates between major versions (Angular, RxJs, Adapt etc...), for example from 21.x to 22.x.  
There should not be breaking changes between minor versions, for example from 22.1.00 to 22.1.01.  
In the case of this sample application, there were some breaking changes, and some modifications had to be applied.  
This documentation will detail them.

---

<a name="breaking-changes-213-22x"></a>
## Breaking changes from 21.3 to 22.x

### Adapt breaking changes: StackedChartType:
Adapt changed a Type from `StackedChartType` to `AdaptStackedChartType`, we had to modify the import and usage in file [bar-chart-component.component.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/bar-chart-component/runtime/bar-chart-component.component.ts):  
```ts
import { AdaptStackedChartType } from '@bmc-ux/adapt-charts';
// (...)
stackedColChart: AdaptStackedChartType = AdaptStackedChartType.Column;
```


### Platform library change: IRxRecordGridApi:
Innovation Studio Platform changed the location of `IRxRecordGridApi` from `@helix/platform/view/components` to `@helix/platform/view/api`, we had to modify the import and usage in file [get-data-example.interface.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/get-data-example/design/get-data-example.interface.ts):  
```ts
import { IRxRecordGridApi } from '@helix/platform/view/api';
```



### Grid filter format:
Innovation Studio Platform grid filter format has been modified due to some Adapt enhancements.  
Here the idea was to apply this filter to a grid ('Status' = "0"):
```
'7' = "0"
```

Previously the filter object was in this format:
```ts
      const filter: SelectedAdvancedFilter[] = [
        {
          filterOptionId: '7',
          value: ['0']
        }
      ];
```

And has changed now to this format:
```ts
      const filter: SelectedAdvancedFilter[] = [
        {
          filterOptionId: '7',
          value: {
            filterValue: ['0'],
            namedOptions: []
          }
        }
      ];
```

The example has been modified to reflect those changes, you can find the modification in the file [get-data-example.component.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/view-components/get-data-example/runtime/get-data-example.component.ts).


### Wrong return type:
This is a coding error that Angular / Typescript is now trapping, the return type of this method was not correct:
```ts
  static getInitialProperties(
    initialProperties: ViewActionDesignEditableProperties<IGetUserInformationActionDesignProperties>
  ) {
    return {initialProperties};
  }
```

It should have been:
```ts
  static getInitialProperties(
    initialProperties: ViewActionDesignEditableProperties<IGetUserInformationActionDesignProperties>
  ) {
    return initialProperties;
  }
```
The modification has been done in the file [get-user-information-action.design-model.ts](../../bundle/src/main/webapp/libs/com-example-test210500/src/lib/actions/get-user-information/get-user-information-action.design-model.ts).


