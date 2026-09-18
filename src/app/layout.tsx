import "./globals.css";

export const metadata = {
  title: "Ojol Kecamatan",
  description: "Transportasi warga tanpa potongan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
