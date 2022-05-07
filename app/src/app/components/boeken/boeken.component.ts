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
      .subscribe((boeken: any) => this.boeken = boeken);
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

    if (this.boek.isbn) {
      if (this.boek.id) {
        let id = this.boek.id;
        this.http.put('/api/boeken/' + id, this.boek).subscribe(updatedBoek => {
          this.boeken[this.findIndexById(id)] = updatedBoek;
          this.messageService.add({severity: 'success', summary: 'Bevestiging', detail: 'Boek bijgewerkt', life: 3000});
        });
      } else {
        this.boek.id = uuidv4();
        this.http.post('/api/boeken', this.boek).subscribe(storedBoek => {
          this.boeken.push(storedBoek);
          this.messageService.add({severity: 'success', summary: 'Bevestiging', detail: 'Boek aangemaakt', life: 3000});
        });
      }

      this.boeken = [...this.boeken];
      this.boekDialog = false;
      this.boek = {};
    }
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
        this.http
          .delete('/api/boeken/' + boek.id)
          .subscribe(() => {
            this.boeken = this.boeken.filter(val => val.id !== boek.id);
            this.boek = {};
            this.messageService.add({
              severity: 'success',
              summary: 'Bevestiging',
              detail: 'Boek verwijderd',
              life: 3000
            });
          });
      }
    });
  }

  deleteSelectedBoeken() {
    this.confirmationService.confirm({
      message: 'Ben je zeker dat je de geselecteerde boeken wil verwijderen?',
      header: 'Bevestig',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedBoeken.forEach(boek => {
          this.http
            .delete('/api/boeken/' + boek.id)
            .subscribe(() => this.boeken = this.boeken.filter(val => val.id !== boek.id));
        });
        this.selectedBoeken = [];
        this.messageService.add({severity: 'success', summary: 'Bevestiging', detail: 'Boeken verwijderd', life: 3000});
      }
    });

  }

  findIndexById(id?: string): number {
    return this.boeken.findIndex(value => value.id == id);
  }

  searchISBN() {
    this.http.get('/api/isbn/' + this.boek.isbn)
      .subscribe((boek: any) => {
        console.log(boek);
        this.boek.auteur = boek.auteur;
        this.boek.titel = boek.titel;
      });
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }
}
