"use client"

import { useState } from "react"
import { X, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { formatPrice } from "@/lib/utils"
import { ImageCarousel } from "@/components/image-carousel"
import "../styles/globals.css"
export function ProductModal({ product, isOpen, onClose }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast({
      title: "Producto agregado",
      description: `${quantity} ${quantity > 1 ? "unidades" : "unidad"} de ${product.name} ${quantity > 1 ? "agregadas" : "agregada"} a tu carrito.`,
  
    })
    onClose()
  }

  if (!isOpen) return null

  // Usar el array de imágenes si existe, o crear un array con la imagen principal
  const productImages = product.images || [product.image || "/placeholder.svg?height=600&width=600"]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4">
            <ImageCarousel images={productImages} alt={product.name} />
          </div>
          <div className="p-6 md:w-1/2">
            <p className="text-amber-600 text-2xl font-semibold mb-4">{formatPrice(product.price)}</p>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Descripción</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Cantidad</h3>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={handleAddToCart}>
              Agregar al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
