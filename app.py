"""
Edge-TTS-API - Streamlit 应用（同时提供 API 服务）
==================================================
本应用既是 Web 界面，也是 API 服务。
通过 URL 参数直接调用，返回 MP3 音频文件。

API 调用示例：
    https://your-app.streamlit.app/?tex=你好世界&spk=zh-CN-YunxiNeural&rate=0&vol=50&pit=0

部署到 Streamlit Cloud:
    1. 将本项目推送到 GitHub
    2. 在 share.streamlit.io 创建新应用
    3. Main file path: app.py
"""

import asyncio
import base64
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
    "zh-CN-YunxiNeural": "云希 (男声-年轻)",
    "zh-CN-YunyangNeural": "云扬 (男声-新闻)",
    "zh-CN-YunjianNeural": "云健 (男声-运动)",
    "zh-CN-YunzeNeural": "云泽 (男声-成熟)",
    "zh-CN-XiaoxiaoNeural": "晓晓 (女声-温柔)",
    "zh-CN-XiaoyiNeural": "晓伊 (女声-活泼)",
    "zh-CN-XiaomoNeural": "晓墨 (女声-知性)",
    "zh-CN-XiaoxuanNeural": "晓萱 (女声-亲切)",
    "zh-CN-XiaochenNeural": "晓辰 (女声-温暖)",
    "zh-CN-XiaohanNeural": "晓涵 (女声-优雅)",
    "zh-CN-XiaomengNeural": "晓梦 (女声-甜美)",
    "zh-CN-XiaoqiuNeural": "晓秋 (女声-沉稳)",
    "zh-CN-XiaoruiNeural": "晓柔 (女声-柔和)",
    "zh-CN-XiaoshuangNeural": "晓双 (女声-儿童)",
    "zh-CN-XiaoyanNeural": "晓颜 (女声-标准)",
    "zh-CN-XiaoyouNeural": "晓悠 (女声-童声)",
}

DEFAULT_VOICE = "zh-CN-YunxiNeural"

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
# 检查是否为 API 调用模式
# ============================================================
query_params = st.query_params
is_api_mode = "tex" in query_params

if is_api_mode:
    # API 模式：直接合成并返回音频
    tex = query_params.get("tex", "")
    spk = query_params.get("spk", DEFAULT_VOICE)
    rate = int(query_params.get("rate", "0"))
    vol = int(query_params.get("vol", "50"))
    pit = int(query_params.get("pit", "0"))
    
    # 验证参数
    if not tex:
        st.error("错误：缺少 tex 参数")
        st.stop()
    
    if spk not in VOICE_OPTIONS:
        st.error(f"错误：无效的语音角色 '{spk}'")
        st.markdown(f"**可用语音：** {', '.join(VOICE_OPTIONS.keys())}")
        st.stop()
    
    # 合成语音
    try:
        with st.spinner("正在合成语音..."):
            rate_str = convert_rate(rate)
            vol_str = convert_volume(vol)
            pit_str = convert_pitch(pit)
            
            audio_bytes = asyncio.run(
                synthesize_speech(
                    text=tex,
                    voice=spk,
                    rate=rate_str,
                    volume=vol_str,
                    pitch=pit_str,
                )
            )
        
        if audio_bytes:
            # 显示音频播放器
            st.audio(audio_bytes, format="audio/mpeg")
            
            # 提供下载按钮
            st.download_button(
                label="📥 下载 MP3 文件",
                data=audio_bytes,
                file_name="tts_output.mp3",
                mime="audio/mpeg",
                use_container_width=True,
            )
            
            # 显示 Base64 编码（用于嵌入）
            with st.expander("📋 Base64 编码（用于嵌入）"):
                audio_b64 = base64.b64encode(audio_bytes).decode()
                st.code(f"data:audio/mpeg;base64,{audio_b64}", language="text")
            
            st.success(f"✅ 合成成功！文件大小：{len(audio_bytes) / 1024:.1f} KB")
        else:
            st.error("合成失败：未获取到音频数据")
    
    except Exception as e:
        st.error(f"合成出错：{str(e)}")
    
    st.stop()  # API 模式下不显示界面

