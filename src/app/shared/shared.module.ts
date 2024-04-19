import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TruncatePipe } from './truncate.pipe';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RoundPipe } from './round.pipe';

@NgModule({
  declarations: [LoadingSpinnerComponent, TruncatePipe, RoundPipe],
  imports: [CommonModule, NgbModule, NgbDropdownModule],
  exports: [
    LoadingSpinnerComponent,
    TruncatePipe,
    RoundPipe,
    CommonModule,
    NgbModule,
    NgbDropdownModule,
  ],
})
export class SharedModule {}
