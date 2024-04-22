import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthResponse, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [LoadingSpinnerComponent, CommonModule, FormsModule],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLogin: boolean = false;
  isLoading: boolean = false;
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    const { email, password } = form.value;

    let authObservable: Observable<AuthResponse>;

    this.isLoading = true;

    if (this.isLogin) {
      authObservable = this.authService.loginUser(email, password);
    } else {
      authObservable = this.authService.registerUser(email, password);
    }

    authObservable.subscribe({
      next: () => {
        this.router.navigate(['/recipes']);
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      },
    });

    form.reset();
  }
}
