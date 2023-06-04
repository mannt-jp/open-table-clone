import NavBar from "./components/NavBar";
import "./globals.css";
import Providers from "./components/providers";

export const metadata = {
  title: "OpenTable",
  description: "Restaurant reservation app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="bg-gray-100 min-h-screen w-screen">
          <Providers>
            <main className="max-w-screen-2xl m-auto bg-white">
              <NavBar></NavBar>
              {children}
            </main>
          </Providers>
        </main>
      </body>
    </html>
  );
}
