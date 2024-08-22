import { Component, Input } from '@angular/core';
import { UserPreferencesDesignModel } from './user-preferences-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-user-preferences-design',
  // LMA:: TODO:: Add css declaration in schematics.
  styleUrls: ['./user-preferences-design.scss'],
  templateUrl: './user-preferences-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserPreferencesDesignComponent {
  @Input()
  model: UserPreferencesDesignModel;
}