# ============================================================
# Web 界面模式
# ============================================================

# 自定义样式
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
</style>
""", unsafe_allow_html=True)

# 侧边栏
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
        options=list(VOICE_OPTIONS.values()),
        index=0,
    )
    # 反向查找 voice ID
    selected_voice = [k for k, v in VOICE_OPTIONS.items() if v == voice_label][0]
    
    st.markdown("---")
    
    rate = st.slider("⏩ 语速", -50, 50, 0, help="-50(慢) ~ 50(快)")
    volume = st.slider("🔊 音量", 0, 100, 50, help="0(最小) ~ 100(最大)")
    pitch = st.slider("🎵 音调", -50, 50, 0, help="-50(低) ~ 50(高)")
    
    st.markdown("---")
    
    generate_btn = st.button("🔊 合成语音", type="primary", use_container_width=True)
    
    st.markdown("---")
    st.markdown("### 📡 API 使用说明")
    st.info(
        "**URL 参数格式：**\n\n"
        "```\n"
        "?tex=文本&spk=语音&rate=语速&vol=音量&pit=音调\n"
        "```\n\n"
        "**示例：**\n\n"
        "```\n"
        "?tex=你好世界&spk=zh-CN-YunxiNeural&rate=0&vol=50&pit=0\n"
        "```"
    )

# 主页面
st.markdown('<p class="main-title">🔊 Edge-TTS-API</p>', unsafe_allow_html=True)
st.markdown(
    '<p class="sub-title">基于 Microsoft Edge TTS | 免费 · 高质量 · 多语音 · 直接返回 MP3</p>',
    unsafe_allow_html=True,
)

# API 说明
with st.expander("📡 API 接口说明", expanded=False):
    st.markdown("""
    ### 接口格式
    
    ```
    GET /?tex={text}&spk={voice}&rate={rate}&vol={volume}&pit={pitch}
    ```
    
    ### 参数说明
    | 参数 | 类型 | 默认值 | 范围 | 说明 |
    |------|------|--------|------|------|
    | `tex` | string | - | 必填 | 要合成的文本 |
    | `spk` | string | zh-CN-YunxiNeural | 见下方列表 | 语音角色 |
    | `rate` | int | 0 | -50~50 | 语速调节 |
    | `vol` | int | 50 | 0~100 | 音量调节 |
    | `pit` | int | 0 | -50~50 | 音调调节 |
    
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
        params={"tex": "你好世界", "spk": "zh-CN-YunxiNeural"}
    )
    with open("output.mp3", "wb") as f:
        f.write(response.content)
    ```
    """)

# 可用语音列表
with st.expander("🎙️ 可用语音列表", expanded=False):
    cols = st.columns(3)
    for i, (voice_id, voice_name) in enumerate(VOICE_OPTIONS.items()):
        with cols[i % 3]:
            st.markdown(f"**{voice_name}**\n`{voice_id}`")

# 主内容区
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
            if st.button(f"📋 {title}", use_container_width=True, key=f"example_{i}"):
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
    st.markdown("### 🚀 部署说明")
    st.markdown("""
    1. 将项目推送到 GitHub
    2. 访问 [share.streamlit.io](https://share.streamlit.io)
    3. 选择仓库，Main file path: `app.py`
    4. 部署完成后即可通过 URL 参数调用 API
    """)

# 底部
st.markdown("---")
st.markdown(
    """
    <div style='text-align: center; color: #888; font-size: 0.85rem;'>
        Edge-TTS-API | Powered by 
        <a href='https://github.com/rany2/edge-tts' target='_blank'>edge-tts</a> |
        Deploy on Streamlit Cloud |
        默认语音：云希 (zh-CN-YunxiNeural)
    </div>
    """,
    unsafe_allow_html=True,
)
