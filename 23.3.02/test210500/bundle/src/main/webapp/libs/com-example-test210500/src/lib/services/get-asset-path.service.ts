import { Injectable, isDevMode } from '@angular/core';
import { last } from 'lodash';

// LMA:: TODO:: This is used for debug.
// When serving the files locally the path to external resources (javascript / pictures / fonts...)
// will not be the same.
// Maybe find a way so it is to ease up debug experience...
//
// Some examples:
// Javascript:
// Debug mode:
// http://localhost:4200/helix/assets/libs/test210500/resources/scripts/lma3.js
// Production mode:
// http://192.168.159.131:8008/com.example.test210500/scripts/assets/resources/scripts/lma3.js
// Picture:
// Debug:
// http://localhost:4200/helix/assets/libs/test210500/resources/pictures/lain.jpg
// Prod:
// http://192.168.159.131:8008/com.example.test210500/scripts/assets/resources/pictures/lain.jpg
@Injectable({
  providedIn: 'root'
})
export class GetAssetPathService {
  getAssetRootPath(bundleId: string): string {
    const artefactId = last(bundleId.split('.'));
    let path = `/${bundleId}/scripts/assets/resources/`;

    if(isDevMode()) {
      path = `/helix/assets/libs/${artefactId}/resources/`;
    }

    return path;
  }
}
