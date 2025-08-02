import { z } from "zod";

export const productSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Nama produk tidak boleh kosong"),
    price: z.number().positive("Harga harus angka"),
    stock: z.number().int().nonnegative("Stock harga dari angka 0 atau lebih")
})

export type Product = z.infer<typeof productSchema>;