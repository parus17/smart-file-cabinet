import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoekenComponent} from "./components/boeken/boeken.component";
import {StripsComponent} from "./components/strips/strips.component";
import {ReceptenComponent} from "./components/recepten/recepten.component";
import {NotfoundComponent} from "./components/notfound/notfound.component";

const routes: Routes = [
  {path: 'boeken', component: BoekenComponent},
  { path: '',   redirectTo: '/boeken', pathMatch: 'full' },
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
