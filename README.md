# Edge-TTS-API

基于 Streamlit + Microsoft Edge TTS 的在线语音合成 API 服务。模仿百度 TTS API 接口风格，通过 URL 参数直接调用，返回 MP3 文件。

## ✨ 特性

- 🆓 **免费使用** - 无需 API Key
- 🎙️ **16+ 种语音** - 多种中文语音角色（默认：云希）
- ⚡ **Streamlit 部署** - 一键部署到 Streamlit Cloud
- 📦 **直接返回 MP3** - 无需二次处理
- 🔧 **精细控制** - 支持语速、音量、音调调节
- 📡 **URL 参数调用** - 模仿百度 TTS API 风格

## 📡 API 接口

### 接口格式

```
GET https://your-app.streamlit.app/?tex={text}&spk={voice}&rate={rate}&vol={volume}&pit={pitch}
```

### 参数说明

| 参数 | 类型 | 默认值 | 范围 | 说明 |
|------|------|--------|------|------|
| `tex` | string | - | 必填 | 要合成的文本 |
| `spk` | string | zh-CN-YunxiNeural | 见语音列表 | 语音角色 |
| `rate` | int | 0 | -50~50 | 语速调节 |
| `vol` | int | 50 | 0~100 | 音量调节 |
| `pit` | int | 0 | -50~50 | 音调调节 |

### 对比百度 TTS API

```bash
# 百度 TTS
http://tts.baidu.com/text2audio?cuid=baike&lan=ZH&ctp=1&pdt=301&vol=15&rate=32&tex=test

# Edge-TTS-API
https://your-app.streamlit.app/?tex=test&spk=zh-CN-YunxiNeural&rate=0&vol=50&pit=0
```

### 调用示例

**浏览器直接访问：**
```
https://your-app.streamlit.app/?tex=你好世界
```

**curl 下载：**
```bash
curl -o output.mp3 "https://your-app.streamlit.app/?tex=你好世界&spk=zh-CN-YunxiNeural"
```

**HTML 嵌入：**
```html
<audio src="https://your-app.streamlit.app/?tex=你好世界" controls></audio>
```

**Python 请求：**
```python
import requests

response = requests.get(
    "https://your-app.streamlit.app/",
    params={"tex": "你好世界", "spk": "zh-CN-YunxiNeural", "rate": 10}
)
with open("output.mp3", "wb") as f:
    f.write(response.content)
```

**JavaScript fetch：**
```javascript
const response = await fetch('https://your-app.streamlit.app/?tex=你好世界');
const blob = await response.blob();
const audio = new Audio(URL.createObjectURL(blob));
audio.play();
```

## 🎙️ 可用语音

| 语音 ID | 名称 |
|---------|------|
| zh-CN-YunxiNeural | 云希 (男声-年轻) **默认** |
| zh-CN-YunyangNeural | 云扬 (男声-新闻) |
| zh-CN-YunjianNeural | 云健 (男声-运动) |
| zh-CN-YunzeNeural | 云泽 (男声-成熟) |
| zh-CN-XiaoxiaoNeural | 晓晓 (女声-温柔) |
| zh-CN-XiaoyiNeural | 晓伊 (女声-活泼) |
| zh-CN-XiaomoNeural | 晓墨 (女声-知性) |
| zh-CN-XiaoxuanNeural | 晓萱 (女声-亲切) |
| zh-CN-XiaochenNeural | 晓辰 (女声-温暖) |
| zh-CN-XiaohanNeural | 晓涵 (女声-优雅) |
| zh-CN-XiaomengNeural | 晓梦 (女声-甜美) |
| zh-CN-XiaoqiuNeural | 晓秋 (女声-沉稳) |
| zh-CN-XiaoruiNeural | 晓柔 (女声-柔和) |
| zh-CN-XiaoshuangNeural | 晓双 (女声-儿童) |
| zh-CN-XiaoyanNeural | 晓颜 (女声-标准) |
| zh-CN-XiaoyouNeural | 晓悠 (女声-童声) |

## 🚀 部署到 Streamlit Cloud

### 步骤

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/edge-tts-api.git
   git push -u origin main
   ```

2. **访问 Streamlit Cloud**
   前往 [share.streamlit.io](https://share.streamlit.io)，使用 GitHub 账号登录

3. **创建新应用**
   - Repository: `your-username/edge-tts-api`
   - Branch: `main`
   - Main file path: `app.py`

4. **部署完成**
   等待构建完成后，即可获得可访问的 URL，通过 URL 参数调用 API

## 📁 项目结构

```
edge-tts-api/
├── app.py               # Streamlit 应用（API + 界面）
├── requirements.txt     # Python 依赖
└── .streamlit/
    └── config.toml      # Streamlit 主题配置
```

## 📦 本地运行

### 安装依赖

```bash
pip install -r requirements.txt
```

### 启动应用

```bash
streamlit run app.py
```

访问 http://localhost:8501 即可使用

## 📦 技术栈

- **Streamlit** - Python Web 框架
- **edge-tts** - Microsoft Edge TTS 引擎

## 📄 License

MIT
