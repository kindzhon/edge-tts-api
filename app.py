"""
Edge-TTS-API - Streamlit 前端界面
==================================
本文件为 Streamlit 前端，直接使用 edge-tts 引擎合成语音。
API 服务请使用 main.py (FastAPI)。

部署到 Streamlit Cloud:
    1. 将本项目推送到 GitHub
    2. 在 share.streamlit.io 创建新应用
    3. Main file path: app.py
"""

import asyncio
import io
import streamlit as st
import edge_tts

# ============================================================
# 页面配置
# ============================================================
st.set_page_config(
    page_title="Edge-TTS-API",
    page_icon="🔊",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ============================================================
# 语音列表
# ============================================================
VOICE_OPTIONS = {
    "云希 (男声-年轻)": "zh-CN-YunxiNeural",
    "云扬 (男声-新闻)": "zh-CN-YunyangNeural",
    "云健 (男声-运动)": "zh-CN-YunjianNeural",
    "云泽 (男声-成熟)": "zh-CN-YunzeNeural",
    "晓晓 (女声-温柔)": "zh-CN-XiaoxiaoNeural",
    "晓伊 (女声-活泼)": "zh-CN-XiaoyiNeural",
    "晓墨 (女声-知性)": "zh-CN-XiaomoNeural",
    "晓萱 (女声-亲切)": "zh-CN-XiaoxuanNeural",
    "晓辰 (女声-温暖)": "zh-CN-XiaochenNeural",
    "晓涵 (女声-优雅)": "zh-CN-XiaohanNeural",
    "晓梦 (女声-甜美)": "zh-CN-XiaomengNeural",
    "晓秋 (女声-沉稳)": "zh-CN-XiaoqiuNeural",
    "晓柔 (女声-柔和)": "zh-CN-XiaoruiNeural",
    "晓双 (女声-儿童)": "zh-CN-XiaoshuangNeural",
    "晓颜 (女声-标准)": "zh-CN-XiaoyanNeural",
    "晓悠 (女声-童声)": "zh-CN-XiaoyouNeural",
}

DEFAULT_VOICE = "zh-CN-YunxiNeural"

# ============================================================
# 自定义样式
# ============================================================
st.markdown("""
<style>
    .main-title {
        font-size: 2.2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        margin-bottom: 0.3rem;
    }
    .sub-title {
        text-align: center;
        color: #888;
        font-size: 1rem;
        margin-bottom: 1.5rem;
    }
    .stAudio > div {
        width: 100%;
    }
    div[data-testid="stMetricValue"] {
        font-size: 1.5rem;
    }
</style>
""", unsafe_allow_html=True)


# ============================================================
# TTS 合成函数
# ============================================================
async def synthesize_speech(
    text: str,
    voice: str = DEFAULT_VOICE,
    rate: str = "+0%",
    volume: str = "+0%",
    pitch: str = "+0Hz",
) -> bytes:
    """使用 edge-tts 合成语音并返回 MP3 字节数据"""
    communicate = edge_tts.Communicate(
        text=text,
        voice=voice,
        rate=rate,
        volume=volume,
        pitch=pitch,
    )
    audio_data = io.BytesIO()
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_data.write(chunk["data"])
    audio_data.seek(0)
    return audio_data.getvalue()


def convert_rate(rate_val: int) -> str:
    """将 -50~50 的速率值转换为 edge-tts 格式"""
    if rate_val > 0:
        return f"+{rate_val * 2}%"
    elif rate_val < 0:
        return f"{rate_val * 2}%"
    return "+0%"


def convert_volume(vol_val: int) -> str:
    """将 0~100 的音量值转换为 edge-tts 格式"""
    mapped = int((vol_val - 50) * 2)
    if mapped > 0:
        return f"+{mapped}%"
    elif mapped < 0:
        return f"{mapped}%"
    return "+0%"


def convert_pitch(pit_val: int) -> str:
    """将 -50~50 的音调值转换为 edge-tts 格式"""
    if pit_val > 0:
        return f"+{pit_val * 10}Hz"
    elif pit_val < 0:
        return f"{pit_val * 10}Hz"
    return "+0Hz"


# ============================================================
# 侧边栏
# ============================================================
with st.sidebar:
    st.markdown("## ⚙️ 参数配置")
    st.markdown("---")

    text_input = st.text_area(
        "📝 合成文本",
        value="你好，欢迎使用 Edge TTS API！这是一个基于微软 Edge 浏览器的语音合成服务。",
        height=120,
    )

    st.markdown("---")

    voice_label = st.selectbox(
        "🎙️ 语音角色",
        options=list(VOICE_OPTIONS.keys()),
        index=0,
    )
    selected_voice = VOICE_OPTIONS[voice_label]

    st.markdown("---")

    rate = st.slider("⏩ 语速", -50, 50, 0, help="-50(慢) ~ 50(快)")
    volume = st.slider("🔊 音量", 0, 100, 50, help="0(最小) ~ 100(最大)")
    pitch = st.slider("🎵 音调", -50, 50, 0, help="-50(低) ~ 50(高)")

    st.markdown("---")

    generate_btn = st.button("🔊 合成语音", type="primary", use_container_width=True)

    st.markdown("---")
    st.markdown("### 📡 API 服务")
    st.info(
        "本项目同时提供 FastAPI 后端服务。\n\n"
        "使用 `main.py` 启动 API 服务：\n\n"
        "```bash\n"
        "uvicorn main:app --host 0.0.0.0 --port 8000\n"
        "```"
    )


# ============================================================
# 主页面
# ============================================================
st.markdown('<p class="main-title">🔊 Edge-TTS-API</p>', unsafe_allow_html=True)
st.markdown(
    '<p class="sub-title">基于 Microsoft Edge TTS | 免费 · 高质量 · 多语音 · 直接返回 MP3</p>',
    unsafe_allow_html=True,
)

# ---- API 说明 ----
with st.expander("📡 FastAPI 接口说明", expanded=False):
    st.markdown("""
    ### API 端点

    ```
    GET /text2audio?tex={text}&spk={voice}&rate={rate}&vol={volume}&pit={pitch}
    ```

    ### 参数说明
    | 参数 | 类型 | 默认值 | 说明 |
    |------|------|--------|------|
    | `tex` | string | - | 要合成的文本（必填） |
    | `spk` | string | zh-CN-YunxiNeural | 语音角色 |
    | `rate` | int | 0 | 语速 (-50~50) |
    | `vol` | int | 50 | 音量 (0~100) |
    | `pit` | int | 0 | 音调 (-50~50) |

    ### 对比百度 TTS API
    ```
    # 百度 TTS
    http://tts.baidu.com/text2audio?cuid=baike&lan=ZH&ctp=1&pdt=301&vol=15&rate=32&tex=test

    # Edge-TTS-API (FastAPI)
    http://localhost:8000/text2audio?tex=test&spk=zh-CN-YunxiNeural&rate=0&vol=50&pit=0
    ```

    ### 调用示例
    ```bash
    # curl 下载
    curl -o output.mp3 "http://localhost:8000/text2audio?tex=你好世界"

    # HTML 播放
    <audio src="http://localhost:8000/text2audio?tex=你好世界" controls></audio>

    # Python 请求
    import requests
    response = requests.get("http://localhost:8000/text2audio", params={"tex": "你好世界"})
    with open("output.mp3", "wb") as f:
        f.write(response.content)
    ```

    ### 其他端点
    - `GET /voices` - 获取可用语音列表
    - `GET /health` - 健康检查
    - `GET /docs` - Swagger UI 文档
    - `GET /redoc` - ReDoc 文档
    """)

# ---- 主内容区 ----
col_left, col_right = st.columns([3, 2])

with col_left:
    st.markdown("### 🎧 语音合成")

    if generate_btn:
        if not text_input.strip():
            st.warning("⚠️ 请输入要合成的文本内容")
        else:
            with st.spinner("🔄 正在合成语音..."):
                try:
                    rate_str = convert_rate(rate)
                    vol_str = convert_volume(volume)
                    pit_str = convert_pitch(pitch)

                    audio_bytes = asyncio.run(
                        synthesize_speech(
                            text=text_input,
                            voice=selected_voice,
                            rate=rate_str,
                            volume=vol_str,
                            pitch=pit_str,
                        )
                    )

                    if audio_bytes:
                        st.success(f"✅ 合成成功！({len(audio_bytes) / 1024:.1f} KB)")
                        st.audio(audio_bytes, format="audio/mpeg")

                        st.download_button(
                            label="📥 下载 MP3",
                            data=audio_bytes,
                            file_name="tts_output.mp3",
                            mime="audio/mpeg",
                            use_container_width=True,
                        )
                    else:
                        st.error("❌ 合成失败：未获取到音频数据")
                except Exception as e:
                    st.error(f"❌ 合成出错：{str(e)}")
    else:
        st.info("👈 在左侧配置参数，点击「合成语音」按钮开始")

    # 快捷示例
    st.markdown("### 💡 快捷示例")
    examples = [
        ("中文", "大家好，欢迎使用 Edge TTS 语音合成服务。"),
        ("英文", "Hello everyone, welcome to the Edge TTS service."),
        ("播报", "今天温度25度，空气质量68，适合户外活动。"),
        ("新闻", "据最新报道，我国在人工智能领域取得重大突破。"),
    ]
    cols = st.columns(4)
    for i, (title, text) in enumerate(examples):
        with cols[i]:
            if st.button(f"📋 {title}", use_container_width=True):
                st.session_state.example_text = text
                st.rerun()

with col_right:
    st.markdown("### 📊 当前配置")
    st.markdown(f"""
    | 参数 | 值 |
    |------|-----|
    | 语音 | `{selected_voice}` |
    | 语速 | `{convert_rate(rate)}` |
    | 音量 | `{convert_volume(volume)}` |
    | 音调 | `{convert_pitch(pitch)}` |
    | 文本 | {len(text_input)} 字 |
    """)

    st.markdown("---")
    st.markdown("### 🚀 部署方式")

    tab1, tab2 = st.tabs(["FastAPI", "Streamlit"])

    with tab1:
        st.markdown("""
        **API 服务部署**
        ```bash
        # 本地运行
        uvicorn main:app --host 0.0.0.0 --port 8000

        # Docker 部署
        docker build -t edge-tts-api .
        docker run -p 8000:8000 edge-tts-api
        ```
        支持部署到 Railway / Render / Fly.io
        """)

    with tab2:
        st.markdown("""
        **前端界面部署**
        1. 推送到 GitHub
        2. 访问 share.streamlit.io
        3. 选择仓库，main file: `app.py`
        """)

# ---- 底部 ----
st.markdown("---")
st.markdown(
    """
    <div style='text-align: center; color: #888; font-size: 0.85rem;'>
        Edge-TTS-API | FastAPI + Streamlit | 
        <a href='https://github.com/rany2/edge-tts' target='_blank'>edge-tts</a> |
        默认语音：云希 (zh-CN-YunxiNeural)
    </div>
    """,
    unsafe_allow_html=True,
)
