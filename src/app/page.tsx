"use client"
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/ProductCard";
import ProductForm from "@/components/ProductForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { AlertDialog } from "@/components/ui/alert-dialog"
import { toast } from "sonner";

const STORAGE_KEY = 'product-storage'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect (() => {
    const storedItems = localStorage.getItem(STORAGE_KEY);
    if(storedItems) {
      setProducts(JSON.parse(storedItems))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if(!isLoading){
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    }
  }, [products, isLoading])

  const addProduct =  (newProductData: Omit<Product, 'id'>) => {
    const nameExists = products.some (
        (p) => p.name.toLowerCase() === newProductData.name.toLowerCase()
    )

    if(nameExists) {
        throw new Error("Nama product sudah ada")
    }

    const newProduct: Product = {
        id: crypto.randomUUID(),
        ...newProductData,
    }

    setProducts((prevProducts) => [...prevProducts, newProduct] ) 
  }


  if(isLoading) {
    return <div className="p-10">Loading data ....</div>
  }

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen Produk</h1>
        <Dialog open={open} onOpenChange = {setOpen}>
          <DialogTrigger asChild>
            <Button>Tambah Produk</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">  
            <DialogHeader>
              <DialogTitle>Tambah Produk baru</DialogTitle>
              <DialogDescription>
                Isi Detail Product Dibawah Ini. klik simpan jika sudah selesai.
              </DialogDescription>
            </DialogHeader>
            <ProductForm addProduct={addProduct} setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>

      {products.length === 0 ?(
        <div className="textCenter py-20 border-2 border-dashed rounded-lg">
          <h2 className="text=xl font-semibold">Belum ada Produk</h2>
          <p className="text-muted-foreground">Silahkan tambahkan Produk Baru</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
      )}
    </main>
  )

}