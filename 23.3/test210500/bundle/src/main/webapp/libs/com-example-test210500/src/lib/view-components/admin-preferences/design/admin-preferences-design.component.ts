import { Component, Input } from '@angular/core';
import { AdminPreferencesDesignModel } from './admin-preferences-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-admin-preferences-design',
  styleUrls: ['./admin-preferences-design.scss'],
  templateUrl: './admin-preferences-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminPreferencesDesignComponent {
  @Input()
  model: AdminPreferencesDesignModel;
}
