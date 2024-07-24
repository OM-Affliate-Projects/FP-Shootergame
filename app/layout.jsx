import "./globals.css";

export const metadata = {
  title: "MaSaFaKr Shootergame",
  description: "Final Project 3D Web Game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
