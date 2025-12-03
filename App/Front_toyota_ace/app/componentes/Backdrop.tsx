import Image from "next/image"

import ToyotaACE from "@/app/assets/image/image/Protótipos Toyota.jpg"

export default function Backdrop(){
    return(
        <div className="h-[88vh] w-full flex items-center justify-center">
            <Image
            src={ToyotaACE}
            alt="toyota ace"
            />
        </div>
    )
}