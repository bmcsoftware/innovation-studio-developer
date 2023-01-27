import { Injectable } from '@angular/core';

// Literally black magic to get a component anywhere in the DOM from its nativeElement.
// https://github.com/angular/angular/issues/8277#issuecomment-726057745
@Injectable()
export class GetComponentService {
  // This method will find the Angular Component object from its nativeElement.
  // This can be useful in some remote cases where a view component wants to access
  // another component in the DOM and this component does not provides its apis.
  // For example the "access-grid" view component wants to access a grid to get the
  // values or select a row, but the grid component does not expose those kind of apis.
  // The view component does a document.querySelectorAll('rx-record-grid') to find all
  // grids in the Document and consumes this method that will return the Angular component
  // instance. Then "access-grid" can consume all methods and objects from rx-record-grid
  // (RecordGridComponent).
  getComponentByNativeElement(nativeElement): any {
    const ngDevMode = true;
    const MONKEY_PATCH_KEY_NAME = '__ngContext__';
    const TVIEW = 1;
    const HEADER_OFFSET = 20;
    const HOST = 0;

    function findViaNativeElement(lView, target) {
      const tView = lView[TVIEW];

      for (let i = HEADER_OFFSET; i < tView.bindingStartIndex; i++) {
        if (unwrapRNode(lView[i]) === target) {
          return i;
        }
      }

      return -1;
    }

    /**
     * Returns `RNode`.
     * @param value wrapped value of `RNode`, `LView`, `LContainer`
     */
    function unwrapRNode(value) {
      while (Array.isArray(value)) {
        value = value[HOST];
      }

      return value;
    }

    function readPatchedData(target) {
      return target[MONKEY_PATCH_KEY_NAME] || null;
    }

    function getLContext(target) {
      const mpValue = readPatchedData(target);

      if (mpValue) {
        // only when it's an array is it considered an LView instance
        // ... otherwise it's an already constructed LContext instance
        if (Array.isArray(mpValue)) {
          const lView = mpValue;
          let nodeIndex;

          nodeIndex = findViaNativeElement(lView, target);

          if (nodeIndex === -1) {
            return null;
          }

          return {nodeIndex, lView};
        }
      }
    }

    function getComponentAtNodeIndex(nodeIndex, lView) {
      const tNode = lView[TVIEW].data[nodeIndex];
      let directiveStartIndex = tNode.directiveStart;

      return tNode.flags & 2 /* isComponentHost */ ? lView[directiveStartIndex] : null;
    }

    function loadLContext(target, throwOnNotFound = true) {
      const context = getLContext(target);

      return context;
    }

    function getComponent(element) {
      const context = loadLContext(element, false) as any;

      if (context === null) {
        return null;
      }

      if (context.component === undefined) {
        context.component = getComponentAtNodeIndex(context.nodeIndex, context.lView);
      }

      return context.component;
    }

    return getComponent(nativeElement);
  }
}
