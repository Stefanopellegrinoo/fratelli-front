import { Navbar } from "@/components/navbar"
import { ProductCatalog } from "@/components/product-catalog"
import { Footer } from "@/components/footer"

export default function CatalogoPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Nuestras Pastas</h1>
        <ProductCatalog />
      </div>
      <Footer />
    </main>
  )
}
