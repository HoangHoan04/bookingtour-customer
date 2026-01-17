import { HotelVideo } from "@/assets/videos";

export default function HomeSection() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src={HotelVideo} type="video/mp4" />
      </video>

      {/* Overlay mờ giúp chữ nổi bật hơn */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.2))",
          zIndex: 0.5,
        }}
      />
    </section>
  );
}
