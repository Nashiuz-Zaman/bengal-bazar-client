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
import { Backdrop } from "@/components/shared/Backdrop";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-neutral-800`}>
        <div
          style={{ maxWidth: "2560px", width: "100%" }}
          className="mx-auto min-h-screen"
        >
          <ReduxProvider>
            <AuthStateProvider>
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
                  <Backdrop />
                  <div className="relative z-4" id="modal-root" />
                </GSAPProvider>
              </RefsProvider>
            </AuthStateProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
