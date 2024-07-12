"use client"
import { PRODUCT_CATERGORIES } from "@/config"
import { useEffect, useRef, useState } from "react"
import NavItem from "./NavItem"
import { Html } from "next/document"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<
    null | number
    >(null)

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                setActiveIndex(null)
            }
        }
        document.addEventListener("keydown", handler)

        return () => {
            document.removeEventListener("keydown", handler)
        }
    }, [])

    const navRef = useRef<HTMLDivElement | null>(null)

    useOnClickOutside(navRef, () => setActiveIndex(null))
    
    const isAnyOpen = activeIndex !== null 
    
    return <div className="flex gap-4 h-full" ref = {navRef}>
        {PRODUCT_CATERGORIES.map((category, i) => {
            const handleOpen = () => {
                if(activeIndex === i){
                    setActiveIndex(null)
                } else {
                    setActiveIndex(i)
                }
            }
            const isOpen = i === activeIndex

            return (
                <NavItem 
                category={category} 
                handleOpen={handleOpen} 
                isOpen = {isOpen} 
                key = {category.value} 
                isAnyOpen = {isAnyOpen} />
            )
        })}
    </div>
}

export default NavItems