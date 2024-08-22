import { Injectable, isDevMode } from '@angular/core';
import { first, forEach, sortBy, startsWith } from 'lodash';
import { STEP_EDITOR_DIALOG_ACTION } from './step-editor-dialog.types';

// The goal of this service is to return all available Adapt icons.
@Injectable()
export class StepEditorDialogService {
  private availableIcons: string[] = [];

  // We need to search through all available css stylesheets.
  getAllAvailableIcons(): string[] {
    forEach(document.styleSheets, (styleSheet)=> {
      // In Angular developer mode the file styles.<hash>.css is not loaded so we need
      // to go through all stylesheets.
      // In production mode we will only focus on file 'styles.<hash>.css'.
      if ((styleSheet.href && styleSheet.href.includes('/styles.')) || isDevMode()) {
        const cssRules = styleSheet.cssRules;

        forEach(cssRules, (cssStyleRule: CSSStyleRule) => {
          if (startsWith(cssStyleRule.selectorText, '.d-icon-')) {
            const iconShortName = cssStyleRule.selectorText.split('.d-icon-')[1];

            this.availableIcons.push(first(iconShortName.split(':')));
          }
        });

        if(!isDevMode()) {
          return;
        }
      }
    });

    this.availableIcons = sortBy(this.availableIcons);
    // We add on top the "None..." choice if we do not want to choose an icon.
    this.availableIcons.unshift(STEP_EDITOR_DIALOG_ACTION.defaultIcon)

    return this.availableIcons;
  }
}
