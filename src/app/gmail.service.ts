import { Injectable } from '@angular/core';

declare const gapi: any;

const CLIENT_ID = '215489991074-uuhrqgomio4sobrsolopn8cknj7hvpce.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/gmail.send';

@Injectable({
  providedIn: 'root'
})
export class GmailService {
  private gmail: any;

  constructor() {
    gapi.load('client:auth2', this.initClient.bind(this));
  }

  private initClient() {
    console.log('init')
    gapi.client.init({
      apiKey: 'AIzaSyCg4f8CF0Vo07eTrR6htmQYUwNI7Xh36cY',
      clientId: CLIENT_ID,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
      scope: SCOPES,
      plugin_name: "MyDocAppPlugin"
    }).then(() => {
      this.gmail = gapi.client.gmail;
      console.log(this.gmail)
    });
  }

  public signIn() {
    return gapi.auth2.getAuthInstance().signIn({prompt: 'consent'});
  }

  public signOut() {
    return gapi.auth2.getAuthInstance().signOut();
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
