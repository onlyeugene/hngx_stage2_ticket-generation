'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Ticket {
  id: number;
  fullName: string;
  email: string;
  about: string;
  profileImage?: string;
  ticketType: string;
  numberOfTickets: number;
  date: string;
}

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Retrieve saved tickets from localStorage
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("savedTickets") || "[]");
    setTickets(savedTickets);
  }, []);

  return (
    <div className="p-6 container max-w-5xl text-white">
      <h1 className="text-2xl font-semibold mb-6">Saved Tickets</h1>
      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        <div className="space-y-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-primary rounded-3xl p-6 bg-[#08252b]"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {ticket.profileImage && (
                  <div className="flex-shrink-0">
                    <Image
                      src={ticket.profileImage}
                      alt="Profile Photo"
                      width={150}
                      height={150}
                      className="rounded-3xl border-2 border-primary "
                    />
                  </div>
                )}
                <div className="flex-grow">
                  {/* <h2 className="text-xl font-semibold mb-2">Attendee Details</h2> */}
                  <p>
                    <span className="text-gray-400">Name:</span>{" "}
                    <span className="text-white">{ticket.fullName}</span>
                  </p>
                  <p>
                    <span className="text-gray-400">Email:</span>{" "}
                    <span className="text-white">{ticket.email}</span>
                  </p>
                  <p>
                    <span className="text-gray-400">About:</span>{" "}
                    <span className="text-white">{ticket.about}</span>
                  </p>
                  <h2 className="text-xl font-semibold mt-4 mb-2">Ticket Details</h2>
                  <p>
                    <span className="text-gray-400">Ticket Type:</span>{" "}
                    <span className="text-white capitalize">{ticket.ticketType}</span>
                  </p>
                  <p>
                    <span className="text-gray-400">Number of Tickets:</span>{" "}
                    <span className="text-white">{ticket.numberOfTickets}</span>
                  </p>
                  <p>
                    <span className="text-gray-400">Date Booked:</span>{" "}
                    <span className="text-white">{ticket.date}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tickets;