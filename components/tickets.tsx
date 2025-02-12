import React from "react";
import Button from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Tickets = () => {
  return (
    <Link href="/tickets">
      <Button className="uppercase flex items-center gap-2 py-4 px-8 bg-white text-black text-base">
        My tickets
        <ArrowRight size={16} />
      </Button>
    </Link>
  );
};

export default Tickets;
