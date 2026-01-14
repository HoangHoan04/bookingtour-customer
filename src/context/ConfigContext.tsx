import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from "react";

export type AppSettings = {
  notifications: boolean;
  language: string;
  itemsPerPage: number;
  autoSave: boolean;
  showTabHeader: boolean;
};

type ConfigContextType = {
  settings: AppSettings;
  updateSettings: (key: keyof AppSettings, value: any) => void;
  resetSettings: () => void;
};

const defaultSettings: AppSettings = {
  notifications: true,
  language: "vi",
  itemsPerPage: 10,
  autoSave: true,
  showTabHeader: true,
};

const STORAGE_KEY = "app_config_settings";

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultSettings, ...parsed.settings };
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
    return defaultSettings;
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          settings,
        })
      );
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  }, [settings]);

  const updateSettings = (key: keyof AppSettings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ConfigContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within ConfigProvider");
  }
  return context;
};
