import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { IFloatingPanelParameters } from '../design/floating-panel.interface';
import { DynamicScriptLoaderServiceService } from '../../../services/dynamic-service-loader.service';
import { GetAssetPathService } from '../../../services/get-asset-path.service';
import { RxGuidService } from '@helix/platform/utils';
import { FLOATING_PANEL_OPTIONS } from './floating-panel.types';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RxViewComponent } from '@helix/platform/view/api';

// jsPanel is a pure javascript library so needs to be declared as any
// to avoid compilation errors.
declare var jsPanel: any;

// Note:
// The css styles need to be "global" and so are defined in the file:
// src/main/webapp/libs/com-example-test210500/src/lib/assets/_global-styles.scss

// This component will load the jsPanel pure javascript script and its css
// and display an Innovation Studio view inside the panel.
@Component({
  selector: 'com-example-test210500-com-example-test210500-floating-panel',
  styleUrls: ['./floating-panel.scss'],
  templateUrl: './floating-panel.component.html',
  standalone: true,
  imports: [CommonModule]
})
@RxViewComponent({
  name: 'comExampleTest210500FloatingPanel'
})
export class FloatingPanelComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  floatingPanel: string;

  private componentData: IFloatingPanelParameters;
  private panelObject = null;
  private panelGuid = this.rxGuidService.generate('panel-');
  private iFrameGuid = this.rxGuidService.generate('iframe-');

  constructor(private dynamicScriptLoaderServiceService: DynamicScriptLoaderServiceService,
              private getAssetPathService: GetAssetPathService,
              private rxGuidService: RxGuidService) {
    super();
  }

  ngOnInit() {
    this.config.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((config: IFloatingPanelParameters) => {
      const promises: any[] = [];
      // The assets url changes when the code is executed from debug mode or production mode.
      const assetFolderPath = this.getAssetPathService.getAssetRootPath('com.example.test210500');

      this.componentData = config;

      // Creating the panel if necessary, only if it does not exist already with the same Id.
      if (this.componentData.panelIdentifier && document.getElementById(this.componentData.panelIdentifier)) {
        return;
      }

      // We need to load the different jsPanel script and css before being able using it.
      // We could declare the scripts in the dynamicScriptLoaderServiceService array directly but in this example
      // we are going to load them from the library /assets/ folder.
      promises.push(this.dynamicScriptLoaderServiceService.loadScriptByUrl(assetFolderPath + 'scripts/jspanel-4.11.3/jspanel.js', 'jspaneljs'));
      promises.push(this.dynamicScriptLoaderServiceService.loadStylesheetByUrl(assetFolderPath + 'scripts/jspanel-4.11.3/jspanel.css', 'jspanelcss'));

      Promise.all(promises).then((result) => {
        this.createPanel();
      });
    });
  }

  private createPanel(): void {
    const me = this;
    const url = '/helix/index.html#/com.example.test210500/iview/' + this.componentData.viewName;

    const config = FLOATING_PANEL_OPTIONS.defaultPanelConfiguration;

    // Adding the panel guid.
    config.id = this.componentData.panelIdentifier || this.panelGuid;

    // Changing the Panel Title.
    config.headerTitle = config.headerTitle.replace('%PANEL_TITLE%', this.componentData.panelTitle);

    // Changing the iFrame url and guid.
    config.content = config.content.replace('%IFRAME_URL%', url);
    config.content = config.content.replace('%IFRAME_GUID%', this.iFrameGuid);

    // Implementing the code executed when the user clicks on the panel close button.
    // The panel will be minimized.
    config.onbeforeclose = () => {
      me.panelObject.minimize();

      return false;
    }

    this.panelObject = jsPanel.create(config).setTheme(FLOATING_PANEL_OPTIONS.defaultPanelTheme);
  }
}
