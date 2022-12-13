import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularhttp';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.onGetUsers();
    this.onGetUser();
  }

  onGetUsers(): void {
    this.userService.getUsers().subscribe(
      {
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log("Workers of the world unite!");
        }
      })
  }

  onGetUser(): void {
    this.userService.getUser().subscribe(
      {
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log("Workers of the world unite!");
        }
      })
  }
}
