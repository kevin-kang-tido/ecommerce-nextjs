import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBarComponent from "@/components/layout/navbar/NavBarComponent";
import SessionWrapper from "./SeeionWrapper";
import NextUILayout from "./NextUIProvider";
import React, { Suspense } from "react";
import LoadingComponent from "./loading";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import StoreProvider from "./StoreProvider";
import FooterComponents from "@/components/layout/footer/FooterComponent";


const inter = Inter({ subsets: ["latin"] });

// in layout

export const metadata: Metadata = {
    title: {
        template: "%s - Kang Company",
        default: "Sparkle - Your Destination for Fashion",
    },
    description: "Discover the latest trends in fashion at Sparkle. From chic dresses to stylish accessories, find everything you need to elevate your wardrobe.",
    keywords: ["Sparkle", "clothing", "fashion", "apparel", "style", "trend", "shop", "ecommerce", "sell"],
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // add seesionWeapper 
    <SessionWrapper>
    <html lang="en">
      <body className={inter.className}>
        <NextUILayout>
          <StoreProvider>
              <header>
                <NavBarComponent/>
              </header> 
              <main>
              <Suspense fallback={<LoadingComponent/>}>
                  <ErrorBoundary errorComponent={Error}>
                  {children}
                  </ErrorBoundary>
              </Suspense> 
              </main>
              <footer>
                <FooterComponents></FooterComponents>
              </footer>
            </StoreProvider>
        </NextUILayout>
      </body>
    </html>
    </SessionWrapper>
  );
}
