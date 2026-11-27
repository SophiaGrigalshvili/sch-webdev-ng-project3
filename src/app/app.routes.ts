import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Shop } from './features/shop/shop';
import { Details } from './features/details/details';
import { Cart } from './features/cart/cart';
import { Registration } from './features/auth/registration/registration';
import { Login } from './features/auth/login/login';
import { EmailVerify } from './features/auth/email-verify/email-verify';
import { ResetPassword } from './features/auth/reset-password/reset-password';
import { ResetPasswordTokenPage } from './features/auth/reset-password-token-page/reset-password-token-page';
import { User } from './features/user/user/user';
import { UserDetails } from './features/user/user-details/user-details';
import { ChangePsword } from './features/user/change-psword/change-psword';
import { AccSettings } from './features/user/acc-settings/acc-settings';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Foodie',
  },
  {
    path: 'menu',
    component: Shop,
    title: 'Foodie | Menu',
  },
  {
    path: 'details/:id',
    component: Details,
    title: 'Foodie | Details',
  },
  {
    path: 'Cart',
    component: Cart,
    title: 'Foodie | Cart',
  },
  {
    path: 'register',
    component: Registration,
    title: 'Foodie | Sign Up',
  },
  {
    path: 'login',
    component: Login,
    title: 'Foodie | Sign In',
  },
  {
    path: 'verify',
    component: EmailVerify,
    title: 'Foodie | Verify',
  },
  {
    path: 'reset-password',
    component: ResetPassword,
    title: 'Foodie | Reset Password',
  },
  {
    path: 'reset-password/token=:token',
    component: ResetPasswordTokenPage,
    title: 'Foodie | Reset Password',
  },
  {
    path: 'profile',
    component: User,
    children: [
      {
        path: '',
        component: UserDetails,
        title: 'Foodie | Profile',
      },
      {
        path: 'change-password',
        component: ChangePsword,
        title: 'Foodie | Profile',
      },
      {
        path: 'settings',
        component: AccSettings,
        title: 'Foodie | Profile',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
