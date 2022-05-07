import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Boek} from "./model/boek";
import {Status} from "./model/status";
import {v4 as uuidv4} from "uuid";
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-boeken',
  templateUrl: './boeken.component.html',
  styleUrls: ['./boeken.component.css']
})
export class BoekenComponent implements OnInit {
  boeken: Boek[] = [];
  selectedBoeken: Boek[] = [];

  boek: Boek = {};
  statussen: Status[] = [];
  boekDialog: boolean = false;
  submitted: boolean = false;

  constructor(private http: HttpClient, private messageService: MessageService, private confirmationService: ConfirmationService) {
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

    if (this.boek.id) {
      let id = this.boek.id;
      this.http.put('/api/boeken/' + id, this.boek).subscribe(updatedBoek => {
        this.boeken[this.findIndexById(id)] = updatedBoek;
        this.messageService.add({severity:'success', summary: 'Bevestiging', detail: 'Boek bijgewerkt', life: 3000});
      });
    } else {
      this.boek.id = uuidv4();
      this.http.post('/api/boeken', this.boek).subscribe(storedBoek => {
        this.boeken.push(storedBoek);
        this.messageService.add({severity:'success', summary: 'Bevestiging', detail: 'Boek aangemaakt', life: 3000});
      });
    }

    this.boeken = [...this.boeken];
    this.boekDialog = false;
    this.boek = {};
  }

  editBoek(boek: Boek) {
    this.boek = {...boek};
    this.boekDialog = true;
  }

  deleteBoek(boek: Boek) {
    this.confirmationService.confirm({
      message: 'Ben je zeker dat je dit boek wil verwijderen?',
      header: 'Bevestig',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.delete('/api/boeken/' + boek.id).subscribe(() => {
          this.boeken = this.boeken.filter(val => val.id !== boek.id);
          this.boek = {};
          this.messageService.add({severity: 'success', summary: 'Bevestiging', detail: 'Boek verwijderd', life: 3000});
        });
      }
    });
  }

  deleteSelectedBoeken() {

  }

  findIndexById(id?: string): number {
    let number = this.boeken.findIndex(value => value.id == id);

    console.log(number);


    // let index = -1;
    // for (let i = 0; i < this.boeken.length; i++) {
    //   if (this.boeken[i].id === id) {
    //     index = i;
    //     break;
    //   }
    // }

    return number;
  }
}
