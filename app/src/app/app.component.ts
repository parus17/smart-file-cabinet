import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {label: 'Boeken', routerLink: 'boeken'},
      {label: 'Strips', routerLink: 'strips'},
      {label: 'Recepten', routerLink: 'recepten'}
    ];
  }
}
