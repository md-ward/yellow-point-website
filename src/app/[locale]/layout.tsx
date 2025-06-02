import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import Navbar from "../../components/Navbar";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body
        suppressHydrationWarning={true}
        className="min-h-screen bg-gradient-to-br from-[#2d2d2d] to-[#1c1c1c] text-white font-sans flex flex-col"
      >
        <NextIntlClientProvider locale={locale}>
          <Navbar />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
