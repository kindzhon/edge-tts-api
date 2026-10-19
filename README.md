# Edge-TTS-API

基于 FastAPI + Microsoft Edge TTS 的在线语音合成 API 服务。模仿百度 TTS API 接口风格，直接返回 MP3 文件。

## ✨ 特性

- 🆓 **免费使用** - 无需 API Key
- 🎙️ **16+ 种语音** - 多种中文语音角色（默认：云希）
- ⚡ **高性能** - FastAPI 异步框架
- 📦 **直接返回 MP3** - 无需二次处理
- 🔧 **精细控制** - 支持语速、音量、音调调节
- 📡 **RESTful API** - 标准 HTTP 接口

## 📡 API 接口

### 核心端点

```
GET /text2audio?tex={text}&spk={voice}&rate={rate}&vol={volume}&pit={pitch}
```

### 参数说明

| 参数 | 类型 | 默认值 | 范围 | 说明 |
|------|------|--------|------|------|
| `tex` | string | - | 1~5000字 | 要合成的文本（必填） |
| `spk` | string | zh-CN-YunxiNeural | 见语音列表 | 语音角色 |
| `rate` | int | 0 | -50~50 | 语速调节 |
| `vol` | int | 50 | 0~100 | 音量调节 |
| `pit` | int | 0 | -50~50 | 音调调节 |

### 对比百度 TTS API

```bash
# 百度 TTS
http://tts.baidu.com/text2audio?cuid=baike&lan=ZH&ctp=1&pdt=301&vol=15&rate=32&tex=test

# Edge-TTS-API
http://localhost:8000/text2audio?tex=test&spk=zh-CN-YunxiNeural&rate=0&vol=50&pit=0
```

### 调用示例

```bash
# curl 下载
curl -o output.mp3 "http://localhost:8000/text2audio?tex=你好世界"

# HTML 播放
<audio src="http://localhost:8000/text2audio?tex=你好世界" controls></audio>
```

```python
# Python requests
import requests

response = requests.get(
    "http://localhost:8000/text2audio",
    params={"tex": "你好世界", "spk": "zh-CN-YunxiNeural", "rate": 10}
)
with open("output.mp3", "wb") as f:
    f.write(response.content)
```

### 其他端点

| 端点 | 说明 |
|------|------|
| `GET /voices` | 获取可用语音列表 |
| `GET /health` | 健康检查 |
| `GET /docs` | Swagger UI 文档 |
| `GET /redoc` | ReDoc 文档 |

## 🚀 快速开始

### 安装依赖

```bash
pip install -r requirements.txt
```

### 启动 API 服务

```bash
# 开发模式（热重载）
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# 生产模式
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### 启动 Streamlit 前端（可选）

```bash
streamlit run app.py
```

## 🐳 Docker 部署

```bash
# 构建镜像
docker build -t edge-tts-api .

# 运行容器
docker run -p 8000:8000 edge-tts-api
```

## ☁️ 云平台部署

### Railway

1. 推送到 GitHub
2. 在 Railway 创建新项目
3. 设置 Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Render

1. 推送到 GitHub
2. 创建 Web Service
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Streamlit Cloud（前端界面）

1. 推送到 GitHub
2. 访问 [share.streamlit.io](https://share.streamlit.io)
3. Main file path: `app.py`

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

## 📁 项目结构

```
edge-tts-api/
├── main.py              # FastAPI API 服务（核心）
├── app.py               # Streamlit 前端界面
├── requirements.txt     # Python 依赖
├── Dockerfile           # Docker 配置
├── Procfile             # 云平台部署配置
└── .streamlit/
    └── config.toml      # Streamlit 主题配置
```

## 📦 技术栈

- **FastAPI** - 高性能异步 Web 框架
- **edge-tts** - Microsoft Edge TTS 引擎
- **uvicorn** - ASGI 服务器
- **Streamlit** - Web 前端框架（可选）

## 📄 License

MIT
