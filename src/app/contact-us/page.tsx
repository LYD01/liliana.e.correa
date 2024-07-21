import Image from "next/image";
export default function ContactUsPage() {
    return (
        <div className="bg-slate-500 h-[89vh]">             
            <div className="px-1 pt-20 container mx-auto flex items-center flex-col gap-4 "> 
                <h1 className="">Contact Me</h1>
                <a href="mailto:lilianaecorrea55@gmail.com" className="flex items-center gap-1"><Image src={"/icons/mail_24dp_FILL0_wght400_GRAD0_opsz24.svg"} alt={"mail icon"} width={20} height={20} /> Email me at lilianaecorrea55@gmail.com</a>
                <a href="linkedin.com/in/liliana-correa-a6670b19">
{/* <Image src={""} alt={""} width={'20'} height={'20'}/>  */}
View more on my LinkedIn profile</a>
            </div>
        </div>
    );
}