import { Component } from '@angular/core';

@Component({
  selector: 'appRoot',
  template: ` <main>
    <section class="content">
      <ul>
        <li>
          <a [routerLink]="['/table']" > 表格 GPT</a>
        </li>
        <li>
          <a [routerLink]="['/expansion-table']" > 表格(展開有問題)</a>
        </li>
      </ul>

      <router-outlet></router-outlet>
    </section>
  </main>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = '練習1';
}
