"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
// import { products } from "@/data/products"
import { getFeatured } from "@/services/pastaService"

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])
  
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await getFeatured()
      
      setProducts(result)
    } catch (err) {
      setError("Error al cargar los productos.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <section id="featured" className="py-12 bg-amber-50">
      {loading && <p>cargando ... </p>}
      {error && <p>error ... </p>}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Nuestras Pastas Destacadas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onViewDetails={() => setSelectedProduct(product)} />
          ))}
        </div>
        {selectedProduct && (
          <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </div>
    </section>
  )
}
