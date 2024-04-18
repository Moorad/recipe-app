import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TruncatePipe } from './truncate.pipe';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LoadingSpinnerComponent, TruncatePipe],
  imports: [CommonModule, NgbModule, NgbDropdownModule],
  exports: [
    LoadingSpinnerComponent,
    TruncatePipe,
    CommonModule,
    NgbModule,
    NgbDropdownModule,
  ],
})
export class SharedModule {}
