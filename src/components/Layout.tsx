import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";


export default function Layout() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, search, hash]);


  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
