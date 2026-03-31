import { Button } from "primereact/button";

export default function ShineButton({
  label = "Apply",
  handleClick,
  buttonStyles,
  icon,
  otherStyles,
  loading = false,
  disabled = false,
}: {
  label?: string;
  buttonStyles?: object;
  otherStyles?: object;
  icon?: React.ReactNode;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex justify-center" style={otherStyles}>
      <style>
        {`
          @keyframes shine {
            0% { left: -100%; }
            100% { left: 200%; }
          }

          .group:hover .shine-effect {
            animation: shine 0.8s ease-out;
          }
        `}
      </style>

      <Button
        label={label}
        className="
          group relative overflow-hidden bg-[#96d232]! hover:bg-[#aae846]! text-black! hover:text-white! border-none! font-medium text-lg rounded-full! px-10! py-3! transition-all! duration-300! hover:scale-105! hover:shadow-xl! focus:shadow-none! focus:ring-0!
        "
        style={buttonStyles}
        onClick={handleClick}
        loading={loading}
        disabled={disabled || loading}
      >
        <span
          className="
            shine-effect
            absolute top-0 -left-full h-full w-1/2
            -skew-x-12
            bg-linear-to-r from-transparent via-white to-transparent opacity-40
            pointer-events-none
          "
        />
        <div className="px-2">{icon}</div>
      </Button>
    </div>
  );
}
