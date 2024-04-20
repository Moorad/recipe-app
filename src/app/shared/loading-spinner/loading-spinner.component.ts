import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-loading-spinner',
  template:
    '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
  styleUrl: './loading-spinner.component.css',
})
export class LoadingSpinnerComponent {}
