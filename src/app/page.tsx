import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { CheckCircle, FastForward, Ghost, GraduationCap, Rocket } from "lucide-react"
import Link from "next/link"

const perks = [
  {
    name: "Quick-to-Use, Easy-to-Find",
    Icon: FastForward,
    description: "Find your dream Sublet for the semester/year as painlessly as possible."
  }, 
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description: "Every location on our website is verified to ensure highest quality"
  },  
  {
    name: "For Students, By Students",
    Icon: GraduationCap,
    description: "Sublets by Students for Students, built by a Student"
  },
]

export default function Home() {
   return (
   <>
   <MaxWidthWrapper>
   <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
   <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>Your Student-To-Student Marketplace for High Quality{' '}
        <span className = 'text-red-600'>
        Subletting
        </span>
        .
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Welcome to BearLiving! Every property on this platfrom is verified to ensure highest quality standards
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href = '/products' className={buttonVariants()}> Browse Trending </Link> 
          <Button variant='ghost'>Our Quality Promise &rarr;</Button>
        </div> 
    </div>

    {/* TODO: List Products */}
   </MaxWidthWrapper>
   <section className="border-t border-gray-200 bg-gray-50">
    <MaxWidthWrapper className="py-20">
      <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {perks.map((perk)=>(
            <div key = {perk.name} className="text-center md:flex md:text-left lg:block lg:text-center">
               <div className="md: flex-shrink-0 flex justify-center">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-red-100 text-red-900">
                  {<perk.Icon className="w-5/12 h-5/12"/>}
                </div>
               </div>
               <div className = 'mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                <h3 className="text-base font-medium text-gray-900">
                  {perk.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                   {perk.description}
                </p>
               </div>
            </div>
          ))}
      </div>
    </MaxWidthWrapper>
   </section>
   </>
   )
}
