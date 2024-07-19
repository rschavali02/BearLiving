
"use cient"

import { ShoppingCart } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

const Cart = () => {

    const itemCount = 1

    const fee = 0

    return <Sheet>
        <SheetTrigger className="group -m-2 flex items-center p-2">
            <ShoppingCart 
            aria-hidden = "true"
            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"/>
        <span className="ml-2 text-sm font font-medium text-gray-700 group-hover:text-gray-800">
        Cart
        </span>
        </SheetTrigger> 
        <SheetContent className="flex w-full flex-col pr-o sm:max-w-lg">
        <SheetHeader className = "space-y-2.5 pr-6">
            <SheetTitle >
                Cart
            </SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
            <>
                <div className="flex w-full flex-col pr-6">
                    {/* TODO: Cart Logic */}
                    Cart Items
                </div>
                <div className="space-y-4 pr-6">
                    <Separator />
                    <div className="space-y-1.5 text-sm">
                        <div className="flex">
                            <span className = "flex-1">
                                Transaction Fee
                            </span>
                            <span>
                                Free
                            </span>
                        </div>
                        <div className="flex">
                            <span>
                                {formatPrice(fee)}
                            </span>
                        </div>
                        <div className="flex">
                            <span className = "flex-1">
                                Total
                            </span>
                            <span>
                                {formatPrice(fee)}
                            </span>
                        </div>
                    </div>

                    <SheetFooter>
                        <SheetTrigger asChild>
                            <Link 
                            href = '/cart' 
                            className={buttonVariants({
                                className: "w-full",
                            })}>
                                    Checkout Under Construction
                            </Link>
                        
                        </SheetTrigger>
                    </SheetFooter>
                </div>
            </>
        ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div 
            aria-hidden = "true"
            className="relative mb-4 h-60 w-60 text-muted-foreground">
            Empty Cart, add items to cart to Checkout
            </div>
             
        </div>
        )}
        </SheetContent>
    </Sheet>
}

export default Cart