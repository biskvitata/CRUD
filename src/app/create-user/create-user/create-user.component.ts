import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateUserService } from '../services/create-user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnDestroy {

  isCreatingUser: boolean;
  smallSpinnerDiameter = 20;

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    job: new FormControl('', Validators.required)
  });

  createUserSubscription: Subscription;

  constructor(
    private router: Router,
    private createUserService: CreateUserService,
    private snackBar: MatSnackBar
  ) { }

  goToHomepage(): void {
    this.router.navigate(['/list-users']);
  }

  createUser(): void {
    this.isCreatingUser = true;

    this.createUserSubscription = this.createUserService
      .createUser(this.form.getRawValue()).subscribe(res => {
        this.isCreatingUser = false;
        this.snackBar.open('User Successfully Created', 'Okay', {
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
