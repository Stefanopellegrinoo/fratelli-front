import { Navbar } from "@/components/navbar"
import { CheckoutForm } from "@/components/checkout-form"
import { Footer } from "@/components/footer"

export default function CheckoutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Finalizar Pedido</h1>
        <CheckoutForm />
      </div>
      <Footer />
    </main>
  )
}
