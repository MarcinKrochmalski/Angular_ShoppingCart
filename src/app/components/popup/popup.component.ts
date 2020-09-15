import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: [],
  animations: [

    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.1s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.5s', style({ opacity: 0 }))
      ])
    ])

  ]
})
export class PopupComponent {

  @Input() active: boolean;
  @Input() message: string;
  @Input() texts: any;
  @Input() activeButton: boolean;
  @Output() closeEmitter = new EventEmitter<boolean>();

  close(): void {

    this.closeEmitter.emit(false);

  }



}
