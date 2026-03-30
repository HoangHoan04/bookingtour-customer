export default function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={`text-3xl text-[#0f766e] font-bold ${className}`}>
      {children}
    </h1>
  );
}
