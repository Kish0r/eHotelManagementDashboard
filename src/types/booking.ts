export type Booking = {
  booking_id: string;
  room_id: string;
  user_id: string;
  number_of_guests: number;
  special_requests: string;
  check_in_date: Date;
  check_out_date: Date;
  status: string;
  created_at: Date;
};

export type PaginatedBookings = {
  bookings: Booking[];
  total: number;
};