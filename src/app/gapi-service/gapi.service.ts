import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod'
import { UserService } from '../user.service';
declare const gapi: any;

const CLIENT_ID = environment.GCLOUD_CLIENT_ID;
const SCOPES = 'https://www.googleapis.com/auth/gmail.send';

@Injectable({
  providedIn: 'root'
})
export class GapiService {
  private gmail: any;

  constructor(private userService: UserService) {
    gapi.load('client:auth2', this.initClient.bind(this));
  }

  private async initClient() {

    await gapi.client.init({
      apiKey: environment.GCLOUD_API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
      scope: SCOPES,
      plugin_name: "MyDocAppPlugin"
    }).then(() => {
      this.gmail = gapi.client.gmail;
    });

    if (this.isSignedIn()) {
      const user = await this.getUserData();
      this.userService.setUserData(user);
    } else {
      this.userService.setUserData(null);
    }
  }

  public async getUserData() {
    const gapiUser = await gapi.auth2.getAuthInstance().currentUser.get();
    const profile = gapiUser.getBasicProfile();

    let user = {
      displayName: await profile.getName(),
      email: await profile.getEmail(),
      photoURL: await profile.getImageUrl()
    }

    return user;
  }

  public signIn() {
    return gapi.auth2.getAuthInstance().signIn({ prompt: 'consent' });
  }

  public signOut() {
    return gapi.auth2.getAuthInstance().signOut();
  }

  public isSignedIn() {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
  }

  public sendEmail(email: { to: string, subject: string, body: string }) {
    const emailToSend = {
      userId: 'me',
      resource: {
        raw: btoa(
          `Content-Type: text/plain; charset=utf-8\n` +
          `To: ${email.to}\n` +
          `Subject: ${email.subject}\n\n` +
          `${email.body}`
        )
      }
    };

    return this.gmail.users.messages.send(emailToSend);
  }
}
