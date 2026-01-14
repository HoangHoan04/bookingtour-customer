import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ZaloCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (window.opener) {
      if (code) {
        window.opener.postMessage(
          { type: "ZALO_AUTH_CODE", code: code },
          window.location.origin
        );
      }
      window.close();
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[--surface-ground]">
      <div className="text-center">
        <ProgressSpinner style={{ width: "50px", height: "50px" }} />
        <p className="mt-4 text-[--text-color]">Đang xử lý đăng nhập Zalo...</p>
      </div>
    </div>
  );
};

export default ZaloCallback;
