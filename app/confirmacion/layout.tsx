import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ConfirmacionLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-amber-50 pt-16">{children}</main>
      <Footer />
    </>
  );
}
