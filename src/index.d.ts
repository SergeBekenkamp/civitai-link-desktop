import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      setKey: (key: string) => void;
      selectFolder: () => void;
      setDirectory: (type: string, path: string) => void;
      clearSettings: () => void;
    };
  }

  type Resource = {
    hash: string;
    name: string;
    modelName: string;
    modelVersionName: string;
    type: string;
    url: string;
  };

  type Activity = {
    [k: string]: {
      downloadDate: string;
      totalLength: number;
    } & Model;
  };

  enum ResourceType {
    MODEL = 'model',
    LORA = 'lora',
    LYCORIS = 'lycoris',
    DEFAULT = 'default',
  }
}
