import { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'api' | 'demo' | 'deploy' | 'compare'>('api');
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

  const apiUrl = `/text2audio?tex=${encodeURIComponent(text)}&spk=${voice}&rate=${rate}&vol=${vol}&pit=${pit}`;

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
              <p className="text-xs text-gray-400">FastAPI + edge-tts | RESTful 语音合成服务</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/30">
              ● FastAPI
            </span>
            <a
              href="/docs"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors border border-white/10"
            >
              Swagger ↗
            </a>
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
            基于 FastAPI + Microsoft Edge TTS 引擎，提供 RESTful API 接口。
            支持 16+ 种中文语音角色，直接返回 MP3 音频文件。
          </p>

          {/* Quick API Demo */}
          <div className="max-w-3xl mx-auto bg-black/40 rounded-2xl border border-white/10 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded font-mono">GET</span>
              <code className="text-sm text-gray-300 font-mono">/text2audio</code>
            </div>
            <div className="bg-black/60 rounded-lg p-3 font-mono text-sm text-green-400 text-left overflow-x-auto">
              <span className="text-gray-500"># 对比百度 TTS API</span><br />
              <span className="text-yellow-300/80">http://tts.baidu.com/text2audio?cuid=baike&lan=ZH&ctp=1&pdt=301&vol=15&rate=32&tex=test</span><br /><br />
              <span className="text-gray-500"># Edge-TTS-API (FastAPI)</span><br />
              <span className="text-green-400">http://localhost:8000/text2audio?tex=test&spk=zh-CN-YunxiNeural&rate=0&vol=50&pit=0</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '⚡', title: 'FastAPI', desc: '高性能异步框架' },
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
              { key: 'compare', label: '🔄 接口对比' },
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
                核心端点
              </h3>
              <div className="space-y-4">
                <div className="bg-black/40 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded font-mono font-bold">GET</span>
                    <code className="text-indigo-300 font-mono">/text2audio</code>
                    <span className="text-xs text-gray-500">语音合成 - 直接返回 MP3</span>
                  </div>
                  <div className="font-mono text-xs text-gray-400 mt-2">
                    <p>Content-Type: audio/mpeg</p>
                    <p>Content-Disposition: inline; filename="tts_output.mp3"</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-black/40 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded font-mono">GET</span>
                      <code className="text-indigo-300 font-mono text-sm">/voices</code>
                    </div>
                    <p className="text-xs text-gray-500">获取可用语音列表</p>
                  </div>
                  <div className="bg-black/40 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded font-mono">GET</span>
                      <code className="text-indigo-300 font-mono text-sm">/health</code>
                    </div>
                    <p className="text-xs text-gray-500">健康检查</p>
                  </div>
                  <div className="bg-black/40 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded font-mono">GET</span>
                      <code className="text-indigo-300 font-mono text-sm">/docs</code>
                    </div>
                    <p className="text-xs text-gray-500">Swagger UI 文档</p>
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
                      <td className="py-3 px-4 text-gray-400">1~5000字</td>
                      <td className="py-3 px-4 text-gray-400">要合成的文本（必填）</td>
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
                  <p className="text-xs text-gray-500 mb-2"># curl 下载 MP3</p>
                  <code className="text-sm text-green-400 font-mono break-all">
                    curl -o output.mp3 "http://localhost:8000/text2audio?tex=你好世界&spk=zh-CN-YunxiNeural"
                  </code>
                </div>
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-2"># HTML audio 标签直接播放</p>
                  <code className="text-sm text-yellow-300 font-mono break-all">
                    {'<audio src="http://localhost:8000/text2audio?tex=你好世界" controls></audio>'}
                  </code>
                </div>
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-2"># Python requests</p>
                  <pre className="text-sm text-blue-300 font-mono whitespace-pre-wrap">
{`import requests

response = requests.get(
    "http://localhost:8000/text2audio",
    params={"tex": "你好世界", "spk": "zh-CN-YunxiNeural", "rate": 10}
)
with open("output.mp3", "wb") as f:
    f.write(response.content)`}
                  </pre>
                </div>
                <div className="bg-black/40 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-2"># JavaScript fetch</p>
                  <pre className="text-sm text-purple-300 font-mono whitespace-pre-wrap">
{`const response = await fetch('/text2audio?tex=你好世界');
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
                  http://localhost:8000{apiUrl}
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
                  此页面为 API 调试工具。启动 FastAPI 服务后，将 URL 中的 localhost:8000 替换为实际服务地址即可使用。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Compare Tab */}
        {activeTab === 'compare' && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-6">🔄 百度 TTS API vs Edge-TTS-API</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Baidu */}
                <div className="bg-red-500/5 rounded-xl border border-red-500/20 p-5">
                  <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    百度 TTS API
                  </h4>
                  <div className="bg-black/40 rounded-lg p-3 font-mono text-xs text-yellow-300/80 break-all mb-4">
                    http://tts.baidu.com/text2audio?<br />
                    &nbsp;&nbsp;cuid=baike&<br />
                    &nbsp;&nbsp;lan=ZH&<br />
                    &nbsp;&nbsp;ctp=1&<br />
                    &nbsp;&nbsp;pdt=301&<br />
                    &nbsp;&nbsp;vol=15&<br />
                    &nbsp;&nbsp;rate=32&<br />
                    &nbsp;&nbsp;tex=test
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• 固定参数多（cuid, lan, ctp, pdt）</li>
                    <li>• 语音选择有限</li>
                    <li>• 需要网络访问百度服务器</li>
                    <li>• 可能有调用限制</li>
                  </ul>
                </div>

                {/* Edge TTS */}
                <div className="bg-emerald-500/5 rounded-xl border border-emerald-500/20 p-5">
                  <h4 className="font-bold text-emerald-400 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    Edge-TTS-API (FastAPI)
                  </h4>
                  <div className="bg-black/40 rounded-lg p-3 font-mono text-xs text-green-400 break-all mb-4">
                    http://localhost:8000/text2audio?<br />
                    &nbsp;&nbsp;tex=test&<br />
                    &nbsp;&nbsp;spk=zh-CN-YunxiNeural&<br />
                    &nbsp;&nbsp;rate=0&<br />
                    &nbsp;&nbsp;vol=50&<br />
                    &nbsp;&nbsp;pit=0
                  </div>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• 参数简洁，只需必要参数</li>
                    <li>• 16+ 种中文语音角色</li>
                    <li>• 自部署，无调用限制</li>
                    <li>• 支持语速/音量/音调精细调节</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Parameter Mapping */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">📐 参数对应关系</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 font-semibold text-gray-300">百度参数</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-300">Edge-TTS 参数</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-300">说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-mono text-yellow-300/80">tex</td>
                      <td className="py-3 px-4 font-mono text-green-400">tex</td>
                      <td className="py-3 px-4 text-gray-400">合成文本（一致）</td>
                    </tr>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-yellow-300/80">vol (0~15)</td>
                      <td className="py-3 px-4 font-mono text-green-400">vol (0~100)</td>
                      <td className="py-3 px-4 text-gray-400">音量范围更大</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-mono text-yellow-300/80">rate (0~15)</td>
                      <td className="py-3 px-4 font-mono text-green-400">rate (-50~50)</td>
                      <td className="py-3 px-4 text-gray-400">支持减速，范围更大</td>
                    </tr>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-gray-500">-</td>
                      <td className="py-3 px-4 font-mono text-green-400">pit (-50~50)</td>
                      <td className="py-3 px-4 text-gray-400">新增音调控制</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-mono text-gray-500">-</td>
                      <td className="py-3 px-4 font-mono text-green-400">spk</td>
                      <td className="py-3 px-4 text-gray-400">新增语音角色选择</td>
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-yellow-300/80">cuid/lan/ctp/pdt</td>
                      <td className="py-3 px-4 font-mono text-gray-500">不需要</td>
                      <td className="py-3 px-4 text-gray-400">无需固定参数</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Deploy Tab */}
        {activeTab === 'deploy' && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">🚀 部署方式</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Docker */}
                <div className="bg-black/40 rounded-xl border border-white/10 p-5">
                  <h4 className="font-semibold text-blue-400 mb-3">🐳 Docker 部署</h4>
                  <div className="bg-black/60 rounded-lg p-3 font-mono text-xs text-gray-300">
                    <p className="text-gray-500"># Dockerfile</p>
                    <p>FROM python:3.11-slim</p>
                    <p>WORKDIR /app</p>
                    <p>COPY requirements.txt .</p>
                    <p>RUN pip install -r requirements.txt</p>
                    <p>COPY main.py .</p>
                    <p>EXPOSE 8000</p>
                    <p>CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]</p>
                  </div>
                </div>

                {/* Direct */}
                <div className="bg-black/40 rounded-xl border border-white/10 p-5">
                  <h4 className="font-semibold text-purple-400 mb-3">⚡ 直接运行</h4>
                  <div className="bg-black/60 rounded-lg p-3 font-mono text-xs text-gray-300">
                    <p className="text-gray-500"># 安装依赖</p>
                    <p>pip install -r requirements.txt</p>
                    <p className="mt-2 text-gray-500"># 启动 API 服务</p>
                    <p>uvicorn main:app --host 0.0.0.0 --port 8000</p>
                    <p className="mt-2 text-gray-500"># 或开发模式（热重载）</p>
                    <p>uvicorn main:app --reload --port 8000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cloud Platforms */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">☁️ 云平台部署</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/40 rounded-xl border border-white/10 p-4">
                  <h4 className="font-semibold text-orange-400 mb-2">Railway</h4>
                  <p className="text-xs text-gray-400 mb-2">一键部署，自动 HTTPS</p>
                  <code className="text-xs text-gray-500 font-mono">Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT</code>
                </div>
                <div className="bg-black/40 rounded-xl border border-white/10 p-4">
                  <h4 className="font-semibold text-cyan-400 mb-2">Render</h4>
                  <p className="text-xs text-gray-400 mb-2">免费额度，支持 Docker</p>
                  <code className="text-xs text-gray-500 font-mono">Build: pip install -r requirements.txt<br />Start: uvicorn main:app --host 0.0.0.0 --port $PORT</code>
                </div>
                <div className="bg-black/40 rounded-xl border border-white/10 p-4">
                  <h4 className="font-semibold text-green-400 mb-2">Streamlit Cloud</h4>
                  <p className="text-xs text-gray-400 mb-2">前端界面部署</p>
                  <code className="text-xs text-gray-500 font-mono">Main file: app.py<br />(Streamlit 前端界面)</code>
                </div>
              </div>
            </div>

            {/* Project Structure */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">📁 项目结构</h3>
              <div className="bg-black/40 rounded-xl p-4 font-mono text-sm text-gray-300">
                <p className="text-yellow-300">edge-tts-api/</p>
                <p className="ml-4">├── <span className="text-emerald-400">main.py</span>              <span className="text-gray-500"># FastAPI API 服务（核心）</span></p>
                <p className="ml-4">├── <span className="text-blue-400">app.py</span>               <span className="text-gray-500"># Streamlit 前端界面</span></p>
                <p className="ml-4">├── <span className="text-purple-400">requirements.txt</span>     <span className="text-gray-500"># Python 依赖</span></p>
                <p className="ml-4">├── <span className="text-orange-400">Dockerfile</span>           <span className="text-gray-500"># Docker 配置</span></p>
                <p className="ml-4">└── <span className="text-yellow-300">.streamlit/</span></p>
                <p className="ml-8">└── <span className="text-purple-400">config.toml</span>     <span className="text-gray-500"># Streamlit 主题配置</span></p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <p>
            Edge-TTS-API | FastAPI + edge-tts | 
            <a href="https://github.com/rany2/edge-tts" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline mx-1">
              edge-tts
            </a>
            |
            <a href="https://fastapi.tiangolo.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline mx-1">
              FastAPI
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
