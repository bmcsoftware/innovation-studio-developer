import { Component, Input } from '@angular/core';
import { CodeViewerDesignModel } from './code-viewer-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-code-viewer-design',
  styleUrls: ['./code-viewer-design.scss'],
  templateUrl: './code-viewer-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CodeViewerDesignComponent {
  @Input()
  model: CodeViewerDesignModel;
}
