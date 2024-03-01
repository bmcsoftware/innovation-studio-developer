import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DisplayGradientDesignModel } from './display-gradient-design.model';
import { IDisplayGradientParameters } from './display-gradient.interface';
import { GradientService } from '../../../inspectors/gradient/gradient.service';
import { GRADIENT_COMPONENT_OPTIONS } from '../../../inspectors/gradient/gradient.types';
import { combineLatest } from 'rxjs';
import {GradientModule} from "../../../inspectors/gradient/gradient.module";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'com-example-test210500-com-example-test210500-display-gradient-design',
  styleUrls: ['./display-gradient-design.scss'],
  templateUrl: './display-gradient-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, GradientModule]
})
export class DisplayGradientDesignComponent implements AfterViewInit{
  // We get the div to use it later to draw the gradient.
  @ViewChild('gradientDivElement', {static: false})
  gradientDivElement: ElementRef;

  @Input()
  model: DisplayGradientDesignModel;

  private gradientLeftValue = GRADIENT_COMPONENT_OPTIONS.defaultValues.left;
  private gradientRightValue = GRADIENT_COMPONENT_OPTIONS.defaultValues.right;

  constructor(private gradientService: GradientService) {
  }

  ngOnInit(): void {
    // We subscribe to the component input parameters to receive their values when modified
    // in the inspectors so we can update the view component gradient.
    combineLatest([this.model.modelSandbox.componentProperties$])
      .subscribe(([componentProperties]) => {
        const inputParameters = componentProperties as IDisplayGradientParameters;

        // The gradient has the structure 'leftValue|rightValue', such as:
        // '#000000|#FFFFFF'
        this.gradientLeftValue = this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.left, inputParameters.gradient);
        this.gradientRightValue = this.gradientService.extractGradientInformation(GRADIENT_COMPONENT_OPTIONS.sides.right, inputParameters.gradient);
        this.gradientService.drawGradient(this.gradientDivElement, this.gradientLeftValue, this.gradientRightValue);
      });
  }

  ngAfterViewInit(): void {
    // The first drawGradient call (in the ngOnInit()) will fail as the component is not yet in the DOM,
    // hence the use of ngAfterViewInit() for the initial draw.
    this.gradientService.drawGradient(this.gradientDivElement, this.gradientLeftValue, this.gradientRightValue);
  }
}
