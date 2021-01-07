import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/dialog-data';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
