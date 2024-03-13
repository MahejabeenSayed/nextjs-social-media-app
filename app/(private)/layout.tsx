"use client";

import { SWRConfig } from "swr";
import Footer from "./footer";
import Header from "./header";
import Navbar from "./navbar";
import fetcher from "../util/fetcher";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SWRConfig value={{ fetcher: fetcher }}>
        <div className="flex flex-col min-h-screen max-w-md m-auto items-center justify-center">
          <Header />
          <Navbar />
          <main className="flex flex-col w-full p-3 bg-slate-800 text-white rounded-lg">
            {children}
          </main>
          <Footer />
        </div>
      </SWRConfig>
    </>
  );
}
