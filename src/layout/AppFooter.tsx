import { footerImg } from "@/assets/images";

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  const instagramImages = [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
    "https://images.unsplash.com/photo-1516939884455-1445c8652f83?w=400",
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400",
  ];

  return (
    <footer className="relative bg-linear-to-br from-teal-700 via-teal-600 to-teal-700 text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={footerImg}
          alt="Travel background"
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-linear-to-br from-teal-700/90 via-teal-600/90 to-teal-700/90"></div>
      </div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-[200px]">
          <i className="pi pi-map-marker"></i>
        </div>
        <div className="absolute bottom-20 right-20 text-[150px]">
          <i className="pi pi-compass"></i>
        </div>
      </div>

      <div className="relative container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-3 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">
                <span
                  style={{
                    fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
                    fontWeight: 700,
                    color: "white",
                    fontFamily: "'Brush Script MT', cursive",
                    textShadow: `
                      3px 3px 0 rgba(0,0,0,0.3),
                      6px 6px 0 rgba(0,0,0,0.2),
                      0 0 40px rgba(255,255,255,0.3)
                `,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  HimLam Tourist
                </span>
              </span>
            </div>
            <p className="text-sm text-teal-100 leading-relaxed">
              Travlla is a multi-award-winning strategy and content creation
              agency that specializes in travel marketing.
            </p>
            <div className="flex space-x-3">
              <button className="w-12 h-12 rounded-full bg-transparent border-2 border-yellow-400 hover:bg-yellow-400 transition-all flex items-center justify-center group">
                <i className="pi pi-twitter text-yellow-400 group-hover:text-teal-700 text-lg"></i>
              </button>
              <button className="w-12 h-12 rounded-full bg-transparent border-2 border-yellow-400 hover:bg-yellow-400 transition-all flex items-center justify-center group">
                <i className="pi pi-facebook text-yellow-400 group-hover:text-teal-700 text-lg"></i>
              </button>
              <button className="w-12 h-12 rounded-full bg-transparent border-2 border-yellow-400 hover:bg-yellow-400 transition-all flex items-center justify-center group">
                <i className="pi pi-instagram text-yellow-400 group-hover:text-teal-700 text-lg"></i>
              </button>
              <button className="w-12 h-12 rounded-full bg-transparent border-2 border-yellow-400 hover:bg-yellow-400 transition-all flex items-center justify-center group">
                <i className="pi pi-pinterest text-yellow-400 group-hover:text-teal-700 text-lg"></i>
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  FAQ's
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  News & Articles
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Destinations</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  Tokyo
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  France
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  Dubai
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  Kenya
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  Vietnam
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  Terms & Condition
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-teal-100 hover:text-yellow-400 transition-colors text-sm"
                >
                  Help
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <div className="flex items-center space-x-3 bg-teal-600/50 rounded-lg p-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/50 flex items-center justify-center shrink-0">
                <i className="pi pi-phone text-lg"></i>
              </div>
              <span className="text-yellow-400 font-bold text-xl italic">
                123 654 0214
              </span>
            </div>
            <div className="flex items-center space-x-3 bg-teal-600/50 rounded-lg p-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/50 flex items-center justify-center shrink-0">
                <i className="pi pi-envelope text-lg"></i>
              </div>
              <span className="text-sm">travllainfo@gmail.com</span>
            </div>
            <div className="flex items-start space-x-3 bg-teal-600/50 rounded-lg p-3">
              <div className="w-10 h-10 rounded-full bg-teal-500/50 flex items-center justify-center shrink-0">
                <i className="pi pi-map-marker text-lg"></i>
              </div>
              <span className="text-sm">55/11 ronin tower New York</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6">Follow Instagram</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {instagramImages.map((img, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Instagram ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-6 border-t border-teal-500/30">
          <p className="text-sm text-teal-100">
            © {currentYear}{" "}
            <span className="text-yellow-400 font-semibold">HimLamTourist</span>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
