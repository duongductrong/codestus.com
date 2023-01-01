import { Outlet } from "@remix-run/react";
import Footer from "~/components/Common/Footer/Footer";
import Header from "~/components/Common/Header/Header";

export interface AppProps {}

const App = (props: AppProps) => (
    <div id="app">
      <Header />
      <main className="container py-5 mb-32">
        <Outlet />
      </main>
      <Footer className="container" />
    </div>
  );

export default App;
