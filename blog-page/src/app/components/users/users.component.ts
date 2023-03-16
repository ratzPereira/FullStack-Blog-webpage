import { Component, OnInit } from '@angular/core';
import {
  UserData,
  UserService,
} from '../../services/user-service/user.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  dataSource: UserData | undefined;
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'username'];

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.userService
      .findAll(1, 10)
      .pipe(
        tap((users) => console.log(users)),
        map((userData: UserData) => (this.dataSource = userData))
      )
      .subscribe();
  }
}
