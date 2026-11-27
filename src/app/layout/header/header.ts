import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user-service';
import { AuthService } from '../../core/services/auth-service';

@Component({
  imports: [RouterModule],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  userService = inject(UserService);
  authService = inject(AuthService);

  isLoggedIn: boolean = false;

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userService.getUser();
      this.isLoggedIn = true;
    }
  }

  isUserBurgerOn = signal<boolean>(false);

  userBurger() {
    this.isUserBurgerOn.set(!this.isUserBurgerOn());
  }
}
