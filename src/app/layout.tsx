// ---------------------------------------------------------
// GLOBAL STYLES
// ---------------------------------------------------------
import "./globals.css";

// ---------------------------------------------------------
// UI LIBRARIES
// ---------------------------------------------------------
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ---------------------------------------------------------
// GLOBAL FONTS
// ---------------------------------------------------------
import { poppins } from "./fonts";

// ---------------------------------------------------------
// TYPES
// ---------------------------------------------------------
import GSAPProvider from "@/providers/GsapProvider";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { AuthStateProvider } from "@/providers/AuthStateProvider";
import { RefsProvider } from "@/providers/RefProvider";
import { CartStateProvider } from "@/providers/CartStateProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-neutral-800`}>
        <div className="mx-auto max-w-640 w-full min-h-screen overflow-x-hidden overflow-y-auto">
          <ReduxProvider>
            <AuthStateProvider>
              <CartStateProvider>
                <RefsProvider>
                  <GSAPProvider>
                    <ToastContainer
                      position="top-center"
                      autoClose={2000}
                      transition={Zoom}
                      hideProgressBar
                      newestOnTop
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
                    {children}

                    {/* All modals will be injected here */}
                    <div id="modal-root" />
                  </GSAPProvider>
                </RefsProvider>
              </CartStateProvider>
            </AuthStateProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
