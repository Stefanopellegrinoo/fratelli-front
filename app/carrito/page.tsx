import { Navbar } from "@/components/navbar"
import { ShoppingCart } from "@/components/shopping-cart"
import { Footer } from "@/components/footer"
import "../../styles/globals.css"
export default function CarritoPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Tu Carrito</h1>
        <ShoppingCart />
      </div>
      <Footer />
    </main>
  )
}
