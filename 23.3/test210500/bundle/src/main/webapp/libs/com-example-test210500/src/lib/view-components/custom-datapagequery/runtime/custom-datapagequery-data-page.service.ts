import { Injectable, Injector } from '@angular/core';
import { DataPage } from '@helix/platform/shared/api';
import { CUSTOM_DATAPAGEQUERY_OPTIONS } from './custom-datapagequery.types';

// We declare the custom datapage query.
// Its code in itself is in the Java class:
// src/main/java/com/example/bundle/Test210500FruitDataPageQuery.java
@Injectable()
export class CustomDatapagequeryDataPageService extends DataPage {
  constructor(injector: Injector) {
    super(injector, CUSTOM_DATAPAGEQUERY_OPTIONS.datapageQueryName);
  }
}
