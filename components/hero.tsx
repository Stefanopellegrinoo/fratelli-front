import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="pt-20 pb-12 md:pt-24 md:pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Pastas Artesanales <span className="text-amber-600">Fratelli</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 md:pr-12">
              Elaboradas con ingredientes frescos y recetas tradicionales italianas, nuestras pastas artesanales llevan
              el sabor auténtico a tu mesa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-amber-600 hover:bg-amber-700">
                <Link href="/catalogo">Ver Catálogo</Link>
              </Button>
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                <Link href="#featured">Destacados</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
              <Image
                src="/panzo.jpeg?height=800&width=1200"
                alt="Pastas Fratelli"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-amber-100 p-4 rounded-lg shadow-md">
              <p className="text-amber-800 font-medium">100% Artesanal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
