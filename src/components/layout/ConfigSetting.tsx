import { CnFlag, EnFlag, VnFlag } from "@/assets/icons";
import { useConfig } from "@/context/ConfigContext";
import { useTheme } from "@/context/ThemeContext";
import { Dropdown, type DropdownProps } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { Sidebar } from "primereact/sidebar";

type ConfigSettingProps = {
  visible: boolean;
  onHide: () => void;
};

interface LanguageOption {
  label: string;
  value: string;
  flag: string;
}

export default function ConfigSetting({ visible, onHide }: ConfigSettingProps) {
  const { theme, setTheme } = useTheme();
  const { settings, updateSettings } = useConfig();

  const languageOptions: LanguageOption[] = [
    {
      label: "Tiếng Việt",
      value: "vi",
      flag: VnFlag,
    },
    {
      label: "English",
      value: "en",
      flag: EnFlag,
    },
    {
      label: "中文",
      value: "zh",
      flag: CnFlag,
    },
  ];

  const selectedLanguageTemplate = (
    option: LanguageOption,
    props: DropdownProps
  ) => {
    if (option) {
      return (
        <div className="flex items-center gap-2">
          <img
            alt={option.label}
            src={option.flag}
            className="w-6 h-4 object-cover rounded shadow-sm"
          />
          <span>{option.label}</span>
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const languageOptionTemplate = (option: LanguageOption) => {
    return (
      <div className="flex items-center gap-3">
        <img
          alt={option.label}
          src={option.flag}
          className="w-6 h-4 object-cover rounded shadow-sm"
        />
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <Sidebar
      visible={visible}
      onHide={onHide}
      position="right"
      className="w-full sm:w-[500px] lg:w-[600px] bg-(--surface-overlay) text-(--text-color)"
      header={<h2 className="text-xl font-semibold m-0">Cài đặt</h2>}
    >
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-(--surface-hover) transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
              <i
                className={`pi ${
                  theme === "dark" ? "pi-moon" : "pi-sun"
                } text-lg text-blue-500`}
              ></i>
            </div>
            <div>
              <p className="font-medium m-0">Giao diện</p>
              <p className="text-sm text-(--text-color-secondary) m-0">
                {theme === "dark" ? "Chế độ tối" : "Chế độ sáng"}
              </p>
            </div>
          </div>
          <InputSwitch
            checked={theme === "dark"}
            onChange={(e) => setTheme(e.value ? "dark" : "light")}
          />
        </div>

        <hr className="border-(--surface-border)" />

        <div className="p-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
              <i className="pi pi-globe text-lg text-green-500"></i>
            </div>
            <div>
              <p className="font-medium m-0">Ngôn ngữ</p>
              <p className="text-sm text-(--text-color-secondary) m-0">
                Chọn ngôn ngữ hiển thị
              </p>
            </div>
          </div>

          <Dropdown
            value={settings.language}
            onChange={(e) => updateSettings("language", e.value)}
            options={languageOptions}
            optionLabel="label"
            valueTemplate={selectedLanguageTemplate}
            itemTemplate={languageOptionTemplate}
            className="w-full"
            pt={{
              root: { className: "w-full border-(--surface-border)" },
              input: { className: "flex items-center" },
            }}
          />
        </div>

        <hr className="border-(--surface-border)" />

        <div className="p-4 rounded-lg bg-(--surface-ground) border border-(--surface-border)">
          <p className="text-sm m-0 text-(--text-color-secondary) flex items-center gap-2">
            <i className="pi pi-info-circle text-blue-500"></i>
            Các cài đặt của bạn sẽ được lưu tự động vào trình duyệt này.
          </p>
        </div>
      </div>
    </Sidebar>
  );
}
