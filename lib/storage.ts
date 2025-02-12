// import { FormData, SavedTicket, TicketData } from "@/types";

// export const saveTicketToStorage = (
//     formData: FormData,
//     ticketData: TicketData
//   ): void => {
//     const ticket: SavedTicket = {
//       id: Date.now(),
//       fullName: formData.fullName,
//       email: formData.email,
//       about: formData.about,
//       profileImage: formData.profileImage,
//       ticketType: ticketData.ticketType,
//       numberOfTickets: ticketData.numberOfTickets,
//       date: new Date().toLocaleString(),
//     };
  
//     const savedTickets: SavedTicket[] = JSON.parse(
//       localStorage.getItem("savedTickets") || "[]"
//     );
  
//     savedTickets.push(ticket);
//     localStorage.setItem("savedTickets", JSON.stringify(savedTickets));
  
//     return ticket;
//   };
  