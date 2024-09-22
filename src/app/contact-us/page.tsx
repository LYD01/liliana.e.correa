import Image from "next/image";
export default function ContactUsPage() {
    return (
        <div className="pt-10 flex items-center flex-col gap-10 max-w-[1280px] mx-auto pb-10 tabletAndBelow:px-4">
            <h1>Contact</h1>
            <a href="mailto:lilianaecorrea55@gmail.com" className="flex items-center gap-1 "><Image src={"/icons/mail_24dp_FILL0_wght400_GRAD0_opsz24.svg"} alt={"mail icon"} width={20} height={20} /> Email me at lilianaecorrea55@gmail.com</a>
            <a href="https://linkedin.com/in/liliana-correa-a6670b19" target="_blank">View more on my LinkedIn profile</a>
        </div>
    );
}
