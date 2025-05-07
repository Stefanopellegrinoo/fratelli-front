"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { formatPrice } from "@/lib/utils"

export function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product, 1)
    toast({
      title: "Producto agregado",
      description: `${product.name} se ha agregado a tu carrito.`,

    })
  }

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
      onClick={onViewDetails}
    >
      <div className="relative h-48 w-full">
        <Image
          src={product.image || "/placeholder.svg?height=400&width=600"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1">{product.name}</h3>
        <p className="text-amber-600 font-semibold mb-3">{formatPrice(product.price)}</p>
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" className="text-gray-600" onClick={onViewDetails}>
            Ver detalles
          </Button>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700" onClick={handleAddToCart}>
            Agregar
          </Button>
        </div>
      </div>
    </div>
  )
}
