import localFont from "next/font/local";

const NeueMetana = localFont({
    src: [
      {
        path: "../assets/fonts/NeueMetana-Regular.otf",
        weight: "400",
        style: "normal",
      },
      {
        path: "../assets/fonts/NeueMetana-Bold.otf",
        weight: "700",
        style: "normal",
      },
    ],
    variable: "--font-neue-metana",
  });
  
  export { NeueMetana };