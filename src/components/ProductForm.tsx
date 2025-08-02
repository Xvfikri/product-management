import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { productSchema } from "@/lib/types"
import { Button  } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Description } from "@radix-ui/react-dialog"


const formSchema = productSchema.omit({ id: true});
type FormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    addProduct:(data: FormValues)=> void;
    setOpen: (open: boolean) => void;
}


export default function ProductForm({ addProduct, setOpen }: ProductFormProps) {
    const { register, handleSubmit, formState: {errors} } = useForm<FormValues> ({
        resolver: zodResolver(formSchema),
    })


    const onSubmit = (data: FormValues ) => {
        try{
            addProduct(data);
            toast.success("product berhasil ditambahkan")
            setOpen(false);
        }catch(error) {
            if(error instanceof Error) {
                toast.error ("Gagal Menambahkan produk")
                desciption: error.message
            } else {
                toast.error ("Gagal Menambahkan produk")
                Description: "...."
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Nama Produk</Label>
                <Input id="name" {...register("name")} />
                {errors.name?.message && <p>{errors.name.message}</p>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="Price">Harga</Label>
                <Input id="price" type="number" {...register("price", {valueAsNumber:true})} />
                {errors.price?.message && <p>{errors.price.message}</p>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" {...register("stock", {valueAsNumber:true})} />
                {errors.stock?.message && <p>{errors.stock.message}</p>}
            </div>
            <Button type="submit">Simpan Produk</Button>
        </form>
    )
}


