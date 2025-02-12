"use client";

import React, { useCallback, useMemo, useState, useRef } from "react";
import EventsPage from "./events-page";
import Container from "./container";
import TicketForm, { TicketFormRef } from "./ticket-form";
import DetailsForm, { DetailsFormRef } from "./details-form";
// import { formSchema } from "@/schemas";
// import { z } from "zod";
import Image from "next/image";
import { FormData } from "@/types";
import Heading from "./heading";

import ticketImage from "@/public/bg.svg";
import barCode from "@/public/Bar Code.svg";
enum STEPS {
  TICKET = 0,
  DETAILS = 1,
  CONFIRM = 2,
}

const Events = () => {
  const [steps, setSteps] = useState(STEPS.TICKET);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [ticketData, setTicketData] = useState<{
    ticketType: string;
    numberOfTickets: number;
  } | null>(null);
  const ticketFormRef = useRef<TicketFormRef>(null);
  const detailsFormRef = useRef<DetailsFormRef>(null);

  const onBack = useCallback(() => {
    setSteps((value) => Math.max(value - 1, STEPS.TICKET));
  }, []);

  const onNext = useCallback(
    (data?: FormData | { ticketType: string; numberOfTickets: number }) => {
      if (data) {
        if ("ticketType" in data) {
          setTicketData(data);
        } else if ("fullName" in data) {
          setFormData(data); // This now includes profileImage
        }
      }
      setSteps((value) => value + 1);
    },
    []
  );

  const onSubmit = useCallback(async () => {
    if (steps === STEPS.TICKET) {
      try {
        const isValid = await ticketFormRef.current?.submitForm();
        if (isValid) {
          setSteps(STEPS.DETAILS);
        }
      } catch (error) {
        // console.error("Ticket form submission error:", error);
        return error
      }
      return;
    }

    if (steps === STEPS.DETAILS) {
      try {
        const isValid = await detailsFormRef.current?.submitForm();
        if (isValid) {
          setSteps(STEPS.CONFIRM);
        }
      } catch (error) {
        // console.error("Details form submission error:", error);
        return error
      }
      return;
    }

    if (steps === STEPS.CONFIRM) {
      if (!formData || !ticketData) {
        // console.error("Missing form data or ticket data");
        return;
      }
      // Save the ticket to localStorage
      const ticket = {
        id: Date.now(), // Unique ID for the ticket
        fullName: formData.fullName,
        email: formData.email,
        about: formData.about,
        profileImage: formData.profileImage,
        ticketType: ticketData.ticketType,
        numberOfTickets: ticketData.numberOfTickets,
        date: new Date().toLocaleString(), // Add a timestamp
      };

      // Retrieve existing tickets from localStorage
      const savedTickets = JSON.parse(
        localStorage.getItem("savedTickets") || "[]"
      );

      // Add the new ticket
      savedTickets.push(ticket);

      // Save back to localStorage
      localStorage.setItem("savedTickets", JSON.stringify(savedTickets));

      // console.log("Ticket saved:", ticket);
      return ticket
    }
  }, [steps, formData, ticketData]);

  const secondaryAction = useCallback(() => {
    if (steps === STEPS.CONFIRM) {
      setSteps(STEPS.TICKET);
      setFormData(null);
      setTicketData(null);
    } else if (steps !== STEPS.TICKET) {
      onBack();
    }
  }, [steps, onBack]);

  const actionLabel = useMemo(() => {
    if (steps === STEPS.CONFIRM) {
      return "Download Ticket";
    }
    if (steps === STEPS.DETAILS) {
      return "Get My Free Ticket";
    }
    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.TICKET) {
      return "Cancel";
    }
    if (steps === STEPS.DETAILS) {
      return "Back";
    }
    if (steps === STEPS.CONFIRM) {
      return "Book Another Ticket";
    }
  }, [steps]);

  let bodyContent = (
    <div className="w-full">
      <TicketForm ref={ticketFormRef} onNext={onNext} />
    </div>
  );

  if (steps === STEPS.DETAILS) {
    bodyContent = (
      <div className="w-full">
        <DetailsForm ref={detailsFormRef} onNext={onNext} />
      </div>
    );
  }

  if (steps === STEPS.CONFIRM) {
    bodyContent = (
      <div className="w-full text-white text-center py-10 px-4">
        <Heading title="Ready" subtitle="Step 3/3" />
        <div className="w-full bg-primary rounded-full mt-5 h-2">
          <div
            className="h-2 bg-lighter rounded-full transition-all"
            style={{ width: "100%" }}
          />
        </div>
        <h1 className="text-[24px] md:text-[32px] lg:text-[40px] font-semibold capitalize mt-10">
          Your ticket is booked!
        </h1>
        <p className="text-gray-300 mt-2 text-sm md:text-base lg:text-lg">
          Check your email for a copy you can download
        </p>
    
        {/* Ticket Container */}
        <div className="relative py-5 mt-10 flex flex-col items-center justify-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-4">
          {/* Ticket Image */}
          <Image
            src={ticketImage}
            alt="Ticket Image"
            className="w-full md:w-[27rem] lg:w-[30rem] object-contain"
          />
    
          {/* Barcode Image */}
          <Image
            src={barCode}
            alt="Ticket Barcode"
            className="w-[80%] sm:w-[70%] md:w-[20rem] lg:w-[22rem] absolute bottom-10 object-contain"
          />
    
          {/* Ticket Details */}
          <div className="absolute md:top-14 top-0 border md:w-[70%] sm:w-[80%] w-[90%] border-lighter rounded-3xl p-4 bg-[#08252b]">
            <h1 className="font-roadRage text-[28px] md:text-[34px] lg:text-[40px]">
              Techember Fest &quot;25
            </h1>
    
            <p className="text-sm md:text-base lg:text-lg">
              📍 04 Runners road, Ikoyi, Lagos
            </p>
            <span className="text-sm md:text-base lg:text-lg">
              📅 March 15, 2025 | 7:00 PM
            </span>
    
            {formData && (
              <div className="w-full flex flex-col items-center">
                {/* Profile Image */}
                {formData.profileImage && (
                  <div className="mt-6 flex justify-center">
                    <div className="rounded-3xl border-lighter border-[.6rem] w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] overflow-hidden">
                      <Image
                        src={formData.profileImage}
                        alt="Profile Photo"
                        width={180}
                        height={180}
                        className="rounded-3xl object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}
    
                {/* Ticket Information Table */}
                <div className="border rounded-3xl border-primary mt-5 w-full">
                  <table className="w-full border-collapse border-primary">
                    <tbody className="w-full">
                      {/* Name and Email */}
                      <tr className="border-b border-primary flex flex-col md:table-row">
                        <td className="border-r md:border-b-0 text-gray-400 border-primary p-2 text-left w-full">
                          Enter your name
                          <p className="text-white capitalize">
                            {formData.fullName}
                          </p>
                        </td>
                        <td className="border-b text-gray-400 border-primary p-2 text-left w-full">
                          Enter your email *
                          <p className="text-white ">{formData.email}</p>
                        </td>
                      </tr>
    
                      {/* Ticket Type and Number of Tickets */}
                      <tr className="border-b border-primary flex flex-col md:table-row">
                        <td className="border-r md:border-b-0 text-gray-400 border-primary p-2 text-left w-full">
                          Ticket Type:
                          <p className="text-white capitalize">
                            {ticketData?.ticketType}
                          </p>
                        </td>
                        <td className="border-b text-gray-400 border-primary p-2 text-left w-full">
                          Ticket for:
                          <p className="text-white capitalize">
                            {ticketData?.numberOfTickets}
                          </p>
                        </td>
                      </tr>
    
                      {/* Special Request */}
                      <tr>
                        <td className="text-gray-400 border-primary p-2 text-left w-full">
                          Special request:
                          <p className="text-white capitalize">
                            {formData.about}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <Container>
      <div className="">
        <EventsPage
          onSubmit={onSubmit}
          body={bodyContent}
          actionLabel={actionLabel}
          secondaryActionLabel={secondaryActionLabel}
          secondaryAction={secondaryAction}
        />
      </div>
    </Container>
  );
};

export default Events;
