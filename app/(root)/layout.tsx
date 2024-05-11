import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import { getLoggedInUser } from "@/lib/actions/user.action";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggendIn = await getLoggedInUser();

  if (!loggendIn) redirect('/')
  return (
    <main className="flex h-screen w-full font-inter">
        <SideBar user={loggendIn}/>
        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image src='/icons/logo.svg' width={30} height={30} alt="menu icon"/>
            <div>
              <MobileNav user={loggendIn}/>
            </div>
          </div>
          {children}
        </div>
    </main>
  );
}
