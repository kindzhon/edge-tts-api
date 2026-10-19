"""
Edge-TTS-API - 基于 edge-tts 的语音合成 API 服务
================================================
使用 FastAPI 提供 RESTful API，直接返回 MP3 音频文件
模仿百度 TTS API 接口风格

API 端点:
    GET /text2audio?tex=你好&spk=zh-CN-YunxiNeural&rate=0&vol=50&pit=0

部署:
    uvicorn main:app --host 0.0.0.0 --port 8000
"""

import io
import logging

import edge_tts
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from fastapi.openapi.docs import get_swagger_ui_html, get_redoc_html

# ============================================================
# 日志配置
# ============================================================
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================================
# FastAPI 应用
# ============================================================
app = FastAPI(
    title="Edge-TTS-API",
    description="""
## 基于 Microsoft Edge TTS 的在线语音合成 API

模仿百度 TTS API 接口风格，使用 edge-tts 引擎，直接返回 MP3 文件。

### 特性
- 🆓 免费使用
- 🎙️ 16+ 种中文语音角色
- ⚡ 高质量神经网络语音
- 📦 直接返回 MP3 文件
- 🔧 支持语速、音量、音调调节

### 对比百度 TTS API

**百度 TTS:**
```
http://tts.baidu.com/text2audio?cuid=baike&lan=ZH&ctp=1&pdt=301&vol=15&rate=32&tex=test
```

**Edge-TTS-API:**
```
/text2audio?tex=test&spk=zh-CN-YunxiNeural&rate=0&vol=50&pit=0
```
    """,
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
)

# CORS 中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# 常量定义
# ============================================================
DEFAULT_VOICE = "zh-CN-YunxiNeural"

AVAILABLE_VOICES = {
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


# ============================================================
# TTS 合成引擎
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
    """将 -50~50 的速率值转换为 edge-tts 格式 (+/-百分比)"""
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
# API 端点
# ============================================================

@app.get(
    "/text2audio",
    summary="语音合成（模仿百度 TTS API）",
    description="将文本转换为语音，直接返回 MP3 文件",
    response_class=Response,
    responses={
        200: {
            "content": {"audio/mpeg": {}},
            "description": "返回 MP3 音频文件",
        },
        400: {"description": "参数错误"},
        500: {"description": "合成失败"},
    },
)
async def text2audio(
    tex: str = Query(
        ...,
        description="要合成的文本内容（必填）",
        min_length=1,
        max_length=5000,
    ),
    spk: str = Query(
        DEFAULT_VOICE,
        description=f"语音角色，默认云希。可选: {', '.join(AVAILABLE_VOICES.keys())}",
    ),
    rate: int = Query(
        0,
        description="语速调节：-50(慢) ~ 50(快)，0为正常",
        ge=-50,
        le=50,
    ),
    vol: int = Query(
        50,
        description="音量调节：0(最小) ~ 100(最大)，50为正常",
        ge=0,
        le=100,
    ),
    pit: int = Query(
        0,
        description="音调调节：-50(低) ~ 50(高)，0为正常",
        ge=-50,
        le=50,
    ),
):
    """
    语音合成 API - 模仿百度 TTS 接口风格

    直接返回 MP3 音频文件，可直接在 audio 标签中使用：
    ```html
    <audio src="/text2audio?tex=你好世界" controls></audio>
    ```
    """
    # 验证语音角色
    if spk not in AVAILABLE_VOICES:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "无效的语音角色",
                "provided": spk,
                "available": list(AVAILABLE_VOICES.keys()),
            },
        )

    # 验证文本
    if not tex or not tex.strip():
        raise HTTPException(status_code=400, detail="文本内容不能为空")

    # 转换参数
    rate_str = convert_rate(rate)
    vol_str = convert_volume(vol)
    pit_str = convert_pitch(pit)

    logger.info(
        f"TTS Request: text='{tex[:50]}...' voice={spk} rate={rate_str} vol={vol_str} pit={pit_str}"
    )

    try:
        # 合成语音
        audio_bytes = await synthesize_speech(
            text=tex,
            voice=spk,
            rate=rate_str,
            volume=vol_str,
            pitch=pit_str,
        )

        if not audio_bytes:
            raise HTTPException(status_code=500, detail="合成失败：未获取到音频数据")

        logger.info(f"TTS Success: {len(audio_bytes)} bytes generated")

        # 返回 MP3 文件
        return Response(
            content=audio_bytes,
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": 'inline; filename="tts_output.mp3"',
                "Cache-Control": "public, max-age=3600",
                "X-Voice": spk,
                "X-Rate": rate_str,
                "X-Volume": vol_str,
                "X-Pitch": pit_str,
            },
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"TTS Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"语音合成失败: {str(e)}")


# ============================================================
# 辅助端点
# ============================================================

@app.get(
    "/voices",
    summary="获取可用语音列表",
    description="返回所有可用的语音角色及其描述",
)
async def get_voices():
    """获取所有可用的语音角色"""
    return {
        "voices": [
            {"id": voice_id, "name": name, "default": voice_id == DEFAULT_VOICE}
            for voice_id, name in AVAILABLE_VOICES.items()
        ],
        "default_voice": DEFAULT_VOICE,
    }


@app.get(
    "/health",
    summary="健康检查",
)
async def health_check():
    """API 健康检查"""
    return {
        "status": "ok",
        "service": "Edge-TTS-API",
        "version": "1.0.0",
        "default_voice": DEFAULT_VOICE,
        "engine": "edge-tts",
    }


# ============================================================
# 文档端点
# ============================================================

@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title="Edge-TTS-API - Swagger UI",
        swagger_favicon_url="https://em-content.zobj.net/source/twitter/376/speaker-medium-skin-tone_1f509.png",
    )


@app.get("/redoc", include_in_schema=False)
async def custom_redoc():
    return get_redoc_html(
        openapi_url=app.openapi_url,
        title="Edge-TTS-API - ReDoc",
    )


# ============================================================
# 根路径 - API 说明
# ============================================================

@app.get("/", summary="API 首页")
async def root():
    """API 首页 - 返回接口说明"""
    return {
        "name": "Edge-TTS-API",
        "description": "基于 Microsoft Edge TTS 的在线语音合成 API",
        "version": "1.0.0",
        "endpoints": {
            "/text2audio": "语音合成（直接返回 MP3）",
            "/voices": "获取可用语音列表",
            "/health": "健康检查",
            "/docs": "Swagger UI 文档",
            "/redoc": "ReDoc 文档",
        },
        "example": {
            "url": "/text2audio?tex=你好世界&spk=zh-CN-YunxiNeural&rate=0&vol=50&pit=0",
            "html": '<audio src="/text2audio?tex=你好世界" controls></audio>',
            "curl": 'curl -o output.mp3 "/text2audio?tex=你好世界"',
        },
        "parameters": {
            "tex": "要合成的文本（必填）",
            "spk": f"语音角色（默认: {DEFAULT_VOICE}）",
            "rate": "语速 -50~50（默认: 0）",
            "vol": "音量 0~100（默认: 50）",
            "pit": "音调 -50~50（默认: 0）",
        },
    }


# ============================================================
# 启动入口
# ============================================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
