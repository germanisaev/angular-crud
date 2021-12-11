import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public user: User;
  public users: User[];

  constructor(private _service: UserService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this._service.getUsers()
      .subscribe((user: User[]) => this.users = user);
  }

  selected(user: any) {
    this.user = user;
  }

}
