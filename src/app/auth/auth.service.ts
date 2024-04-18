import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private expirationTimer: ReturnType<typeof setTimeout>;

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleUserEmission(
            res.email,
            res.localId,
            res.idToken,
            Number(res.expiresIn)
          );
        })
      );
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleUserEmission(
            res.email,
            res.localId,
            res.idToken,
            Number(res.expiresIn)
          );
        })
      );
  }

  logoutUser() {
    this.user.next(null);
    localStorage.removeItem('user');

    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }

    this.expirationTimer = null;

    this.router.navigate(['/auth']);
  }

  loadStoredUser() {
    const user: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } | null = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      return;
    }

    const parsedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if (parsedUser.token) {
      const expiresIn =
        new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.removeStoredUserAfter(expiresIn);
      this.user.next(parsedUser);
    }
  }

  removeStoredUserAfter(expiresInMiliseconds: number) {
    this.expirationTimer = setTimeout(() => {
      this.logoutUser();
    }, expiresInMiliseconds);
  }

  private handleUserEmission(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    // expiresIn is the number of seconds it will expire in, multiplying it by a 1000 gives us the miliseconds, adding the current date gives us the date in which it will expire.
    const expirationDate = new Date(
      new Date().getTime() + Number(expiresIn) * 1000
    );

    const user = new User(email, id, token, expirationDate);
    localStorage.setItem('user', JSON.stringify(user));
    this.removeStoredUserAfter(expiresIn * 1000);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'The email or password is incorrect';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This user has been disabled by an administrator';
        break;
    }

    return throwError(() => errorMessage);
  }
}
