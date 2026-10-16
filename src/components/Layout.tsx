import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import type { LayoutCtx } from "../types";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";

export default function Layout() {
  const [carrinho, setCarrinho] = useState(2);
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, search, hash]);

  const ctx: LayoutCtx = { adicionar: () => setCarrinho((n) => n + 1) };

  return (
    <>
      <Navbar carrinho={carrinho} />
      <main>
        <Outlet context={ctx} />
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
