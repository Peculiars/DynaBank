import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggenIn = {firstName: 'Damilare', lastName: 'Olaitan'}
  return (
    <main className="flex h-screen w-full font-inter">
        <SideBar user={loggenIn}/>
        {children}
    </main>
  );
}
