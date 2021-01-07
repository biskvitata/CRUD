import { ListUsersService } from './../services/list-users.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'avatar', 'email', 'firstName', 'lastName', 'actions'];
  currentPage = 1;
  usersList: User[] = [];
  isLoading = true;
  hasMoreData = true;
  isLoadingMore: boolean;
  smallSpinnerDiameter = 20;
  bigSpinnerDiameter = 60;
  subscriptionList: Subscription[] = [];
  usersActions = ['edit', 'delete'];
  deleteInProgress: boolean;
  deteleButtonClickedId: number;

  constructor(
    private listUsersService: ListUsersService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(isLoadingMore?: boolean): void {
    if (isLoadingMore) {
      this.isLoadingMore = true;
    }

    if (this.hasMoreData) {
      this.subscriptionList.push(
        this.listUsersService.getUsers(this.currentPage).subscribe(res => {
          const formattedRes = res.data.map(person => {
            return {
              id: person.id,
              avatar: person.avatar,
              firstName: person.first_name,
              lastName: person.last_name,
              email: person.email
            }
          });
          this.usersList = [...this.usersList, ...formattedRes];
          this.isLoading = false;
          this.isLoadingMore = false;
          this.checkPagination(res);
          this.currentPage++;
      }));
    }
  }

  checkPagination(latestData): void {
    if (latestData.total_pages > this.currentPage) {
      this.hasMoreData = true;
    } else {
      this.hasMoreData = false;
    }
  }

  createUser(): void {
    this.router.navigate(['/create-user']);
  }

  goToEditUser(id:number): void {
    this.router.navigate([`/update/edit/${id}`]);
  }

  openDialog(id:number, firstName: string, lastName: string): void {
    this.deteleButtonClickedId = id;
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '250px',
      data: {id, firstName, lastName}
    });

    dialogRef.afterClosed().subscribe((result:number) => {
      if (result) {
        this.deleteInProgress = true;
        this.deleteUser(result);
      }
    });
  }

  deleteUser(id: number): void {
    this.subscriptionList.push(
      this.listUsersService.deleteUser(id).subscribe(res => {
        this.usersList = this.usersList.filter(user => user.id !== id);

        this.snackBar.open('User Successfully Deleted', 'Okay', {
          duration: 3000
        });

        this.deleteInProgress = false;
      }))
  }

  ngOnDestroy(): void {
    if (this.subscriptionList.length > 0) {
      this.subscriptionList.forEach(subscription => subscription.unsubscribe())
    }
  }
}
