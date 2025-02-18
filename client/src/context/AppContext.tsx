import * as React from "react";
import {ReactNode, StrictMode, Suspense} from "react";
import {ThoriumProvider} from "./ThoriumContext";
import {AlertDialog} from "@thorium/ui/AlertDialog";
import useEasterEgg from "../hooks/useEasterEgg";
import {ErrorBoundary, FallbackProps} from "react-error-boundary";
import bg from "../images/background.jpg";
import ToastContainer from "./ToastContext";
import {LoadingSpinner} from "@thorium/ui/LoadingSpinner";
import {IssueTrackerProvider} from "../components/IssueTracker";

const Fallback: React.FC<FallbackProps> = ({error}) => {
  return (
    <div className="p-4 text-white">
      <h1 className="text-5xl">Error</h1>
      <h2 className="text-3xl">{error?.message}</h2>
    </div>
  );
};

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div
      className="z-0 absolute top-0 bg-center bg-cover w-full h-full text-white"
      style={{
        backgroundImage: `linear-gradient(
  135deg,
  rgba(0, 0, 0, 1) 0%,
  rgba(0, 0, 0, 0) 40%,
  rgba(0, 0, 0, 0) 60%,
  rgba(0, 0, 0, 1) 100%
),
url(${bg})`,
      }}
    >
      {children}
    </div>
  );
};
/**
 * A component to contain all of the context and wrapper components for the app.
 */
export default function AppContext({children}: {children: ReactNode}) {
  useEasterEgg();
  return (
    <StrictMode>
      <Layout>
        <ErrorBoundary FallbackComponent={Fallback}>
          <Suspense fallback={<LoadingSpinner />}>
            <ThoriumProvider>
              <ErrorBoundary FallbackComponent={Fallback}>
                <Suspense fallback={<LoadingSpinner />}>
                  <AlertDialog>
                    <IssueTrackerProvider>{children}</IssueTrackerProvider>
                    <ToastContainer />
                  </AlertDialog>
                </Suspense>
              </ErrorBoundary>
            </ThoriumProvider>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </StrictMode>
  );
}
