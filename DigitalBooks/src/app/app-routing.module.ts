import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorAddbookComponent } from './author-addbook/author-addbook.component';
import { AuthorUpdatebookComponent } from './author-updatebook/author-updatebook.component';
import { AuthorComponent } from './author/author.component';
import { HomeComponent } from './home/home.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ReaderReadbookComponent } from './reader-readbook/reader-readbook.component';
import { ReaderSubscriptionsComponent } from './reader-subscriptions/reader-subscriptions.component';
import { ReaderComponent } from './reader/reader.component';
import { SignupComponent } from './signup-dialog/signup.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginDialogComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'reader', component: ReaderComponent},
  {path: 'author', component: AuthorComponent},
  {path: 'reader-subscriptions', component: ReaderSubscriptionsComponent},
  {path: 'reader-readbook/:bookId', component: ReaderReadbookComponent},
  {path: 'author-addbook', component: AuthorAddbookComponent},
  {path: 'author-updatebook/:bookId', component: AuthorUpdatebookComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
