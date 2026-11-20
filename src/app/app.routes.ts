import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Shop } from './features/shop/shop';
import { Details } from './features/details/details';
import { Cart } from './features/cart/cart';
import { Registration } from './features/auth/registration/registration';
import { Login } from './features/auth/login/login';

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
    path: 'signin',
    component: Login,
    title: 'Foodie | Sign In',
  },

  //add reset password and verification

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
