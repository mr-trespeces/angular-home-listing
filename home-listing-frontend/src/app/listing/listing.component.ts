import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { concat } from 'rxjs';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  isLoggedin = localStorage.getItem('session') != undefined? true : false
  username = localStorage.getItem('session')
  listings!: any[];
  displayedColumns: string[] = ['id', 'title', 'description', 'address', 'price', 'email'];
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  today =  new Date();



  private GET_LISTING = gql`
  query listedByAdmin {
    listedByAdmin {
      listing_id
      listing_title
      description
      street
      city
      postal_code
      price
      email
      username
    }
  }`

  private ADD_BOOKING = gql`
  mutation addBooking (
    $listing_id: String!
    $booking_id: String!
    $booking_date: String!
    $booking_start: String!
    $booking_end: String!
    $username: String!) {
      addBooking(
        listing_id: $listing_id,
        booking_id: $booking_id,
        booking_date: $booking_date,
        booking_start: $booking_start,
        booking_end: $booking_end,
        username: $username 
          ) {
            listing_id
            booking_id
            booking_date
            booking_start
            booking_end
            username
        }
  }`

  constructor(private apolloClient: Apollo, private router: Router) { }

  ngOnInit() {
    this.apolloClient
      .watchQuery({
        query: this.GET_LISTING,
    })
    .valueChanges.subscribe((result: any) => {
      this.listings = result?.data?.listedByAdmin;
    }
    )
    this.isLoggedin == true? this.displayedColumns.push('actions') : null
  }

  addBooking(data: any) {
    try {
      this.apolloClient.mutate({
        mutation: this.ADD_BOOKING,
        variables: {
          listing_id: data.listing_id,
          booking_id: this.username!.concat("-", data.listing_id),
          booking_date: this.today.toUTCString(),
          booking_start: this.today.toUTCString(),
          booking_end: this.today.toUTCString(),
          username: this.username
        }
      }).subscribe(() => {
        window.location.reload()
      })
      this.router.navigate(['/history'])
    }
    catch(e) {
      console.log(e)
    }
  }
}
