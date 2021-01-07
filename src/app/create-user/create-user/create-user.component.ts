import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateUserService } from '../services/create-user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers: [DatePipe]
})
export class CreateUserComponent implements OnDestroy {

  isCreatingUser: boolean;
  smallSpinnerDiameter = 20;

  createUserform = new FormGroup({
    name: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required)
  });

  createUserSubscription: Subscription;

  constructor(
    private router: Router,
    private createUserService: CreateUserService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) { }

  goToHomepage(): void {
    this.router.navigate(['/list-users']);
  }

  createUser(): void {
    this.isCreatingUser = true;

    this.createUserSubscription = this.createUserService
      .createUser(this.createUserform.getRawValue()).subscribe(res => {
        const dateTimeNow = this.datePipe.transform(res.createdAt, 'dd-MM-yyyy hh:mm:ss');
        this.isCreatingUser = false;
        this.snackBar.open(`User Successfully Created at ${dateTimeNow}`, 'Okay', {
          duration: 3000
        });
      })
  }

  ngOnDestroy(): void {
    if (this.createUserSubscription) {
      this.createUserSubscription.unsubscribe();
    }
  }
}
