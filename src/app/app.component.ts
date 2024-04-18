import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'recipe-book-app';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loadStoredUser();
  }
}
