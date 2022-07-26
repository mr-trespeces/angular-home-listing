import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Apollo, gql } from 'apollo-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage = false

  private LOGIN = gql`
  mutation login(
      $username: String!,
      $password: String!) {
        login(
          username: $username,
          password: $password) {
          username
          password
      }
  }`


  constructor(private apolloClient: Apollo, private router: Router) {
  }

  public ngOnInit(): void {
  }

  public onSubmit(data: any) {
      this.apolloClient.mutate({
        mutation: this.LOGIN,
        variables:{
          username: data.username,
          password: data.password
        }
     }).subscribe(() => {
        this.router.navigate(['/listing/'])
        localStorage.setItem('session', data.username)
     })
     this.errorMessage = true
  }
}
