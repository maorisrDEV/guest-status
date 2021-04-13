export interface IGuest {
  _id: string;
  name: string;
  phoneNumber: string;
  amountOfGuests: number;
  willArrive: string;
  message: string;
  visits: number;
}

export interface IStatistics {
  amountOfDocs: number;
  amountOfInvitedGuests: number;
  arrivingGuests: number;
  arrivingInvitedGuests: number;
  notArrivingGuests: number;
  respondedGuests: number;
  notRespondedGuests: number;
  respondedDocs: number;
  notRespondedDocs: number;
}
