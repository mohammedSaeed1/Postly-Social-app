import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Postly - Social Media App",
  description: "Add your Posts & thoughts and you can add Comment , update and delete Post or Comment also User can add Profile Picture",
  keywords:["Post" , "Comment" , "Social APP"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
