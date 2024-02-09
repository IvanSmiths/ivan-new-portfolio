import "../styles/globals.css";
import Navbar from "../components/Global/Navbar";
import React from "react";
import GoogleAnalytics from "../utils/GoogleAnalytics";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_TRACKING_ID={process.env.GA_TRACKING_ID} />
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
