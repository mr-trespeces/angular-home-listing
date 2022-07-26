import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  username = localStorage.getItem('session')
  bookings!: any[];
  displayedColumns: string[] = ['booking_id', 'listing_id', 'booking_date', 'actions'];
  delete_success = false

  private GET_BOOKING = gql`
  query userBooking (
    $username: String!) {
      userBooking(
        username: $username) {
        listing_id
        booking_id
        booking_date
        booking_start
        booking_end
        username
    }
  }`

  private DELETE_BOOKING = gql`
  mutation deleteBookingByID(
    $booking_id: String!) {
      deleteBookingByID(
        booking_id: $booking_id) {
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
        query: this.GET_BOOKING,
        variables: {
          username: this.username
        }
      })
      .valueChanges.subscribe((result: any) => {
        this.bookings = result?.data?.userBooking;
      })
  }
  

  deleteBookingByID(id: String) {
    try {
      this.apolloClient.mutate({
        mutation: this.DELETE_BOOKING,
        variables: {
          booking_id: id,
        }
      }).subscribe(() => {
        this.router.navigate(['/history'])
        console.log('success!')
      })
      window.location.reload()
    }
    catch(e) {
      console.log(e)
    }
  }
}
