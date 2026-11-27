import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/services/user-service';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLinkWithHref],
  selector: 'app-user',
  styleUrl: './user.scss',
  templateUrl: './user.html',
})
export class User {}
