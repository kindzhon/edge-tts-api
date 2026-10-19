import { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'api' | 'demo' | 'deploy'>('api');
  const [text, setText] = useState('你好，欢迎使用 Edge TTS API！');
  const [voice, setVoice] = useState('zh-CN-YunxiNeural');
  const [rate, setRate] = useState(0);
  const [vol, setVol] = useState(50);
  const [pit, setPit] = useState(0);

  const voices = [
    { label: '云希 (男声)', value: 'zh-CN-YunxiNeural' },
    { label: '云扬 (男声)', value: 'zh-CN-YunyangNeural' },
    { label: '云健 (男声)', value: 'zh-CN-YunjianNeural' },
    { label: '云泽 (男声)', value: 'zh-CN-YunzeNeural' },
    { label: '晓晓 (女声)', value: 'zh-CN-XiaoxiaoNeural' },
    { label: '晓伊 (女声)', value: 'zh-CN-XiaoyiNeural' },
    { label: '晓墨 (女声)', value: 'zh-CN-XiaomoNeural' },
    { label: '晓萱 (女声)', value: 'zh-CN-XiaoxuanNeural' },
    { label: '晓辰 (女声)', value: 'zh-CN-XiaochenNeural' },
    { label: '晓涵 (女声)', value: 'zh-CN-XiaohanNeural' },
    { label: '晓梦 (女声)', value: 'zh-CN-XiaomengNeural' },
    { label: '晓秋 (女声)', value: 'zh-CN-XiaoqiuNeural' },
    { label: '晓柔 (女声)', value: 'zh-CN-XiaoruiNeural' },
    { label: '晓双 (女声)', value: 'zh-CN-XiaoshuangNeural' },
    { label: '晓颜 (女声)', value: 'zh-CN-XiaoyanNeural' },
    { label: '晓悠 (女声)', value: 'zh-CN-XiaoyouNeural' },
  ];

  const apiUrl = `/?tex=${encodeURIComponent(text)}&spk=${voice}&rate=${rate}&vol=${vol}&pit=${pit}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
              🔊
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Edge-TTS-API
              </h1>
              <p className="text-xs text-gray-500">基于 Microsoft Edge TTS 的在线语音合成</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              ● 在线
            </span>
            <a
              href="https://github.com/rany2/edge-tts"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              免费高质量语音合成
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            模仿百度 TTS API 接口风格，使用 Microsoft Edge TTS 引擎。
            支持 16+ 种中文语音角色，直接返回 MP3 文件。
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700">免费使用</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700">高质量语音</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700">直接返回 MP3</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-gray-700">Streamlit 部署</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-xl shadow-sm border p-1">
            {(['api', 'demo', 'deploy'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab === 'api' && '📡 API 文档'}
                {tab === 'demo' && '🎮 在线演示'}
                {tab === 'deploy' && '🚀 部署指南'}
              </button>
            ))}
          </div>
        </div>

        {/* API Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            {/* API URL Format */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📡 接口地址</h3>
              <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto">
                <p className="text-gray-400 mb-2"># 接口格式（模仿百度 TTS API）</p>
                <p>GET https://your-app.streamlit.app/</p>
                <p className="mt-2 text-gray-400"># 对比百度 TTS API</p>
                <p className="text-yellow-300">http://tts.baidu.com/text2audio?cuid=baike&lan=ZH&ctp=1&pdt=301&vol=15&rate=32&tex=test</p>
                <p className="mt-2 text-gray-400"># Edge-TTS-API</p>
                <p className="text-green-300">https://your-app.streamlit.app/?tex=test&spk=zh-CN-YunxiNeural&rate=0&vol=50&pit=0</p>
              </div>
            </div>

            {/* Parameters */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📋 参数说明</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">参数</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">类型</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">默认值</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono text-indigo-600 font-medium">tex</td>
                      <td className="py-3 px-4 text-gray-600">string</td>
                      <td className="py-3 px-4 text-gray-600">-</td>
                      <td className="py-3 px-4 text-gray-600">要合成的文本（必填）</td>
                    </tr>
                    <tr className="border-b bg-gray-50/50">
                      <td className="py-3 px-4 font-mono text-indigo-600 font-medium">spk</td>
                      <td className="py-3 px-4 text-gray-600">string</td>
                      <td className="py-3 px-4 font-mono text-xs">zh-CN-YunxiNeural</td>
                      <td className="py-3 px-4 text-gray-600">语音角色（默认：云希）</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-mono text-indigo-600 font-medium">rate</td>
                      <td className="py-3 px-4 text-gray-600">int</td>
                      <td className="py-3 px-4 text-gray-600">0</td>
                      <td className="py-3 px-4 text-gray-600">语速 (-50 ~ 50)</td>
                    </tr>
                    <tr className="border-b bg-gray-50/50">
                      <td className="py-3 px-4 font-mono text-indigo-600 font-medium">vol</td>
                      <td className="py-3 px-4 text-gray-600">int</td>
                      <td className="py-3 px-4 text-gray-600">50</td>
                      <td className="py-3 px-4 text-gray-600">音量 (0 ~ 100)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-indigo-600 font-medium">pit</td>
                      <td className="py-3 px-4 text-gray-600">int</td>
                      <td className="py-3 px-4 text-gray-600">0</td>
                      <td className="py-3 px-4 text-gray-600">音调 (-50 ~ 50)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Response */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📦 返回格式</h3>
              <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300">
                <p className="text-gray-400"># 成功响应</p>
                <p>HTTP/1.1 200 OK</p>
                <p>Content-Type: audio/mpeg</p>
                <p>Content-Disposition: inline; filename="tts_output.mp3"</p>
                <p className="mt-3 text-gray-400"># 直接返回 MP3 音频数据</p>
              </div>
            </div>

            {/* Examples */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💡 调用示例</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1"># 基础调用（默认云希语音）</p>
                  <code className="text-sm text-indigo-700 break-all">
                    curl "https://your-app.streamlit.app/?tex=你好世界"
                  </code>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1"># 使用晓晓语音 + 加速</p>
                  <code className="text-sm text-indigo-700 break-all">
                    curl "https://your-app.streamlit.app/?tex=Hello&spk=zh-CN-XiaoxiaoNeural&rate=20"
                  </code>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1"># 在 HTML 中使用</p>
                  <code className="text-sm text-indigo-700 break-all">
                    {'<audio src="https://your-app.streamlit.app/?tex=你好" />'}
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo Tab */}
        {activeTab === 'demo' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🎛️ 参数配置</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    📝 合成文本 (tex)
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-gray-400 mt-1">{text.length} 个字符</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    🎙️ 语音角色 (spk)
                  </label>
                  <select
                    value={voice}
                    onChange={(e) => setVoice(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {voices.map((v) => (
                      <option key={v.value} value={v.value}>
                        {v.label} ({v.value})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ⏩ 语速 (rate): {rate}
                  </label>
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>-50 (慢)</span>
                    <span>0</span>
                    <span>50 (快)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    🔊 音量 (vol): {vol}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={vol}
                    onChange={(e) => setVol(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0 (小)</span>
                    <span>50</span>
                    <span>100 (大)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    🎵 音调 (pit): {pit}
                  </label>
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={pit}
                    onChange={(e) => setPit(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>-50 (低)</span>
                    <span>0</span>
                    <span>50 (高)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🔗 生成的 API URL</h3>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-green-400 break-all">
                  {apiUrl}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(apiUrl)}
                  className="mt-3 w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  📋 复制 URL
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📊 当前配置摘要</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">语音角色</span>
                    <span className="font-mono text-indigo-600">{voice}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">语速</span>
                    <span className="font-mono text-indigo-600">{rate > 0 ? `+${rate * 2}%` : rate < 0 ? `${rate * 2}%` : '+0%'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">音量</span>
                    <span className="font-mono text-indigo-600">{vol === 50 ? '+0%' : vol > 50 ? `+${(vol - 50) * 2}%` : `-${(50 - vol) * 2}%`}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">音调</span>
                    <span className="font-mono text-indigo-600">{pit > 0 ? `+${pit * 10}Hz` : pit < 0 ? `${pit * 10}Hz` : '+0Hz'}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">文本长度</span>
                    <span className="font-mono text-indigo-600">{text.length} 字</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">💡 提示</h3>
                <p className="text-sm text-gray-600">
                  此页面为 API 文档演示。实际语音合成请在部署的 Streamlit 应用中操作。
                  将上述 URL 参数复制到 Streamlit 应用的地址栏即可使用。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Deploy Tab */}
        {activeTab === 'deploy' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🚀 部署到 Streamlit Cloud</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">创建 GitHub 仓库</h4>
                    <p className="text-sm text-gray-600 mt-1">将项目文件推送到 GitHub 仓库</p>
                    <div className="mt-2 bg-gray-900 rounded-lg p-3 font-mono text-xs text-gray-300">
                      <p>git init</p>
                      <p>git add .</p>
                      <p>git commit -m "Initial commit"</p>
                      <p>git remote add origin https://github.com/your-username/edge-tts-api.git</p>
                      <p>git push -u origin main</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">访问 Streamlit Cloud</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      前往{' '}
                      <a href="https://share.streamlit.io" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
                        share.streamlit.io
                      </a>
                      ，使用 GitHub 账号登录
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">创建新应用</h4>
                    <p className="text-sm text-gray-600 mt-1">点击 "New app"，填写配置：</p>
                    <div className="mt-2 bg-gray-50 rounded-lg p-3 text-sm space-y-1">
                      <p><span className="font-medium">Repository:</span> your-username/edge-tts-api</p>
                      <p><span className="font-medium">Branch:</span> main</p>
                      <p><span className="font-medium">Main file path:</span> app.py</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">部署完成</h4>
                    <p className="text-sm text-gray-600 mt-1">等待构建完成后，即可获得可访问的 URL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Structure */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📁 项目结构</h3>
              <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-gray-300">
                <p className="text-yellow-300">edge-tts-api/</p>
                <p className="ml-4">├── <span className="text-green-400">app.py</span>              <span className="text-gray-500"># Streamlit 主应用</span></p>
                <p className="ml-4">├── <span className="text-green-400">requirements.txt</span>    <span className="text-gray-500"># Python 依赖</span></p>
                <p className="ml-4">└── <span className="text-yellow-300">.streamlit/</span></p>
                <p className="ml-8">└── <span className="text-green-400">config.toml</span>     <span className="text-gray-500"># Streamlit 主题配置</span></p>
              </div>
            </div>

            {/* Files Content */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📄 核心文件说明</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-600 mb-2">app.py</h4>
                  <p className="text-sm text-gray-600">
                    Streamlit 主应用文件。包含语音合成逻辑、参数配置界面、API 文档展示。
                    使用 edge-tts 库进行语音合成，支持 16+ 种中文语音角色。
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-600 mb-2">requirements.txt</h4>
                  <p className="text-sm text-gray-600">
                    Python 依赖配置文件。包含 streamlit 和 edge-tts 两个核心依赖。
                  </p>
                  <div className="mt-2 bg-gray-50 rounded p-2 font-mono text-xs">
                    <p>streamlit&gt;=1.30.0</p>
                    <p>edge-tts&gt;=6.1.0</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-600 mb-2">.streamlit/config.toml</h4>
                  <p className="text-sm text-gray-600">
                    Streamlit 主题和服务器配置文件。定义了主色调、背景色、字体等主题参数。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <p>
            Edge-TTS-API | Powered by{' '}
            <a href="https://github.com/rany2/edge-tts" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
              edge-tts
            </a>
            {' '}| Deploy on{' '}
            <a href="https://streamlit.io/cloud" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
              Streamlit Cloud
            </a>
          </p>
          <p className="mt-1 text-xs text-gray-400">
            默认语音：云希 (zh-CN-YunxiNeural) | 支持 16+ 种中文语音角色
          </p>
        </div>
      </footer>
    </div>
  );
}
