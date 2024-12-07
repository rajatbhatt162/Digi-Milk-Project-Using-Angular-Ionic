import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Unauthorized</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="unauthorized-container">
        <h2>You are not authorized to access this page.</h2>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .unauthorized-container {
        text-align: center;
        margin-top: 50px;
      }
    `
  ]
})
export class UnauthorizedComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
