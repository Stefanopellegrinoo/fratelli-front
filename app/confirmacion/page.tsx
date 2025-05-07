"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import "../../styles/globals.css"
export default function ConfirmacionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    // Recuperar los datos del pedido del localStorage
    const storedOrder = sessionStorage.getItem("lastOrder")
    if (storedOrder) {
      try {
        setOrderData(JSON.parse(storedOrder))
      } catch (error) {
        console.error("Error al parsear los datos del pedido:", error)
        router.push("/")
      }
    } else {
      // Si no hay datos de pedido, redirigir al inicio
      router.push("/")
    }
  }, [router])

  if (!orderData) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Cargando información del pedido...</p>
        </div>
      </div>
    )
  }

  const { customer, items, total, orderId } = orderData

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">¡Pedido Confirmado!</h1>
          <p className="text-gray-600">
            Gracias por tu compra. Hemos recibido tu pedido correctamente.
          </p>
          <p className="text-gray-600 mt-2">
            Te enviaremos un correo electrónico a <span className="font-medium">{customer.email}</span> cuando tu pedido esté confirmado.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Número de Pedido: #{orderId}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Información de Contacto</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p><span className="font-medium">Nombre:</span> {customer.name}</p>
                <p><span className="font-medium">Email:</span> {customer.email}</p>
                <p><span className="font-medium">Teléfono:</span> {customer.phone}</p>
                <p><span className="font-medium">Dirección:</span> {customer.address}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Detalles del Pago</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p><span className="font-medium">Método de pago:</span> {customer.paymentMethod === "efectivo" ? "Efectivo" : "Transferencia bancaria"}</p>
                {customer.paymentMethod === "transferencia" && (
                  <div className="mt-2 p-3 bg-amber-50 rounded-md text-sm">
                    <p className="font-medium text-amber-800">Información para transferencia:</p>
                    <p className="text-amber-700 mt-1">Banco: Santander</p>
                    <p className="text-amber-700">Titular: Fratelli Pastas SRL</p>
                    <p className="text-amber-700">CBU: 0000003100021569845236</p>
                    <p className="text-amber-700">Alias: FRATELLI.PASTAS</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-medium text-gray-800 mb-2">Productos</h3>
          <div className="bg-gray-50 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatPrice(item.price)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatPrice(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right">Total:</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">{formatPrice(total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {customer.comments && (
          <div className="mb-8">
            <h3 className="font-medium text-gray-800 mb-2">Comentarios adicionales</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600">{customer.comments}</p>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-amber-600 hover:bg-amber-700">
              <Link href="/">Volver al inicio</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/catalogo">Seguir comprando</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
