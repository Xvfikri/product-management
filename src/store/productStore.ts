import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nonnegative, z } from "zod";
import { id } from "zod/v4/locales";


export const productSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Nama produk tidak boleh kosong"),
    price: z.number().positive("Harga harus angka"),
    stock: z.number().int().nonnegative("Stock harga dari angka 0 atau lebih")
})

export type Product = z.infer<typeof productSchema>;


interface ProductState {
    products: Product[];
    addProduct: (newProductData: Omit<Product, 'id'>) => void;
    editProduct: (productId: string, updatedProductData: Omit<Product, 'id'>) => void;
    deleteProduct: (productId: string) => void;
    getProductById: (productId: string) => Product | undefined;

}


export const useProductStore = create<ProductState>() (
    persist(
        (set, get) => ({
            products: [],
            getProductById : (productId) => {
                return get().products.find(p => p.id === productId);
            },

            addProduct: (newProductData) => {
                const {products} = get();
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
                set({products: [...products, newProduct]})
            },

            editProduct: (productId, updatedProductData) => {
                const{ products } = get();

                const nameExists = products.some (
                    (p) => p.id !== productId && p.name.toLowerCase() === updatedProductData.name.toLowerCase()
                )

                if(nameExists) {
                    throw new Error("Nama product sudah ada")
                }

                set((state) => ({
                    products: state.products.map((p) => 
                        p.id === productId ? { id: p.id, ...updatedProductData} : p
                    )
                }))
            },

            deleteProduct: (productId) => {
                set((state) => ({
                    products: state.products.filter((p) => p.id !== productId),
                }));
            },
        }),
        
        {
            name: 'product-storage'
        }
    )
);