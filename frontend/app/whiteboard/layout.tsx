import "../globals.css";

export const metadata = {
  title: "PeerPrep Live Coding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="/favicon.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
