const InfoItem = ({
  label,
  value,
  sub,
  isDark,
}: {
  label: string;
  value: string;
  sub?: string;
  isDark?: boolean;
}) => (
  <div className="flex flex-col">
    <span
      className={` ${isDark ? "text-teal-300" : "text-teal-800"} font-bold text-xs mb-1 uppercase tracking-wide opacity-80`}
    >
      {label}
    </span>
    <span
      className={` ${isDark ? "dark:text-slate-200" : "text-gray-700"} text-sm font-bold`}
    >
      {value}
    </span>
    {sub && (
      <span
        className={`text-orange-500 ${isDark ? "dark:text-orange-300" : ""} text-sm font-bold mt-1`}
      >
        {sub}
      </span>
    )}
  </div>
);

const imageTemplate = (image: string) => {
  return (
    <div className="p-2">
      <img
        src={image}
        alt="Product"
        className="w-full h-64 object-cover rounded-lg shadow-md"
      />
    </div>
  );
};

const itemTemplate = (item: any) => {
  return (
    <img
      src={item.itemImageSrc}
      alt={item.alt}
      style={{
        width: "100%",
        maxHeight: "400px",
        height: "300px",
        objectFit: "cover",
      }}
    />
  );
};

const thumbnailTemplate = (item: any) => {
  return <img src={item.thumbnailImageSrc} alt={item.alt} />;
};

const IncludeItem = ({
  label,
  included,
  isDark,
}: {
  label: string;
  included: boolean;
  isDark?: boolean;
}) => (
  <div className="flex items-center gap-3 mb-3">
    {included ? (
      <div className="w-5 h-5 rounded-full bg-[#96d232] flex items-center justify-center shrink-0">
        <i className="pi pi-check text-white text-[10px] font-bold"></i>
      </div>
    ) : (
      <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
        <i className="pi pi-times text-white text-[10px] font-bold"></i>
      </div>
    )}
    <span
      className={`font-medium text-sm ${
        included
          ? isDark
            ? "dark:text-teal-300"
            : "text-teal-800"
          : isDark
            ? "dark:text-slate-300"
            : "text-gray-500"
      }`}
    >
      {label}
    </span>
  </div>
);

const customizedMarker = (item: any) => {
  return (
    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-teal-600 shadow-md border-4 border-[#fffbf2] dark:border-slate-800 z-10">
      <span className="text-white font-bold text-sm leading-none">
        {item.day}
      </span>
      <span className="text-[8px] text-teal-100 uppercase mt-0.5">Day</span>
    </div>
  );
};

const customizedContent = (item: any) => {
  return (
    <div className="ml-4 mb-8">
      <h3 className="text-teal-800 dark:text-teal-300 font-bold text-lg mb-2">
        {item.title}
      </h3>
      <p className="text-gray-500 dark:text-slate-300 text-sm leading-relaxed">
        {item.desc}
      </p>
    </div>
  );
};

export {
  InfoItem,
  imageTemplate,
  itemTemplate,
  thumbnailTemplate,
  IncludeItem,
  customizedMarker,
  customizedContent,
};
