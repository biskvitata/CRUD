import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UpdateUserService } from '../services/update-user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  providers: [DatePipe]
})
export class UpdateUserComponent implements OnInit, OnDestroy {

  urlValidatorRegEx = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  isLoading = true;
  subscriptionList: Subscription[] = [];
  currentUser: User;
  isUpdatingUser: boolean;
  smallSpinnerDiameter = 20;
  bigSpinnerDiameter = 60;

  updateUserForm = new FormGroup({
    avatar: new FormControl('', [Validators.required, Validators.pattern(this.urlValidatorRegEx)]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private updateUserService: UpdateUserService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any)=>{
      this.loadUser(params.params.id)
     }); 
  }

  loadUser(id: number): void {
    this.subscriptionList.push(
      this.updateUserService.getUser(id).subscribe(res => {
        this.currentUser = res;
        this.setFormFields();
        this.isLoading = false;
    }))
  }

  setFormFields() {
    this.updateUserForm.get("avatar").setValue(this.currentUser.avatar);
    this.updateUserForm.get("firstName").setValue(this.currentUser.firstName);
    this.updateUserForm.get("lastName").setValue(this.currentUser.lastName);
    this.updateUserForm.get("email").setValue(this.currentUser.email);
  }

  goToHomepage(): void {
    this.router.navigate(['/list-users']);
  }

  updateUser(): void {
    this.isUpdatingUser = true;

    this.subscriptionList.push(
      this.updateUserService.updateUser(this.currentUser.id, this.updateUserForm.getRawValue())
        .subscribe(res => {
          const dateTimeNow = this.datePipe.transform(res.updatedAt, 'dd-MM-yyyy hh:mm:ss');
          this.isUpdatingUser = false;
          this.snackBar.open(`User Successfully Updated at ${dateTimeNow}`, 'Okay', {
            duration: 3000
          });
        })
    )
  }

  ngOnDestroy(): void {
    if (this.subscriptionList.length > 0) {
      this.subscriptionList.forEach(subscription => subscription.unsubscribe())
    }
  }
}
