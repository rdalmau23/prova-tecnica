import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserList } from './pages/user-list/user-list';
import { UserProfileComponent } from './pages/user-profile/user-profile';
import { UserForm } from './pages/user-form/user-form';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserList },
  { path: 'new', component: UserForm },
  { path: 'profile/:id', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
