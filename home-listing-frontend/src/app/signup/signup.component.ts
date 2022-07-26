import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
 
  private ADD_USER = gql`
  mutation addUser (
        $username: String!,
        $firstname: String!,
        $lastname: String!,
        $password: String!,
        $email: String!,
        $type: String!) {
          addUser(
            username: $username,
            firstname: $firstname,
            lastname: $lastname,
            password: $password,
            email: $email,
            type: $type 
          ) {
            username
            password
        }
  }`

  constructor(private apolloCLient: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(data: any) {
    try {
      this.apolloCLient.mutate({
        mutation: this.ADD_USER,
        variables: {
          username: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
          password: data.password,
          email: data.email,
          type: data.type
        }
      }).subscribe(() => {
        this.router.navigate(['/login'])
        console.log('success!')
      })
    }
    catch(e) {
      console.log(e)
    }
   
  }

}
