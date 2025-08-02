import { Product } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";



interface ProductCardProps {
    product: Product;
}


const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(amount);
}

export default function ProductCard({ product }: ProductCardProps) {
    return(
        <Card>
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.stock}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-semibold">{formatCurrency(product.price)}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Edit</Button>
                <Button variant="destructive">Hapus</Button>
            </CardFooter>
        </Card>
    );
}