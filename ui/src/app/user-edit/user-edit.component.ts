import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user/user.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})


export class UserEditComponent implements OnInit, OnDestroy {
  user: any = {};
  results: Array<any>;

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private giphyService: GiphyService) {
  }

ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.userService.get(id).subscribe((user: any) => {
          if (user) {
            this.user = user;
            this.user.href = user._links.self.href;
            this.giphyService.get(user.name).subscribe(url => user.giphyUrl = url);
          } else {
            console.log(`user with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });

  } //oninit

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/user-list']);
  }

  save(form: NgForm) {
    this.userService.save(form).subscribe(result => {
      this.userService.getInfo().subscribe( data => {
        this.results = data;
        this.results.forEach(function(element) {

          if(element.agency_name.includes(result.occupation) || element.agency_name.includes(result.hobby) ){
            console.log("filtered", element.agency_name);
          }
        });
      });

      // this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.userService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}
