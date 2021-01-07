import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';


@NgModule({
  declarations: [ListUsersComponent, DeleteUserDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListUsersComponent,
      }
    ]),
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class ListDeleteUsersModule {
}
