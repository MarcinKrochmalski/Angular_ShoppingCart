import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []

})
export class HeaderComponent {

  @Input() title: string;
  @Input() step: number;
  @Output() StepEmitter = new EventEmitter<number>();

  switchSteps(step: number): void {
    this.StepEmitter.emit(step);
  }

}
