import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { BoatListComponent } from './boat/boat-list/boat-list.component';

const routes: Routes = [
  { path: 'dashboard', component: BoatListComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
