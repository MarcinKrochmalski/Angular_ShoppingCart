import { Component, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-preload',
  templateUrl: './preload.component.html',
  styles: [],
  animations: [

    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 1 })
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.6s', style({ opacity: 0 }))
      ])
    ])

  ]
})
export class PreloadComponent {

  @Input() active: boolean;

}
