import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user/user.service';
import { GiphyService } from '../shared/giphy/giphy.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent implements OnInit {
  users: Array<any>;

  constructor(private userService: UserService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(data => {
      this.users = data;

 for (const user of this.users) {
        this.giphyService.get(user.name).subscribe(url => user.giphyUrl = url);
      }
    });
  }
}


