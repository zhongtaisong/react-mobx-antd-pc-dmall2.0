import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 跳转路由页面滚动至顶部
 * @returns 
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};