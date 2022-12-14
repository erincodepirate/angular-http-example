import { Component, OnInit } from '@angular/core';
import { User } from './interfaces/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularhttp';
  private user: User = {
		"name": "Beavis",
		"username": "Buttmunch",
		"email": "beavis@blah.com",
		"address": {
			"street": "Somewhere",
			"suite": "Apt. 1234",
			"city": "Leningrad",
			"zipcode": "95108",
			"geo": {
				"lat": "-37.3159",
				"lng": "81.1496"
			}
		},
		"phone": "1-555-555-5555 x55555",
		"website": "hildegard.org",
		"company": {
			"name": "Huxters International",
			"catchPhrase": "Huxting to the max",
			"bs": "crypto is cringe"
		}
	}

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.onGetUsers();
    this.onGetUser();
    this.onCreateUser();
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

  onCreateUser(): void {
    this.userService.createUser(this.user).subscribe(res => {
      console.log(res);
    })
  }
}
