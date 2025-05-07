import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ConfirmacionLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-amber-50/50 pt-16">{children}</main>
      <Footer />
    </>
  )
}
