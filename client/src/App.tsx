import {Routes, Route, Outlet, BrowserRouter as Router} from "react-router-dom";
import {lazy, Suspense, useEffect} from "react";
import AppContext from "./context/AppContext";

import QuoteOfTheDay from "./components/QuoteOfTheDay";
import Credits from "./components/Credits";
import {WelcomeLogo} from "./components/WelcomeLogo";
import {WelcomeButtons} from "./components/WelcomeButtons";
import {FaCamera} from "react-icons/fa";
import Button from "@thorium/ui/Button";
import {netSend} from "./context/netSend";
import LoginButton from "./components/LoginButton";
import {LoadingSpinner} from "@thorium/ui/LoadingSpinner";
import QuickStartProvider from "./components/FlightQuickStart/FlightQuickStartContext";
import FlightQuickStart from "./components/FlightQuickStart";
import CrewConfig from "./components/FlightQuickStart/CrewConfig";
import ShipConfig from "./components/FlightQuickStart/ShipConfig";
import {netRequest} from "./context/useNetRequest";
import {ComponentDemo} from "./cards";

const DocLayout = lazy(() => import("./docs"));
const Config = lazy(() => import("./pages/Config"));

const MainPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="welcome h-full p-12 grid grid-cols-2 grid-rows-2">
          <WelcomeLogo />
          <Credits className="row-start-2 col-start-2" />

          <WelcomeButtons className="col-start-1 row-start-2" />
          <QuoteOfTheDay />
          <LoginButton />
        </div>
      </Suspense>
      <Outlet />
    </>
  );
};

const NoMatch = lazy(() => import("./pages/NotFound"));
const Releases = lazy(() => import("./pages/Releases"));
const FlightLobby = lazy(() => import("./pages/FlightLobby"));
const CardsDevelopment = lazy(() => import("./pages/CardsDevelopment"));
const CardRenderer = lazy(() => import("./pages/CardRenderer"));

function AppRoutes() {
  useEffect(() => {
    netRequest("availableStationsList");
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route
            path="/flight/quick"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <QuickStartProvider>
                  <FlightQuickStart />
                </QuickStartProvider>
              </Suspense>
            }
          >
            <Route
              path="crew"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <CrewConfig />
                </Suspense>
              }
            />
            <Route
              path="ship"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ShipConfig />
                </Suspense>
              }
            />

            <Route path="mission" element={null} />
          </Route>
        </Route>
        <Route path="/flight" element={<FlightLobby />} />
        <Route path="/cards" element={<CardsDevelopment />} />
        <Route path="/cards/:component" element={<CardRenderer />} />
        <Route
          path="/components"
          element={
            <div className="bg-gray-900 h-full overflow-y-auto">
              <div className="p-8">
                <ComponentDemo />
              </div>
            </div>
          }
        />
        <Route path="/releases" element={<Releases />} />
        <Route path="/docs/*" element={<DocLayout />}></Route>
        <Route path="/config/*" element={<Config />}></Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Snapshot />
    </>
  );
}
function Snapshot() {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <Button
      className="btn-circle fixed bottom-2 left-2 btn-ghost z-50"
      onClick={() => {
        netSend("serverSnapshot");
      }}
    >
      <FaCamera />
    </Button>
  );
}
function App() {
  return (
    <AppContext>
      <Router>
        <AppRoutes />
      </Router>
    </AppContext>
  );
}

export default App;
