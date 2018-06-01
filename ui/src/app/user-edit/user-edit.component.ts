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

    this.userService.getInfo().subscribe( data => {
      this.info = data;
      this.info.forEach(function(element) {
        // element.agency_name.indexOf("housing") !== -1

        if(element.agency_name.includes("Housing")){
          console.log("filtered", element.agency_name);
        }
      });
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
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.userService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  // search(job, hobby){
  //   this.userService.getInfo().subscribe(data => {
  //     this.info = data;
  //
  //     if(job || hobby ==)
  //     console.log("list", this.info);
  //   });
  // }
}
