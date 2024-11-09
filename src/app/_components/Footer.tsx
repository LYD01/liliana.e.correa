import Image from "next/image";
export default function Footer() {
    return (
        <footer className="border-t">
            <div className="px-1 text-slate-300 text-sm">
                <div className="p-6 flex items-start justify-between gap-1 text-right mobile:text-left mobile:flex-col mobile:gap-4 ">
                    <div className="flex items-center">
                        <p className="min-w-fit after:content-['|'] after:px-1">© Copyright 2024</p>
                        <Image src={`/img/LEC-mural.jpg`} width={24} height={24} alt={`Liliana Logo`} className="rounded-[50%]" />
                    </div>
                    <div className="flex flex-col items-end [&_p]:py-[0.15rem] max-w-[600px]">
                        <p>I acknowledge traditional owners of Country throughout Australia. </p>
                        <p>I recognised their continuing connection to lands, waters and communities.</p>
                        <p>I acknowledge the Widjabul Wiyebal people of the Bundjalung Nation,</p>
                        <p>custodians of the land on which I am living.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
