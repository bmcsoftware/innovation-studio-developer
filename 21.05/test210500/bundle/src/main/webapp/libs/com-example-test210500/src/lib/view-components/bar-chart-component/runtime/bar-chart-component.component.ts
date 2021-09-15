import { Component, Input, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { forEach } from 'lodash';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IBarChartComponentParameters, IBarChartConfig, ISerie } from '../design/bar-chart-component.interface';
import { BAR_CHART_OPTIONS } from './bar-chart-component.types';
import { StackedChartType } from '@bmc-ux/adapt-charts';
import { BusyConfig, LoaderType } from '@bmc-ux/adapt-angular';
import { RxNotificationService } from '@helix/platform/shared/api';

@Component({
  selector: 'com-example-test210500-com-example-test210500-bar-chart-component',
  templateUrl: './bar-chart-component.component.html'
})
export class BarChartComponentComponent extends BaseViewComponent implements OnInit, IViewComponent {
  // Adapt chart options, the legend will automatically be generated but
  // we need to declare it as @Input().
  @Input()
  legend: any;

  guid: string;
  config: Observable<any>;
  barChartComponent: string;

  private componentData: IBarChartComponentParameters;

  // Adapt chart options.
  stackedColChart: StackedChartType = StackedChartType.Column;
  chartConfig: IBarChartConfig = null;

  // Adapt Busy configuration.
  observer: Observer<any>;
  busyConfigSection: BusyConfig = {};

  private defaultBusyConfig: BusyConfig = {
    message: 'Generating the graph.',
    busy: null,
    backdrop: true,
    overlayClass: '',
    sticky: true,
    delay: 0,
    minDuration: 200,
    loaderType: LoaderType.SECTION,
    offsetTop: '0px'
  };

  constructor(private rxNotificationService: RxNotificationService) {
    super();
  }

  ngOnInit() {
    this.generateRandomData();
  }

  // Generating random data and setting the adapt bar chart component configuration.
  generateRandomData(): void {
    // Displaying a loader indicator as long as the scripts are not loaded.
    this.triggerBusyIndicator();

    // In this example we will just generate random data.
    const series: ISerie[] = [];
    const numberOfYears =  Math.floor(Math.random() * 10) + 1;
    const categories: string[] = [];

    // Generating the categories (months), we start in the year 2020.
    for (let index = 0 ; index < numberOfYears; index++) {
      const currentYear = 2020 + index;

      forEach(BAR_CHART_OPTIONS.months, (month: string) => {
        categories.push(month +  ' ' + currentYear);
      });
    }

    // Generating the data per each serie type.
    forEach(BAR_CHART_OPTIONS.series, (serie: string) => {
      const currentSerie:ISerie = {
        name: serie,
        data: []
      };

      forEach(categories, (categorie: string) => {
        currentSerie.data.push(Math.floor(Math.random() * 1000));
      });

      series.push(currentSerie);
    });

    // Adapt Chart configuration object.
    // The categories is an Array of Strings, one entry per x axis value, for example:
    // ['Jan 2020', 'Feb 2020']
    // The series are an array of ISerie. There is one serie per object type.
    // For example if you have two object types like Banana and Apple, that would be two series.
    // Each serie contains a data array of numbers.
    // You must have as many numbers has you have categories, so for example here for bananas
    // we would have 2 values because we have two months:
    // bananaSerie = {
    //   name: 'banana';
    //   data: [123, 456];
    // }
    // Then we add the serie to the array of series:
    // this.chartConfig.series.push(bananaSerie).
    // In our example we would have two series (one for banana, one for apple).
    this.chartConfig = {
      // Main title.
      header: {
        title: 'Inventory'
      },
      height: 500,
      yAxis: {
        title: 'Amount'
      },
      xAxis: {
        title: 'Months',
        categories
      },
      series
    }

    // Clearing the busy indicator.
    this.completeBusyIndicatorObserver();
  }

  // Triggered when we click on a column.
  onColumnClick($event): void {
    this.rxNotificationService.addInfoMessage(`On the month ${$event.axisCategory} we had ${$event.value} ${$event.categoryId}.`);
  }

  // Used for the busy indicator, we set an observer and will complete it
  // when we want to.
  private waitForDataGeneration(observer: Observer<any>): void {
    this.observer = observer;
  }

  // Triggering the busy indicator. For this we need to set the configuration
  // again with a new Observable.
  private triggerBusyIndicator() {
    // Setting the busy indicator configuration again using the
    // default configuration.
    this.busyConfigSection = {
      ...this.defaultBusyConfig,
      ...{
        busy: new Observable(this.waitForDataGeneration.bind(this)).subscribe()
      }
    };
  }

  // Completing the observer used for the busy indicator.
  private completeBusyIndicatorObserver(): void {
    // Setting the observer to next / complete will "free" the busy indicator.
    // The setTimeout is necessary so the busy indicator is displayed properly
    // and respects the minDuration.
    setTimeout(() => {
      this.observer.next('');
      this.observer.complete();
    });
  }
}
