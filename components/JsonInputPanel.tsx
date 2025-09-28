import React, { useState } from 'react';

type DetailLevel = 'concise' | 'standard' | 'detailed';
type GenerationMode = 'standard' | 'visual';

interface JsonInputPanelProps {
  // Props for outline generation
  onGenerateOutline: (topic: string, audience: string, goal: string, detail: DetailLevel) => void;
  isResearching: boolean;
  researchError: string | null;
  sources: any[];
  
  // Props for text-to-slide generation
  textForGeneration: string;
  setTextForGeneration: (value: string) => void;
  onGenerateSlides: (text: string) => void;
  isGeneratingSlides: boolean;
  loadingMessage: string;
  generationMode: GenerationMode;
  setGenerationMode: (mode: GenerationMode) => void;


  // Props for JSON editing
  rawJson: string;
  setRawJson: (value: string) => void;
  jsonError: string | null;
}

export const JsonInputPanel: React.FC<JsonInputPanelProps> = ({ 
  onGenerateOutline, isResearching, researchError, sources,
  textForGeneration, setTextForGeneration, onGenerateSlides, isGeneratingSlides, loadingMessage, generationMode, setGenerationMode,
  rawJson, setRawJson, jsonError
}) => {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [goal, setGoal] = useState('');
  const [detail, setDetail] = useState<DetailLevel>('standard');

  const handleGenerateOutline = () => {
    onGenerateOutline(topic, audience, goal, detail);
  };

  const isOutlineButtonDisabled = isResearching || !topic.trim() || !audience.trim() || !goal.trim();

  return (
    <div className="space-y-8">
      {/* Step 0: Outline Generation */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Step 0: テーマから構成案を作成</h2>
        <p className="text-sm text-gray-600 mb-4">
          話したいテーマが決まっているだけで、まだ内容が固まっていない場合は、ここからAIに構成案を作成させることができます。
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">プレゼンテーションのテーマ</label>
            <input type="text" id="topic" value={topic} onChange={e => setTopic(e.target.value)} placeholder="例：最新のAI技術トレンド" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>
          <div>
            <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-1">主な対象者</label>
            <input type="text" id="audience" value={audience} onChange={e => setAudience(e.target.value)} placeholder="例：非エンジニアのマネージャー層" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">資料のゴール</label>
            <input type="text" id="goal" value={goal} onChange={e => setGoal(e.target.value)} placeholder="例：AI導入のメリットを理解し、予算承認を得る" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">詳細レベル</label>
            <div className="flex space-x-4">
              {(['concise', 'standard', 'detailed'] as DetailLevel[]).map(level => (
                <label key={level} className="flex items-center">
                  <input type="radio" name="detail" value={level} checked={detail === level} onChange={() => setDetail(level)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"/>
                  <span className="ml-2 text-sm text-gray-700">{ {concise: '簡潔', standard: '標準', detailed: '詳細'}[level] }</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={handleGenerateOutline}
          disabled={isOutlineButtonDisabled}
          className="mt-4 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out flex items-center justify-center"
        >
          {isResearching ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              調査・構成中...
            </>
          ) : '📝 構成案を生成する'}
        </button>
        {researchError && <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm"><strong>エラー:</strong> {researchError}</div>}
        {sources.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-600">参照ソース:</h3>
            <ul className="list-disc list-inside text-xs text-gray-500 mt-1 space-y-1">
              {sources.map((source, index) => (
                <li key={index}>
                  <a href={source.web?.uri} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 truncate">{source.web?.title || source.web?.uri}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Step 1: Text-to-Slide Generation */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Step 1: テキストからスライド生成</h2>
        <p className="text-sm text-gray-600 mb-4">
          Step 0で生成された構成案、またはご自身で用意したテキストを貼り付けてスライドを生成します。
        </p>
        <textarea
          value={textForGeneration}
          onChange={(e) => setTextForGeneration(e.target.value)}
          placeholder="ここにテキスト（議事録、記事、アイデアなど）を貼り付けてください..."
          className="w-full h-40 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          disabled={isGeneratingSlides}
        />

        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">生成モード</label>
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setGenerationMode('standard')}
              className={`px-4 py-2 text-sm font-medium border rounded-l-md w-1/2 transition-colors duration-150 ${
                generationMode === 'standard'
                  ? 'bg-indigo-600 text-white border-indigo-600 z-10'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              スタンダードモード
            </button>
            <button
              onClick={() => setGenerationMode('visual')}
              className={`px-4 py-2 text-sm font-medium border rounded-r-md w-1/2 transition-colors duration-150 ${
                generationMode === 'visual'
                  ? 'bg-indigo-600 text-white border-indigo-600 z-10'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              AIビジュアルモード
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 px-1">
              {generationMode === 'standard' 
                  ? 'テキスト中心のスライドを高速に生成します。' 
                  : 'AIが内容を解釈し、図解やインフォグラフィックを自動生成します。(時間がかかる場合があります)'}
          </p>
        </div>
        
        <button
          onClick={() => onGenerateSlides(textForGeneration)}
          disabled={isGeneratingSlides || !textForGeneration.trim()}
          className="mt-2 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out flex items-center justify-center"
        >
          {isGeneratingSlides ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {loadingMessage || 'スライド生成中...'}
            </>
          ) : '✨ AIでスライドを生成する'}
        </button>
        {jsonError && !isGeneratingSlides && <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm"><strong>エラー:</strong> {jsonError}</div>}

      </div>
      
      {/* Step 2: JSON Editing */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Step 2: スライドデータ (JSON) を編集</h2>
        <p className="text-sm text-gray-600 mb-4">
          AIが生成したスライドデータを直接編集して、内容を微調整することができます。
        </p>
        <textarea
          value={rawJson}
          onChange={(e) => setRawJson(e.target.value)}
          placeholder='生成されたJSONデータがここに表示されます。直接編集も可能です。'
          className="w-full h-80 p-3 font-mono text-sm bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {jsonError && (
            <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                <strong>エラー:</strong> {jsonError}
            </div>
        )}
      </div>
    </div>
  );
};
