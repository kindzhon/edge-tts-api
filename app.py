"""
Edge-TTS-API - 基于 edge-tts 的在线语音合成 API
================================================
模仿百度 TTS API 接口风格，使用 Microsoft Edge TTS 引擎
默认语音：云希 (zh-CN-YunxiNeural)

API 调用示例：
    https://your-app.streamlit.app/?tex=你好世界&vol=15&rate=0&pit=0&spk=zh-CN-YunxiNeural

部署到 Streamlit Cloud:
    1. 将本项目推送到 GitHub
    2. 在 share.streamlit.io 创建新应用
    3. 选择仓库和分支即可
"""

import asyncio
import io

import edge_tts
import streamlit as st

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
# 可用语音列表
# ============================================================
VOICE_OPTIONS = {
    "云希 (男声)": "zh-CN-YunxiNeural",
    "云扬 (男声)": "zh-CN-YunyangNeural",
    "云健 (男声)": "zh-CN-YunjianNeural",
    "云泽 (男声)": "zh-CN-YunzeNeural",
    "晓晓 (女声)": "zh-CN-XiaoxiaoNeural",
    "晓伊 (女声)": "zh-CN-XiaoyiNeural",
    "晓墨 (女声)": "zh-CN-XiaomoNeural",
    "晓萱 (女声)": "zh-CN-XiaoxuanNeural",
    "晓辰 (女声)": "zh-CN-XiaochenNeural",
    "晓涵 (女声)": "zh-CN-XiaohanNeural",
    "晓梦 (女声)": "zh-CN-XiaomengNeural",
    "晓秋 (女声)": "zh-CN-XiaoqiuNeural",
    "晓柔 (女声)": "zh-CN-XiaoruiNeural",
    "晓双 (女声)": "zh-CN-XiaoshuangNeural",
    "晓颜 (女声)": "zh-CN-XiaoyanNeural",
    "晓悠 (女声)": "zh-CN-XiaoyouNeural",
}

DEFAULT_VOICE = "zh-CN-YunxiNeural"

