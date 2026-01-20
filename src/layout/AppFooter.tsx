import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <i className="pi pi-ticket text-3xl text-blue-500"></i>
              <span className="text-xl font-bold ">HimLamTourist</span>
            </div>
            <p className="text-sm text-gray-400">
              Chúng tôi cam kết mang đến cho bạn trải nghiệm du lịch tuyệt vời
              và dịch vụ khách hàng xuất sắc.
            </p>
            <div className="flex space-x-3">
              <Button
                icon="pi pi-facebook"
                className="p-button-rounded p-button-text p-button-sm"
                aria-label="Facebook"
              />
              <Button
                icon="pi pi-twitter"
                className="p-button-rounded p-button-text p-button-sm"
                aria-label="Twitter"
              />
              <Button
                icon="pi pi-instagram"
                className="p-button-rounded p-button-text p-button-sm"
                aria-label="Instagram"
              />
              <Button
                icon="pi pi-youtube"
                className="p-button-rounded p-button-text p-button-sm"
                aria-label="YouTube"
              />
            </div>
          </div>

          <div>
            <h3 className=" font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-500 transition-colors text-sm"
                >
                  <i className="pi pi-angle-right mr-2"></i>
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/search-product"
                  className="hover:text-blue-500 transition-colors text-sm"
                >
                  <i className="pi pi-angle-right mr-2"></i>
                  Tìm kiếm nhanh tour
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-500 transition-colors text-sm"
                >
                  <i className="pi pi-angle-right mr-2"></i>
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-500 transition-colors text-sm"
                >
                  <i className="pi pi-angle-right mr-2"></i>
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors text-sm"
                >
                  <i className="pi pi-angle-right mr-2"></i>
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors text-sm"
                >
                  <i className="pi pi-angle-right mr-2"></i>
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors text-sm"
                >
                  <i className="pi pi-angle-right mr-2"></i>
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-500 transition-colors text-sm"
                >
                  <i className="pi pi-angle-right mr-2"></i>
                  Hướng dẫn đặt vé
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className=" font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm">
                <i className="pi pi-map-marker mt-1 text-blue-500"></i>
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <i className="pi pi-phone text-blue-500"></i>
                <span>1900 1234</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <i className="pi pi-envelope text-blue-500"></i>
                <span>support@himlamtourist.com</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <i className="pi pi-clock text-blue-500"></i>
                <span>24/7 - Hỗ trợ mọi lúc</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>
            © {currentYear} HimLamTourist. All rights reserved. Made with{" "}
            <i className="pi pi-heart-fill text-red-500"></i> in Vietnam
          </p>
        </div>
      </div>
    </footer>
  );
}
