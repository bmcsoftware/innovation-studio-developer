import { Component, Input } from '@angular/core';
import { AdminPreferencesDesignModel } from './admin-preferences-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-admin-preferences-design',
  styleUrls: ['./admin-preferences-design.scss'],
  templateUrl: './admin-preferences-design.component.html'
})
export class AdminPreferencesDesignComponent {
  @Input()
  model: AdminPreferencesDesignModel;
}
