"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { createOrder } from "@/services/orderService";
import "../styles/globals.css"

const formSchema = z.object({
  name: z.string().min(3, { message: "El nombre es requerido" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(8, { message: "Teléfono inválido" }),
  address: z.string().min(5, { message: "La dirección es requerida" }),
  paymentMethod: z.enum(["efectivo", "transferencia"], {
    required_error: "Selecciona un método de pago",
  }),
  comments: z.string().optional(),
})

export function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { cartItems, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "efectivo",
      comments: "",
    },
  })

  const paymentMethod = watch("paymentMethod")

  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos a tu carrito antes de finalizar el pedido.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulamos el envío del pedido
    // await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generamos un ID de pedido único
    const orderId = `FR-${Date.now().toString().slice(-6)}`
    
    // Creamos el objeto con los datos del pedido
    const orderData = {
      orderId,
      customer: data,
      items: cartItems,
      total: totalPrice,
      date: new Date().toISOString(),
    }
    const orderData1 = await createOrder(orderData)
    
    console.log(orderData1)
    // Aquí iría la lógica para enviar el pedido al backend
    console.log("Datos del pedido:", orderData)

    // Guardamos los datos del pedido en localStorage para recuperarlos en la página de confirmación
    sessionStorage.setItem("lastOrder", JSON.stringify(orderData1))

    toast({
      title: "¡Pedido realizado con éxito!",
      description: "Redirigiendo a la página de confirmación...",
    })

    // Limpiamos el carrito
    clearCart()
    setIsSubmitting(false)

    // Redirigimos a la página de confirmación
    router.push("/confirmacion")
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No hay productos en tu carrito.</p>
        <Button asChild className="bg-amber-600 hover:bg-amber-700">
          <a href="/catalogo">Ver Catálogo</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-medium mb-6">Información de contacto</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" placeholder="Tu nombre" {...register("name")} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Tu email" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" placeholder="Tu teléfono" {...register("phone")} />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección de entrega</Label>
              <Input id="address" placeholder="Tu dirección completa" {...register("address")} />
              {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
            </div>
            <div className="space-y-3">
              <Label>Método de pago</Label>
              <RadioGroup defaultValue="efectivo" {...register("paymentMethod")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="efectivo" id="efectivo" />
                  <Label htmlFor="efectivo">Efectivo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transferencia" id="transferencia" />
                  <Label htmlFor="transferencia">Transferencia bancaria</Label>
                </div>
              </RadioGroup>
              {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments">Comentarios (opcional)</Label>
              <Textarea
                id="comments"
                placeholder="Instrucciones especiales para la entrega, etc."
                {...register("comments")}
              />
            </div>
            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700" disabled={isSubmitting}>
              {isSubmitting ? "Procesando..." : "Confirmar pedido"}
            </Button>
          </form>
        </div>
      </div>
      <div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-20">
          <h2 className="text-xl font-medium mb-6">Resumen del pedido</h2>
          <ul className="divide-y mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="py-3 flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                </div>
                <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
          <div className="border-t pt-4">
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            {paymentMethod === "transferencia" && (
              <div className="mt-4 p-3 bg-amber-50 rounded-md text-sm">
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
  )
}