# ============================================================
# 自定义样式
# ============================================================
st.markdown("""
<style>
    /* 主标题样式 */
    .main-title {
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        margin-bottom: 0.5rem;
    }
    .sub-title {
        text-align: center;
        color: #666;
        font-size: 1.1rem;
        margin-bottom: 2rem;
    }
    /* API URL 样式 */
    .api-url-box {
        background: #1e1e2e;
        border-radius: 12px;
        padding: 16px 20px;
        font-family: 'Courier New', monospace;
        font-size: 0.85rem;
        color: #a6e3a1;
        word-break: break-all;
        border: 1px solid #313244;
        margin: 1rem 0;
    }
    /* 卡片样式 */
    .feature-card {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        border-radius: 12px;
        padding: 20px;
        margin: 8px 0;
        border: none;
    }
    .stAudio > div {
        width: 100%;
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
    # edge-tts volume: -50% to +100%
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
# 侧边栏 - API 参数
# ============================================================
with st.sidebar:
    st.markdown("## ⚙️ API 参数配置")
    st.markdown("---")

    # 文本输入
    text_input = st.text_area(
        "📝 合成文本 (tex)",
        value="你好，欢迎使用 Edge TTS API！这是一个基于微软 Edge 浏览器的语音合成服务。",
        height=120,
        help="要合成的文本内容，支持中英文",
    )

    st.markdown("---")

    # 语音选择
    voice_label = st.selectbox(
        "🎙️ 语音角色 (spk)",
        options=list(VOICE_OPTIONS.keys()),
        index=0,
        help="选择语音角色，默认为云希",
    )
    selected_voice = VOICE_OPTIONS[voice_label]

    st.markdown("---")

    # 速率控制
    rate = st.slider(
        "⏩ 语速 (rate)",
        min_value=-50,
        max_value=50,
        value=0,
        help="语速调节：-50(慢) ~ 50(快)，0为正常",
    )

    # 音量控制
    volume = st.slider(
        "🔊 音量 (vol)",
        min_value=0,
        max_value=100,
        value=50,
        help="音量调节：0(最小) ~ 100(最大)，50为正常",
    )

    # 音调控制
    pitch = st.slider(
        "🎵 音调 (pit)",
        min_value=-50,
        max_value=50,
        value=0,
        help="音调调节：-50(低) ~ 50(高)，0为正常",
    )

    st.markdown("---")

    # 生成按钮
    generate_btn = st.button("🔊 合成语音", type="primary", use_container_width=True)


# ============================================================
# 主页面
# ============================================================
st.markdown('<p class="main-title">🔊 Edge-TTS-API</p>', unsafe_allow_html=True)
st.markdown(
    '<p class="sub-title">基于 Microsoft Edge TTS 的在线语音合成服务 | 免费 · 高质量 · 多语言</p>',
    unsafe_allow_html=True,
)

# ---- API 接口说明 ----
with st.expander("📡 API 接口说明", expanded=False):
    st.markdown("""
    ### 接口地址
    ```
    GET /?tex={text}&spk={voice}&rate={rate}&vol={volume}&pit={pitch}
    ```

    ### 参数说明
    | 参数 | 类型 | 默认值 | 说明 |
    |------|------|--------|------|
    | `tex` | string | - | 要合成的文本（必填） |
    | `spk` | string | zh-CN-YunxiNeural | 语音角色 |
    | `rate` | int | 0 | 语速 (-50~50) |
    | `vol` | int | 50 | 音量 (0~100) |
    | `pit` | int | 0 | 音调 (-50~50) |

    ### 调用示例
    ```
    https://your-app.streamlit.app/?tex=你好世界&spk=zh-CN-YunxiNeural&rate=0&vol=50&pit=0
    ```

    ### 返回格式
    直接返回 MP3 音频文件 (Content-Type: audio/mpeg)
    """)

# ---- 可用语音列表 ----
with st.expander("🎙️ 可用语音列表", expanded=False):
    col1, col2, col3 = st.columns(3)
    voices_list = list(VOICE_OPTIONS.items())
    for i, (label, voice_id) in enumerate(voices_list):
        col = [col1, col2, col3][i % 3]
        with col:
            st.markdown(f"**{label}**\n`{voice_id}`")

# ---- 主内容区 ----
col_left, col_right = st.columns([2, 1])

with col_left:
    st.markdown("### 🎧 语音合成")

    if generate_btn:
        if not text_input.strip():
            st.warning("⚠️ 请输入要合成的文本内容")
        else:
            with st.spinner("🔄 正在合成语音，请稍候..."):
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
                        st.success("✅ 语音合成成功！")
                        st.audio(audio_bytes, format="audio/mpeg")

                        # 下载按钮
                        st.download_button(
                            label="📥 下载 MP3 文件",
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
        st.info("👈 在左侧配置参数，然后点击「合成语音」按钮")

    # 快捷示例
    st.markdown("### 💡 快捷示例")
    examples = [
        ("中文示例", "大家好，欢迎使用 Edge TTS 语音合成服务。今天天气真不错！"),
        ("英文示例", "Hello everyone, welcome to the Edge TTS speech synthesis service."),
        ("数字播报", "今天的温度是25度，空气质量指数为68，适合户外活动。"),
        ("新闻播报", "据最新报道，我国在人工智能领域取得了重大突破，多项技术指标达到国际领先水平。"),
    ]

    example_cols = st.columns(2)
    for i, (title, text) in enumerate(examples):
        with example_cols[i % 2]:
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
    | 文本长度 | {len(text_input)} 字 |
    """)

    # 生成 API URL
    api_url = f"?tex={text_input[:50]}&spk={selected_voice}&rate={rate}&vol={volume}&pit={pitch}"
    st.markdown("### 🔗 API URL")
    st.code(api_url, language="text")

    st.markdown("---")
    st.markdown("""
    ### 🚀 部署说明
    
    1. 将项目推送到 GitHub
    2. 访问 [share.streamlit.io](https://share.streamlit.io)
    3. 选择仓库，部署即可
    
    ### 📦 技术栈
    - **edge-tts**: 微软 Edge TTS 引擎
    - **Streamlit**: Web 应用框架
    - **Python**: 后端语言
    """)

# ---- 底部 ----
st.markdown("---")
st.markdown(
    """
    <div style='text-align: center; color: #888; font-size: 0.85rem;'>
        Edge-TTS-API | Powered by Microsoft Edge TTS | 
        <a href='https://github.com/rany2/edge-tts' target='_blank'>edge-tts</a> |
        Deploy on Streamlit Cloud
    </div>
    """,
    unsafe_allow_html=True,
)
