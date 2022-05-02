import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Boek} from "./model/boek";
import {Status} from "./model/status";

@Component({
  selector: 'app-boeken',
  templateUrl: './boeken.component.html',
  styleUrls: ['./boeken.component.css']
})
export class BoekenComponent implements OnInit {
  boeken: Boek[] = [];
  selectedBoeken: Boek[] = [];
  // cols: any[] = [];

  boek: Boek = {};
  statussen: Status[] = [];
  boekDialog: boolean = false;
  submitted: boolean = false;

  constructor(private http: HttpClient) {
    this.statussen = [
      {name: 'In bibliotheek', code: 'In bibliotheek'},
      {name: 'Op verlanglijst', code: 'Op verlanglijst'}
    ];
  }

  ngOnInit(): void {
    this.http.get('/api/boeken')
      .subscribe((boeken: any) => {
        return this.boeken = boeken;
      });

    // this.cols = [
    //   {field: 'auteur', header: 'Auteur'},
    //   {field: 'titel', header: 'Titel'},
    //   {field: 'isbn', header: 'ISBN'},
    //   {field: 'status', header: 'Status'}
    // ];
  }

  openNew() {
    this.boek = {};
    this.boekDialog = true;
    this.submitted = false;
  }

  hideDialog() {
    this.boekDialog = false;
    this.submitted = false;
  }

  saveBoek() {
    this.submitted = true;

  }

  editBoek(boek: Boek) {
    this.boek = {...boek};
    this.boekDialog = true;
  }

  deleteBoek(boek: Boek) {

  }

  deleteSelectedBoeken() {

  }
}
