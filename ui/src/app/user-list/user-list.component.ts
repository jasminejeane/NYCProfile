import { UserService } from '../shared/user/user.service';

export class UserListComponent implements OnInit {
users: Array<any>;

constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    });
  }
}
