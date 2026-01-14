import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";

export default function GlobalLoading() {
  const [loadingText, setLoadingText] = useState("Đang xử lý dữ liệu...");

  useEffect(() => {
    const texts = [
      "Đang đồng bộ đơn hàng...",
      "Kiểm tra kho hàng...",
      "Kết nối máy chủ...",
      "Đang in hóa đơn...",
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setLoadingText(texts[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="printer-wrapper">
        <div className="receipt-paper">
          <div className="receipt-line medium"></div>
          <div className="receipt-line short"></div>
          <div className="receipt-line full"></div>
          <div className="receipt-line full"></div>
          <div className="receipt-line medium"></div>
          <div className="receipt-line barcode"></div>
        </div>
        <div className="printer-body"></div>
      </div>

      <p className="loading-text">{loadingText}</p>

      <ProgressBar
        mode="indeterminate"
        className="custom-progress-bar"
        color="#1e293b"
      />
    </div>
  );
}
