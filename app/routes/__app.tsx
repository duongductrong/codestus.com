import { Outlet } from "@remix-run/react";
import Header from "~/components/Common/Header/Header";

export interface AppProps {}

const App = (props: AppProps) => {
  return (
    <div id="app">
      <Header />
      <main className="container py-5">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
