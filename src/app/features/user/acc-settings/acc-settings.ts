import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/services/user-service';

@Component({
  imports: [],
  selector: 'app-acc-settings',
  styleUrl: './acc-settings.scss',
  templateUrl: './acc-settings.html',
})
export class AccSettings {
  userService = inject(UserService);

  deleteConfirm() {
    const userAnswer = confirm('r you sure bruh');

    if (userAnswer) {
      this.userService.deleteAccount();
    }
  }
}
