import { Component, isDevMode, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { first, forEach, map, sortBy, startsWith } from 'lodash';
import { IIcon } from '../design/list-icons.interface';
import { Alert } from '@bmc-ux/adapt-angular';
import { IconFilterTrackingService } from './list-icon.service';

@Component({
  selector: 'com-example-test210500-com-example-test210500-list-icons',
  // LMA:: TODO:: Add a default scss file in the schematics.
  styleUrls: ['./list-icons.scss'],
  templateUrl: './list-icons.component.html'
})
export class ListIconsComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  listIcons: string;
  availableIcons: IIcon[] = [];
  searchingValue = '';
  numberOfFilteredIcons = 0;

  // LMA:: TODO:: Change this in the schematics, it seems the componentData is private
  // and in the view component HTML we use it.
  // private componentData: IListIconsParameters;

  // Configuration for Adapt Alert
  // LMA:: TODO:: Localize texts.
  alertConfiguration: Alert = {
    variant: 'info',
    title: 'No results: ',
    content: 'No icon have been found.'
  };

  constructor(private iconFilterTrackingService: IconFilterTrackingService) {
    super();
  }

  ngOnInit() {
    // As we do not have input parameters we do not need to subscribe to configuration changes.
    // We subscribe to our search string.
    this.getAllAvailableIcons();
    this.availableIcons = sortBy(this.availableIcons, ['ruleName']);
    this.numberOfFilteredIcons = this.availableIcons.length

    // We are using a pipe to filter the icon names, this means it is not easy to get the list
    // of filtered icons to display a message.
    // For this we have a service that has an Observable passing the number of filtered icons.
    // The pipe is emitting the number of filtered icons and the component subscribes to the
    // service observable and display the Adapt Alert when necessary.
    this.iconFilterTrackingService.isFilterComplete$.subscribe((numberOfFilteredIcons: number) => {
      // This is to avoid an error thrown by angular (ExpressionChangedAfterItHasBeenCheckedError).
      setTimeout(() => {
        this.numberOfFilteredIcons = numberOfFilteredIcons;
      });
    });
  }

  // We need to search through all available css stylesheets.
  private getAllAvailableIcons(): void {
    forEach(document.styleSheets, (styleSheet)=> {
      // In Angular developer mode the file styles.<hash>.css is not loaded so we need
      // to go through all stylesheets.
      // In production mode we will only focus on file 'styles.<hash>.css'.
      if ((styleSheet.href && styleSheet.href.includes('/styles.')) || isDevMode()) {
        const cssRules = styleSheet.cssRules;

        forEach(cssRules, (cssStyleRule: CSSStyleRule) => {
          if (startsWith(cssStyleRule.selectorText, '.d-icon-')) {
            let iconShortName = cssStyleRule.selectorText.split('.d-icon-')[1];

            iconShortName = first(iconShortName.split(':'));

            this.availableIcons.push({
              ruleName: iconShortName,
              iconCode: cssStyleRule.style.content,
              className: this.cleanClassName(cssStyleRule.selectorText)
            });
          }
        });

        if(!isDevMode()) {
          return;
        }
      }
    });
  }

  // The class names have values such as:
  // .d-icon-activity_feed_clock_o::before, .d-icon-left-activity_feed_clock_o::before, .d-icon-right-activity_feed_clock_o::after
  // but we need the icon "codes" which are:
  // d-icon-activity_feed_clock_o, d-icon-left-activity_feed_clock_o, d-icon-right-activity_feed_clock_o
  private cleanClassName(classNames: string): string {
    let cssClassList = classNames.replace(/::before/g, '').replace(/::after/g, '').split(',');

    // Removing the initial class '.':
    cssClassList = map(cssClassList, (cssClass: string) => {
      return cssClass.trim().substr(1);
    });

    return cssClassList.join(', ');
  }
}
