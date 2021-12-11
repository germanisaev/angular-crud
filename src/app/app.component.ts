import { Component, OnInit } from '@angular/core';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-discont';
  /* users: User[] = [];
  
  constructor(private service: UserService) {
  }

  ngOnInit():void {
    this.service.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    });
  } */

}
