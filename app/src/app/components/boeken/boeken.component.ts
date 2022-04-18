import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Boek} from "./model/boek";

@Component({
  selector: 'app-boeken',
  templateUrl: './boeken.component.html',
  styleUrls: ['./boeken.component.css']
})
export class BoekenComponent implements OnInit {
  boeken: Boek[] = [];
  cols: any[] = [];

  constructor(private http: HttpClient) {
    //
  }

  ngOnInit(): void {
    this.http.get('/api/boeken')
      .subscribe((boeken: any) => {
        return this.boeken = boeken;
      });

    this.cols = [
      {field: 'auteur', header: 'Auteur'},
      {field: 'titel', header: 'Titel'},
      {field: 'isbn', header: 'ISBN'},
      {field: 'status', header: 'Status'}
    ];
  }

}
