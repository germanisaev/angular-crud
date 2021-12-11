import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  @Input() public users: User[];
  @Output() public userSelected = new EventEmitter<User>();
  selectUser(user: User) {  
    this.userSelected.emit(user); 
    this.userDetail = user;   
  }
  
  userDetail?: User;
  searchText: string = '';
  sortText: string = '';
  closeResult: string = '';

  constructor(private service: UserService) {}

  ngOnInit():void {
    this.service.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    });
  }

  deleteUser(id: any) {  
    if(confirm("Are you sure to delete?")) { 
      this.service.deleteUser(id).subscribe(response => console.log(response));
      this.users = this.users.filter(x => x.id !== id); 
    }
  }

}
