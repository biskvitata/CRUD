import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: "create-user",
    loadChildren: () => import('./create-user/create-user.module').then(m => m.CreateUserModule),
  },
  {
    path: "list-users",
    loadChildren: () => import('./list-delete-users/list-delete-users.module').then(m => m.ListDeleteUsersModule),
  },
  {
    path: "update",
    loadChildren: () => import('./update-user/update-user.module').then(m => m.UpdateUserModule),
  },
  {
    path: '**',
    redirectTo: '/list-users',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
