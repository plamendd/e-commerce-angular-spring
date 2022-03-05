import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName:string;

  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktAuth: OktaAuth) { }

 async ngOnInit(): Promise<void> {
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
         this.getUserDetails();
      }
    )
  }
  getUserDetails() {
    if(this.isAuthenticated){
      //Fetch the logged in user details (user's claims)
      //
      // user full name is exposed as a property name
      this.oktAuth.getUser().then(
        res => {
          this.userFullName = res.name!;
        }
      );
    }
  }
  logout(){
    //Terminates the session with Okta and removes current tokens.
    this.oktAuth.signOut();
  }

}
