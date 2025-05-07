"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
// import { products } from "@/data/products"
import { Button } from "@/components/ui/button"
import { getAllPastas } from "@/services/pastaService"

export function ProductCatalog() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const categories = [
    { id: "todos", name: "Todos" },
    { id: "ravioles", name: "Ravioles" },
    { id: "ñoquis", name: "Ñoquis" },
    { id: "panzottis", name: "Panzottis" },
    { id: "sorrentinos", name: "Sorrentinos" },
  ]
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await getAllPastas()
    

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

  const filteredProducts =
    selectedCategory === "todos" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div>
            {loading && <p>cargando ... </p>}
            {error && <p>error ... </p>}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={selectedCategory === category.id ? "bg-amber-600 hover:bg-amber-700" : ""}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onViewDetails={() => setSelectedProduct(product)} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No se encontraron productos en esta categoría.</p>
        </div>
      )}

      {selectedProduct && (
        <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  )
}
