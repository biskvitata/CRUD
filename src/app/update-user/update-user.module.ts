import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpdateUserComponent } from './update-user/update-user.component';


@NgModule({
  declarations: [UpdateUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'edit/:id',
        component: UpdateUserComponent,
      }
    ]),
  ]
})
export class UpdateUserModule {
}
