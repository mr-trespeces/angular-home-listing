import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HistoryComponent } from './history/history.component';
import { ListingComponent } from './listing/listing.component';

const routes: Routes = [
  { path: '', redirectTo: 'listing', pathMatch:'full' },
  { path :'login', component: LoginComponent},
  { path :'signup', component: SignupComponent},
  { path :'history', component: HistoryComponent},
  { path :'listing', component: ListingComponent},
  { path :'listing/:username', component: ListingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }