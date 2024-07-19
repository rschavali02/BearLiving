import { LucideProps } from "lucide-react";

export const Icons = {
    logo: (props: LucideProps) => (
        <svg 
            id="Layer_1" 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 256 260.1"
            {...props} // Spread additional props to the svg element
        >
            <image 
                width="320" 
                height="306" 
                transform="scale(0.8 0.85)" 
                href="public/logo.png" 
                style={{ isolation: "isolate" }}
            />
        </svg>
    )
};