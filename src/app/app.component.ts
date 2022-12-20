import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './interfaces/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularhttp';
  public users: User[] = [];
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


  private otherUser: User = {
    "id": 7,
    "name": "Karl Marx",
    "username": "Karl",
    "email": "Karl@billy.biz",
    "address": {
      "street": "Rex Trail",
      "suite": "Suite 280",
      "city": "Howemouth",
      "zipcode": "58804-1099",
      "geo": {
        "lat": "24.8918",
        "lng": "21.8984"
      }
    },
    "phone": "210.067.6132",
    "website": "elvis.io",
    "company": {
      "name": "Johns Group",
      "catchPhrase": "Configurable multimedia task-force",
      "bs": "generate enterprise e-tailers"
    }
  }

  private patchUser = {
    "id": 5,
    "name": "Weee",
    "email": "foo@bar.com"
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.onGetUsers();
    this.onGetUser();
    this.onCreateUser();
    this.onUpdateUser();
    this.onPatchUser();
    this.onDeleteUser();
    this.onGetTextFile();
    this.onGetBlobFile();
  }

  onGetUsers(): void {
    this.userService.getUsers().subscribe(
      {
        next: (res) => {
          console.log(res);
          this.users = res;
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

  onUpdateUser(): void {
    this.userService.updateUser(this.otherUser).subscribe(res => {
      console.log(res);
    })
  }

  onPatchUser(): void {
    this.userService.updateUserWithPatch(this.patchUser).subscribe(res => {
      console.log(res);
    })
  }

  onDeleteUser(): void {
    this.userService.deleteUser(2).subscribe(res => {
      console.log(res);
    })
  }

  onGetTextFile(): void {
    this.userService.getTextFile().subscribe(res => {
      console.log(res);
    })
  }

  onGetBlobFile(): void {
    this.userService.getBlobFile().subscribe(res => {
      console.log(res);
    })
  }
}
