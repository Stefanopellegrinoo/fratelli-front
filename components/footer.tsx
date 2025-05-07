import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-amber-50 border-t border-amber-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Fratelli Pastas</h3>
            <p className="text-gray-600 mb-4">
              Pastas artesanales elaboradas con ingredientes frescos y recetas tradicionales italianas.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-amber-600 hover:text-amber-700">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-amber-600 hover:text-amber-700">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-amber-600 hover:text-amber-700">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-amber-600">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-gray-600 hover:text-amber-600">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="text-gray-600 hover:text-amber-600">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <address className="not-italic text-gray-600">
              <p>Av. Italia 1234</p>
              <p>Buenos Aires, Argentina</p>
              <p className="mt-2">Teléfono: (011) 4567-8901</p>
              <p>Email: info@fratellipastas.com</p>
            </address>
          </div>
        </div>
        <div className="border-t border-amber-100 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Fratelli Pastas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
