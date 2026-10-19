import { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'api' | 'demo' | 'deploy'>('api');
  const [text, setText] = useState('你好，欢迎使用 Edge TTS API！');
  const [voice, setVoice] = useState('zh-CN-YunxiNeural');
  const [rate, setRate] = useState(0);
  const [vol, setVol] = useState(50);
  const [pit, setPit] = useState(0);
  const [copied, setCopied] = useState(false);

  const voices = [
    { label: '云希 (男声-年轻)', value: 'zh-CN-YunxiNeural', default: true },
    { label: '云扬 (男声-新闻)', value: 'zh-CN-YunyangNeural', default: false },
    { label: '云健 (男声-运动)', value: 'zh-CN-YunjianNeural', default: false },
    { label: '云泽 (男声-成熟)', value: 'zh-CN-YunzeNeural', default: false },
    { label: '晓晓 (女声-温柔)', value: 'zh-CN-XiaoxiaoNeural', default: false },
    { label: '晓伊 (女声-活泼)', value: 'zh-CN-XiaoyiNeural', default: false },
    { label: '晓墨 (女声-知性)', value: 'zh-CN-XiaomoNeural', default: false },
    { label: '晓萱 (女声-亲切)', value: 'zh-CN-XiaoxuanNeural', default: false },
    { label: '晓辰 (女声-温暖)', value: 'zh-CN-XiaochenNeural', default: false },
    { label: '晓涵 (女声-优雅)', value: 'zh-CN-XiaohanNeural', default: false },
    { label: '晓梦 (女声-甜美)', value: 'zh-CN-XiaomengNeural', default: false },
    { label: '晓秋 (女声-沉稳)', value: 'zh-CN-XiaoqiuNeural', default: false },
    { label: '晓柔 (女声-柔和)', value: 'zh-CN-XiaoruiNeural', default: false },
    { label: '晓双 (女声-儿童)', value: 'zh-CN-XiaoshuangNeural', default: false },
    { label: '晓颜 (女声-标准)', value: 'zh-CN-XiaoyanNeural', default: false },
    { label: '晓悠 (女声-童声)', value: 'zh-CN-XiaoyouNeural', default: false },
  ];

  const apiUrl = `?tex=${encodeURIComponent(text)}&spk=${voice}&rate=${rate}&vol=${vol}&pit=${pit}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(apiUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-indigo-500/30">
              🔊
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Edge-TTS-API
              </h1>
              <p className="text-xs text-gray-400">Streamlit + edge-tts | 在线语音合成服务</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/30">
              ● Streamlit
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/20 rounded-full border border-indigo-500/30 text-indigo-300 text-sm mb-6">
            <span>⚡</span>
            <span>模仿百度 TTS API 接口风格 · 直接返回 MP3 文件</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              免费高质量语音合成 API
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            基于 Streamlit + Microsoft Edge TTS 引擎，通过 URL 参数直接调用。
            支持 16+ 种中文语音角色，直接返回 MP3 音频文件。
          </p>

          {/* Quick API Demo */}
          <div className="max-w-3xl mx-auto bg-black/40 rounded-2xl border border-white/10 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded font-mono">GET</span>
              <code className="text-sm text-gray-300 font-mono">/?tex=...</code>
            </div>
            <div className="bg-black/60 rounded-lg p-3 font-mono text-sm text-green-400 text-left overflow-x-auto">
              <span className="text-gray-500"># 对比百度 TTS API</span><br />
              <span className="text-yellow-300/80">http://tts.baidu.com/text2audio?cuid=baike&lan=ZH&ctp=1&pdt=301&vol=15&rate=32&tex=test</span><br /><br />
              <span className="text-gray-500"># Edge-TTS-API (Streamlit)</span><br />
              <span className="text-green-400">https://your-app.streamlit.app/?tex=test&spk=zh-CN-YunxiNeural&rate=0&vol=50&pit=0</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '⚡', title: 'Streamlit', desc: 'Python Web 框架' },
            { icon: '🎙️', title: '16+ 语音', desc: '多种中文角色' },
            { icon: '📦', title: 'MP3 直返', desc: '无需二次处理' },
            { icon: '🆓', title: '免费使用', desc: '无需 API Key' },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 rounded-xl border border-white/10 p-4 text-center hover:bg-white/10 transition-colors">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-white text-sm">{item.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white/5 rounded-xl border border-white/10 p-1">
            {([
              { key: 'api', label: '📡 API 文档' },
              { key: 'demo', label: '🎮 在线调试' },
              { key: 'deploy', label: '🚀 部署指南' },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* API Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            {/* Endpoint */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                API 端点
              </h3>
              <div className="space-y-4">
                <div className="bg-black/40 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded font-mono font-bold">GET</span>
                    <code className="text-indigo-300 font-mono">/?tex=...&spk=...&rate=...&vol=...&pit=...</code>
                  </div>
                  <div className="font-mono text-xs text-gray-400 mt-2">
                    <p>Content-Type: audio/mpeg</p>
                    <p>直接返回 MP3 音频文件</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Parameters */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">📋 参数说明</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 font-semibold text-gray-300">参数</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-300">类型</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-300">默认值</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-300">范围</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-300">说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-mono text-indigo-400 font-medium">tex</td>
                      <td className="py-3 px-4 text-gray-400">string</td>
                      <td className="py-3 px-4 text-gray-400">-</td>
                      <td className="py-3 px-4 text-gray-400">必填</td>
                      <td className="py-3 px-4 text-gray-400">要合成的文本</td>
                    </tr>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-indigo-400 font-medium">spk</td>
                      <td className="py-3 px-4 text-gray-400">string</td>
                      <td className="py-3 px-4 font-mono text-xs text-emerald-400">zh-CN-YunxiNeural</td>
                      <td className="py-3 px-4 text-gray-400">见语音列表</td>
                      <td className="py-3 px-4 text-gray-400">语音角色（默认：云希）</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-mono text-indigo-400 font-medium">rate</td>
                      <td className="py-3 px-4 text-gray-400">int</td>
                      <td className="py-3 px-4 text-gray-400">0</td>
                      <td className="py-3 px-4 text-gray-400">-50 ~ 50</td>
                      <td className="py-3 px-4 text-gray-400">语速调节</td>
                    </tr>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-indigo-400 font-medium">vol</td>
                      <td className="py-3 px-4 text-gray-400">int</td>
                      <td className="py-3 px-4 text-gray-400">50</td>
                      <td className="py-3 px-4 text-gray-400">0 ~ 100</td>
                      <td className="py-3 px-4 text-gray-400">音量调节</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-indigo-400 font-medium">pit</td>
                      <td className="py-3 px-4 text-gray-400">int</td>
                      <td className="py-3 px-4 text-gray-400">0</td>
                      <td className="py-3 px-4 text-gray-400">-50 ~ 50</td>
                      <td className="py-3 px-4 text-gray-400">音调调节</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Code Examples */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">💻 调用示例</h3>
              <div className="space-y-4">
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-2"># 浏览器直接访问</p>
                  <code className="text-sm text-green-400 font-mono break-all">
                    https://your-app.streamlit.app/?tex=你好世界
                  </code>
                </div>
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-2"># curl 下载 MP3</p>
                  <code className="text-sm text-green-400 font-mono break-all">
                    curl -o output.mp3 "https://your-app.streamlit.app/?tex=你好世界&spk=zh-CN-YunxiNeural"
                  </code>
                </div>
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-2"># HTML audio 标签直接播放</p>
                  <code className="text-sm text-yellow-300 font-mono break-all">
                    {'<audio src="https://your-app.streamlit.app/?tex=你好世界" controls></audio>'}
                  </code>
                </div>
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-2"># Python requests</p>
                  <pre className="text-sm text-blue-300 font-mono whitespace-pre-wrap">
{`import requests

response = requests.get(
    "https://your-app.streamlit.app/",
    params={"tex": "你好世界", "spk": "zh-CN-YunxiNeural", "rate": 10}
)
with open("output.mp3", "wb") as f:
    f.write(response.content)`}
                  </pre>
                </div>
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-2"># JavaScript fetch</p>
                  <pre className="text-sm text-purple-300 font-mono whitespace-pre-wrap">
{`const response = await fetch('https://your-app.streamlit.app/?tex=你好世界');
const blob = await response.blob();
const audio = new Audio(URL.createObjectURL(blob));
audio.play();`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo Tab */}
        {activeTab === 'demo' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">🎛️ 参数配置</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    📝 合成文本 (tex)
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">{text.length} 个字符</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    🎙️ 语音角色 (spk)
                  </label>
                  <select
                    value={voice}
                    onChange={(e) => setVoice(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:ring-2 focus:ring-indigo-500"
                  >
                    {voices.map((v) => (
                      <option key={v.value} value={v.value} className="bg-gray-900">
                        {v.label} ({v.value})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    ⏩ 语速 (rate): <span className="text-indigo-400">{rate}</span>
                  </label>
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>-50 (慢)</span>
                    <span>0</span>
                    <span>50 (快)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    🔊 音量 (vol): <span className="text-indigo-400">{vol}</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={vol}
                    onChange={(e) => setVol(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 (小)</span>
                    <span>50</span>
                    <span>100 (大)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    🎵 音调 (pit): <span className="text-indigo-400">{pit}</span>
                  </label>
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={pit}
                    onChange={(e) => setPit(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>-50 (低)</span>
                    <span>0</span>
                    <span>50 (高)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-4">🔗 生成的 API URL</h3>
                <div className="bg-black/60 rounded-xl p-4 font-mono text-xs text-green-400 break-all">
                  https://your-app.streamlit.app/{apiUrl}
                </div>
                <button
                  onClick={handleCopy}
                  className={`mt-3 w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    copied
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {copied ? '✅ 已复制' : '📋 复制 URL'}
                </button>
              </div>

              <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <h3 className="text-lg font-bold text-white mb-4">📊 配置摘要</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400">语音角色</span>
                    <span className="font-mono text-indigo-400 text-xs">{voice}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400">语速</span>
                    <span className="font-mono text-indigo-400">
                      {rate > 0 ? `+${rate * 2}%` : rate < 0 ? `${rate * 2}%` : '+0%'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400">音量</span>
                    <span className="font-mono text-indigo-400">
                      {vol === 50 ? '+0%' : vol > 50 ? `+${(vol - 50) * 2}%` : `-${(50 - vol) * 2}%`}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400">音调</span>
                    <span className="font-mono text-indigo-400">
                      {pit > 0 ? `+${pit * 10}Hz` : pit < 0 ? `${pit * 10}Hz` : '+0Hz'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">文本长度</span>
                    <span className="font-mono text-indigo-400">{text.length} 字</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-500/20 p-6">
                <h3 className="text-sm font-bold text-indigo-300 mb-2">💡 提示</h3>
                <p className="text-xs text-gray-400">
                  部署到 Streamlit Cloud 后，将 URL 中的 your-app.streamlit.app 替换为实际地址即可使用。
                  在浏览器中直接访问带参数的 URL 即可播放音频。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Deploy Tab */}
        {activeTab === 'deploy' && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">🚀 部署到 Streamlit Cloud</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 font-bold text-sm border border-indigo-500/30">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">创建 GitHub 仓库</h4>
                    <p className="text-sm text-gray-400 mt-1">将项目文件推送到 GitHub 仓库</p>
                    <div className="mt-2 bg-black/40 rounded-lg p-3 font-mono text-xs text-gray-300">
                      <p>git init</p>
                      <p>git add .</p>
                      <p>git commit -m "Initial commit"</p>
                      <p>git remote add origin https://github.com/your-username/edge-tts-api.git</p>
                      <p>git push -u origin main</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 font-bold text-sm border border-indigo-500/30">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">访问 Streamlit Cloud</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      前往{' '}
                      <a href="https://share.streamlit.io" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">
                        share.streamlit.io
                      </a>
                      ，使用 GitHub 账号登录
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 font-bold text-sm border border-indigo-500/30">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">创建新应用</h4>
                    <p className="text-sm text-gray-400 mt-1">点击 "New app"，填写配置：</p>
                    <div className="mt-2 bg-black/40 rounded-lg p-3 text-sm space-y-1">
                      <p><span className="font-medium text-gray-300">Repository:</span> <span className="text-gray-400">your-username/edge-tts-api</span></p>
                      <p><span className="font-medium text-gray-300">Branch:</span> <span className="text-gray-400">main</span></p>
                      <p><span className="font-medium text-gray-300">Main file path:</span> <span className="text-emerald-400">app.py</span></p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 font-bold text-sm border border-indigo-500/30">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">部署完成</h4>
                    <p className="text-sm text-gray-400 mt-1">等待构建完成后，即可获得可访问的 URL，通过 URL 参数调用 API</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Structure */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">📁 项目结构</h3>
              <div className="bg-black/40 rounded-xl p-4 font-mono text-sm text-gray-300">
                <p className="text-yellow-300">edge-tts-api/</p>
                <p className="ml-4">├── <span className="text-emerald-400">app.py</span>              <span className="text-gray-500"># Streamlit 应用（API + 界面）</span></p>
                <p className="ml-4">├── <span className="text-purple-400">requirements.txt</span>     <span className="text-gray-500"># Python 依赖</span></p>
                <p className="ml-4">└── <span className="text-yellow-300">.streamlit/</span></p>
                <p className="ml-8">└── <span className="text-purple-400">config.toml</span>     <span className="text-gray-500"># Streamlit 主题配置</span></p>
              </div>
            </div>

            {/* Files Content */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">📄 核心文件说明</h3>
              <div className="space-y-4">
                <div className="border border-white/10 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-400 mb-2">app.py</h4>
                  <p className="text-sm text-gray-400">
                    Streamlit 主应用文件。同时提供 Web 界面和 API 服务。
                    通过 URL 参数（?tex=...）触发语音合成，直接返回 MP3 音频。
                    使用 edge-tts 库进行语音合成，支持 16+ 种中文语音角色。
                  </p>
                </div>
                <div className="border border-white/10 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">requirements.txt</h4>
                  <p className="text-sm text-gray-400">
                    Python 依赖配置文件。包含 streamlit 和 edge-tts 两个核心依赖。
                  </p>
                  <div className="mt-2 bg-black/40 rounded p-2 font-mono text-xs text-gray-300">
                    <p>streamlit&gt;=1.30.0</p>
                    <p>edge-tts&gt;=6.1.0</p>
                  </div>
                </div>
                <div className="border border-white/10 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-400 mb-2">.streamlit/config.toml</h4>
                  <p className="text-sm text-gray-400">
                    Streamlit 主题和服务器配置文件。定义了主色调、背景色、字体等主题参数。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <p>
            Edge-TTS-API | Streamlit + edge-tts | 
            <a href="https://github.com/rany2/edge-tts" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline mx-1">
              edge-tts
            </a>
            |
            <a href="https://streamlit.io" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline mx-1">
              Streamlit
            </a>
          </p>
          <p className="mt-1 text-xs text-gray-600">
            默认语音：云希 (zh-CN-YunxiNeural) | 16+ 种中文语音角色 | 直接返回 MP3
          </p>
        </div>
      </footer>
    </div>
  );
}
