import { Button } from "primereact/button";
import type { JSX } from "react";

export default function NotFound(): JSX.Element {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden ">
      <div className="w-full max-w-md text-center mx-auto">
        <div className="flex justify-center mb-8">
          <i
            className="pi pi-exclamation-triangle text-yellow-500"
            style={{ fontSize: "8rem" }}
          ></i>
        </div>

        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>

        <p className="mt-10 mb-6 text-base text-gray-600 leading-relaxed">
          Có vẻ như chúng tôi không thể tìm thấy trang bạn đang tìm kiếm!
        </p>

        <Button
          label="Trở về trang chủ"
          icon="pi pi-home"
          className="p-button-outlined"
          onClick={() => (window.location.href = "/")}
        />
      </div>
    </div>
  );
}
