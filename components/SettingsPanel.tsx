
import React from 'react';
import { DesignSettings } from '../types';

interface SettingsPanelProps {
  settings: DesignSettings;
  setSettings: React.Dispatch<React.SetStateAction<DesignSettings>>;
}

const themes = [
  { name: 'デフォルト', settings: { primaryColor: '#4285F4', fontFamily: 'Noto Sans JP' } },
  { name: 'プロフェッショナル', settings: { primaryColor: '#0D47A1', fontFamily: 'Roboto' } },
  { name: 'クリエイティブ', settings: { primaryColor: '#D81B60', fontFamily: 'Montserrat' } },
  { name: 'ミニマル', settings: { primaryColor: '#374151', fontFamily: 'Inter' } },
  { name: '和風モダン', settings: { primaryColor: '#6a5acd', fontFamily: 'Noto Sans JP' } },
  { name: 'ナチュラル', settings: { primaryColor: '#2E8B57', fontFamily: 'Lato' } },
];

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, setSettings }) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, primaryColor: e.target.value }));
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings(prev => ({ ...prev, fontFamily: e.target.value }));
  };

  const handleDateToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({...prev, showDate: e.target.checked}));
  }
  
  const handleDateTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, dateText: e.target.value }));
  };
  
  const handleSubtitleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSettings(prev => ({ ...prev, subtitleText: e.target.value }));
  };

  const handleFooterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, footerText: e.target.value }));
  };
  
  const handleThemeChange = (themeSettings: Partial<DesignSettings>) => {
    setSettings(prev => ({ ...prev, ...themeSettings }));
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">デザイン設定</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          デザインテーマ
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {themes.map(theme => (
            <button
              key={theme.name}
              onClick={() => handleThemeChange(theme.settings)}
              className="px-3 py-2 text-sm font-medium text-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-2">
            プライマリカラー
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              id="primaryColor"
              value={settings.primaryColor}
              onChange={handleColorChange}
              className="w-12 h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
            />
            <input
              type="text"
              value={settings.primaryColor}
              onChange={handleColorChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="#4285F4"
            />
          </div>
        </div>
        <div>
          <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 mb-2">
            フォント
          </label>
          <select
            id="fontFamily"
            value={settings.fontFamily}
            onChange={handleFontChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>Inter</option>
            <option>Noto Sans JP</option>
            <option>Roboto</option>
            <option>Lato</option>
            <option>Montserrat</option>
            <option>M PLUS Rounded 1c</option>
          </select>
        </div>
         <div>
          <label htmlFor="subtitleText" className="block text-sm font-medium text-gray-700 mb-2">
            サブタイトル（任意）
          </label>
          <input
            type="text"
            id="subtitleText"
            value={settings.subtitleText}
            onChange={handleSubtitleTextChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="作成者名など"
          />
        </div>
        <div className="space-y-2">
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="showDate"
                name="showDate"
                type="checkbox"
                checked={settings.showDate}
                onChange={handleDateToggle}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="showDate" className="font-medium text-gray-700">
                タイトルスライドに日付を表示
              </label>
              <p className="text-gray-500">表紙スライドの日付の表示・非表示を切り替えます。</p>
            </div>
          </div>
          <div className="pl-8">
             <input
              type="text"
              id="dateText"
              value={settings.dateText}
              onChange={handleDateTextChange}
              disabled={!settings.showDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="YYYY.MM.DD"
            />
          </div>
        </div>
         <div>
          <label htmlFor="footerText" className="block text-sm font-medium text-gray-700 mb-2">
            フッターテキスト（任意）
          </label>
          <input
            type="text"
            id="footerText"
            value={settings.footerText}
            onChange={handleFooterTextChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="© 2024 Your Company"
          />
        </div>
      </div>
    </div>
  );
};
