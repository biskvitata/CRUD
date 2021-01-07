import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UpdateUserService } from '../services/update-user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit, OnDestroy {

  isLoading = true;
  subscriptionList: Subscription[] = [];
  currentUser: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private updateUserService: UpdateUserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any)=>{
      this.loadUser(params.params.id)
     }); 
  }

  loadUser(id: number): void {
    this.subscriptionList.push(
      this.updateUserService.getUser(id).subscribe(res => {
        this.currentUser = res.data;
        this.isLoading = false;
    }))
  }

  ngOnDestroy(): void {
    if (this.subscriptionList.length > 0) {
      this.subscriptionList.forEach(subscription => subscription.unsubscribe())
    }
  }
}
