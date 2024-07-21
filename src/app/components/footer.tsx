import Image from "next/image";
export default function Footer() {
    return (
        <footer className="bg-neutral-700 border-t">
            <div className="px-1 text-slate-300 text-sm">
                <div className="p-6 flex items-start justify-between gap-1 text-right mobile:text-left mobile:flex-col mobile:gap-4 ">
                    <div className="flex items-center">
                        <p className="min-w-fit after:content-['|'] after:px-1">© Copyright 2024</p>
                        <Image src={`/img/LEC-mural.jpg`} width={24} height={24} alt={`Liliana Logo`} className="rounded-[50%]" />
                    </div>
                    <p className="max-w-[40rem] tabletAndBelow:max-w-[30rem] text-[12px]">I acknowledge traditional owners of Country throughout Australia. I recognised their continuing connection to lands, waters, and communities and the Widjabul Wiyebal people of the Bundjalung Nation, traditional custodians of the land on which I now live.</p>
                </div>  
            </div>            
        </footer>
    );     
}