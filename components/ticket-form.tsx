import React, { useState, useImperativeHandle, forwardRef } from "react";
import Heading from "./heading";
import Button from "./ui/button";

interface TicketFormProps {
  onNext: (data: { ticketType: string; numberOfTickets: number }) => void;
}

export interface TicketFormRef {
  submitForm: () => Promise<boolean>;
}

const TicketForm = forwardRef<TicketFormRef, TicketFormProps>(({ onNext }, ref) => {
  const [selectedTicket, setSelectedTicket] = useState("regular");
  const [numberOfTickets, setNumberOfTickets] = useState(1);

  useImperativeHandle(ref, () => ({
    submitForm: async () => {
      // Save data to localStorage
      const ticketData = { ticketType: selectedTicket, numberOfTickets };
      localStorage.setItem("ticketData", JSON.stringify(ticketData));

      // Pass data to the next step
      onNext(ticketData);
      return true; // Always resolve to true since there's no validation here
    },
  }));

  return (
    <div className="text-white py-5">
      <div>
        <Heading title="Ticket Selection" subtitle="Step 1/3" />
        <div className="w-full bg-primary rounded-full mt-5 h-2">
          <div
            className="h-2 bg-lighter rounded-full transition-all"
            style={{ width: "33%" }}
          />
        </div>
        <div className="border border-primary mt-5 p-5 rounded-3xl bg-[#08252b]">
          <div className="flex flex-col justify-center text-center items-center border border-primary rounded-3xl p-5 py-10 bg-gradient-to-r from-primary/90 via-darker to-darker">
            <h1 className="md:text-[62px] text-5xl font-bold font-roadRage">
              Techember Fest &#34;25
            </h1>
            <p>
              Join us for an unforgettable experience at Tech Fest! Secure your
              spot now.
            </p>
            <span className="flex md:flex-row md:mt-5 mt-10 flex-col md:gap-5">
              📍 [Event Location] <span className="md:block hidden">| |</span>{" "}
              <span> March 15, 2025 | 7:00 PM</span>
            </span>
          </div>
          <div className="border-b border-2 border-primary mt-5" />

          <div className="mt-5">
            <h1 className="mb-3">Select Ticket Type:</h1>

            <div className="border border-primary bg-[#052228] rounded-3xl p-5 grid md:grid-cols-3 grid-cols-1 gap-5">
              {[
                { type: "regular", label: "Regular Access", price: "Free" },
                { type: "vip", label: "VIP Access", price: "$50" },
                { type: "vvip", label: "VVIP Access", price: "$150" },
              ].map(({ type, label, price }) => (
                <Button
                  key={type}
                  className={`flex flex-col items-start justify-start gap-4 w-full border-lighter hover:border-green hover:bg-primary rounded-xl border-2 ${
                    selectedTicket === type ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => setSelectedTicket(type)}
                >
                    <span className="font-semibold text-2xl ">
                    {price}
                  </span>
                  <div className="place-items-start">
                    <h1 className="uppercase">{label}</h1>
                    <p>20/52</p>
                  </div>
                  
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h1 className="mb-3">Number of Tickets:</h1>
            <select
              className="p-2 border border-primary rounded-md bg-transparent outline-none text-white w-full"
              value={numberOfTickets}
              onChange={(e) => setNumberOfTickets(Number(e.target.value))}
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
});

TicketForm.displayName = "TicketForm";

export default TicketForm;