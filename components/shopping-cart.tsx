"use client"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/lib/utils"

export function ShoppingCart() {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useCart()

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleQuantityChange = (item, amount) => {
    const newQuantity = item.quantity + amount
    if (newQuantity >= 1) {
      updateCartItemQuantity(item.id, newQuantity)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-medium text-gray-700 mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-6">Parece que aún no has agregado productos a tu carrito</p>
        <Button asChild className="bg-amber-600 hover:bg-amber-700">
          <Link href="/catalogo">Ver Catálogo</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-medium">Productos en tu carrito</h2>
          </div>
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center">
                <div className="relative h-20 w-20 rounded overflow-hidden flex-shrink-0 mb-3 sm:mb-0">
                  <Image
                    src={item.image || "/placeholder.svg?height=200&width=200"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="sm:ml-4 flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-amber-600">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center mt-3 sm:mt-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item, -1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="mx-2 w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 text-gray-500 hover:text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sticky top-20">
          <h2 className="font-medium mb-4">Resumen del pedido</h2>
          <div className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
              <Link href="/checkout">Finalizar pedido</Link>
            </Button>
            <Button variant="outline" className="w-full" onClick={clearCart}>
              Vaciar carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
