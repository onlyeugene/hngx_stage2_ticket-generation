export interface FormData {
  fullName: string;
  email: string;
  about: string;
  profileImage?: string | null;
}

export interface TicketData {
  ticketType: string;
  numberOfTickets: number;
}

export interface SavedTicket extends FormData, TicketData {
  id: number;
  date: string;
}
