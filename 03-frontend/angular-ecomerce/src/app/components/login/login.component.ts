import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import myAppConfig from 'src/app/config/my-app-config';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { OktaAuth, Tokens } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  okstaSignin: any; 

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.okstaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      cliendId: myAppConfig.oidc.cliendId,
      redirectUri: myAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      },
      
    
      
    }
    );
  }

  ngOnInit(): void {
    this.okstaSignin.remove();
    this.okstaSignin.renderEl({
      el: '#okta-sign-in-widget'
    }, //this name should be the same as div tag id in login.component.html
      (response : any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect()
        }
      },
      (error : any) => {
        throw error;
      }

    );
  }

}
