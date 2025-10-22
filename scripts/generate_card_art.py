from __future__ import annotations

from pathlib import Path
from typing import Tuple
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 640, 360
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "public" / "cards"
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

Color = Tuple[int, int, int]


def hex_to_rgb(value: str) -> Color:
    value = value.strip().lstrip("#")
    if len(value) == 3:
        value = "".join(v * 2 for v in value)
    r, g, b = (int(value[i : i + 2], 16) for i in range(0, 6, 2))
    return r, g, b


def draw_vertical_gradient(image: Image.Image, start_hex: str, end_hex: str) -> None:
    start = hex_to_rgb(start_hex)
    end = hex_to_rgb(end_hex)
    width, height = image.size
    for y in range(height):
        ratio = y / (height - 1)
        r = int(start[0] + (end[0] - start[0]) * ratio)
        g = int(start[1] + (end[1] - start[1]) * ratio)
        b = int(start[2] + (end[2] - start[2]) * ratio)
        ImageDraw.Draw(image).line([(0, y), (width, y)], fill=(r, g, b))


def add_title(draw: ImageDraw.ImageDraw, title: str, accent_hex: str) -> None:
    font = ImageFont.truetype(FONT_PATH, 34)
    subtitle_font = ImageFont.truetype(FONT_PATH, 20)
    padding = 28
    text_box_height = 90
    draw.rounded_rectangle(
        [(padding, HEIGHT - padding - text_box_height), (WIDTH - padding, HEIGHT - padding)],
        radius=22,
        fill=(8, 15, 32, 180),
    )
    draw.text(
        (padding + 28, HEIGHT - padding - text_box_height + 18),
        title,
        font=font,
        fill=hex_to_rgb("f8fafc"),
    )
    draw.text(
        (padding + 28, HEIGHT - padding - text_box_height + 58),
        "code-verse.deepwaterslife.com",
        font=subtitle_font,
        fill=hex_to_rgb(accent_hex),
    )


def draw_ai_posture(draw: ImageDraw.ImageDraw) -> None:
    highlight = (14, 178, 255, 220)
    joints = {
        "head": (320, 96),
        "neck": (320, 138),
        "shoulder_l": (278, 152),
        "shoulder_r": (362, 152),
        "elbow_l": (256, 206),
        "elbow_r": (386, 208),
        "wrist_l": (248, 266),
        "wrist_r": (396, 264),
        "hip": (320, 216),
        "knee_l": (296, 284),
        "knee_r": (344, 284),
        "ankle_l": (290, 336),
        "ankle_r": (350, 336),
    }
    limbs = [
        ("head", "neck"),
        ("neck", "shoulder_l"),
        ("neck", "shoulder_r"),
        ("shoulder_l", "elbow_l"),
        ("shoulder_r", "elbow_r"),
        ("elbow_l", "wrist_l"),
        ("elbow_r", "wrist_r"),
        ("neck", "hip"),
        ("hip", "knee_l"),
        ("hip", "knee_r"),
        ("knee_l", "ankle_l"),
        ("knee_r", "ankle_r"),
    ]
    
    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)

    # Detection arcs
    overlay_draw.arc([(160, 20), (480, 340)], start=200, end=340, fill=(14, 178, 255, 90), width=6)
    overlay_draw.arc([(120, 40), (520, 340)], start=210, end=330, fill=(94, 234, 212, 70), width=4)
    overlay_draw.arc([(190, 0), (450, 320)], start=205, end=335, fill=(255, 255, 255, 40), width=3)

    for start, end in limbs:
        overlay_draw.line([joints[start], joints[end]], fill=highlight, width=10)

    for point in joints.values():
        overlay_draw.ellipse(
            [
                (point[0] - 14, point[1] - 14),
                (point[0] + 14, point[1] + 14),
            ],
            fill=(7, 25, 61, 230),
            outline=highlight,
            width=4,
        )

    draw.bitmap((0, 0), overlay, fill=None)


def draw_battle_visualizer(draw: ImageDraw.ImageDraw) -> None:
    grid_color = (22, 29, 48, 160)
    for x in range(40, WIDTH, 48):
        draw.line([(x, 40), (x, HEIGHT - 120)], fill=grid_color, width=1)
    for y in range(40, HEIGHT - 120, 40):
        draw.line([(40, y), (WIDTH - 40, y)], fill=grid_color, width=1)

    draw.rounded_rectangle([(60, 80), (300, 260)], radius=26, fill=(40, 63, 92, 220))
    draw.polygon([(120, 120), (200, 100), (270, 150), (220, 210), (130, 190)], fill=(255, 198, 109, 220))
    draw.line([(110, 200), (260, 110)], fill=(239, 68, 68, 220), width=6)

    timeline_y = HEIGHT - 150
    draw.line([(80, timeline_y), (WIDTH - 80, timeline_y)], fill=(250, 204, 21, 220), width=4)
    tick_positions = [120, 200, 320, 420, 520]
    for idx, x in enumerate(tick_positions):
        draw.line([(x, timeline_y - 12), (x, timeline_y + 12)], fill=(241, 245, 249, 220), width=3)
        draw.ellipse([(x - 10, timeline_y - 10), (x + 10, timeline_y + 10)], fill=(248, 113, 113, 220))
        draw.text((x - 18, timeline_y + 18), f"T{idx + 1}", fill=(226, 232, 240), font=ImageFont.truetype(FONT_PATH, 16))

    for offset, opacity in [(0, 160), (40, 100), (80, 60)]:
        draw.arc(
            [(340 + offset, 70 + offset // 2), (580 + offset, 230 + offset // 2)],
            start=220,
            end=320,
            fill=(168, 85, 247, opacity),
            width=6,
        )


def draw_chimpanzee_guardians(draw: ImageDraw.ImageDraw) -> None:
    leaf = [(140, 220), (90, 160), (120, 120), (190, 100), (250, 110), (300, 160), (260, 240)]
    draw.polygon(leaf, fill=(56, 189, 248, 180))
    draw.line(leaf + [leaf[0]], fill=(14, 116, 144, 220), width=6)

    # Leaf veins
    for idx, (x, y) in enumerate(leaf):
        if idx % 2 == 0:
            draw.line([(220, 190), (x, y)], fill=(14, 116, 144, 200), width=3)

    # Chimp silhouette
    body_center = (420, 200)
    draw.ellipse([(body_center[0] - 90, body_center[1] - 110), (body_center[0] + 90, body_center[1] + 110)], fill=(30, 41, 59, 220))
    draw.ellipse([(body_center[0] - 70, body_center[1] - 110), (body_center[0] + 70, body_center[1] - 10)], fill=(71, 85, 105, 240))
    draw.ellipse([(body_center[0] - 40, body_center[1] - 80), (body_center[0] + 40, body_center[1] - 10)], fill=(203, 213, 225, 255))
    draw.ellipse([(body_center[0] - 20, body_center[1] - 60), (body_center[0] - 5, body_center[1] - 45)], fill=(51, 65, 85, 255))
    draw.ellipse([(body_center[0] + 5, body_center[1] - 60), (body_center[0] + 20, body_center[1] - 45)], fill=(51, 65, 85, 255))
    draw.arc([(body_center[0] - 26, body_center[1] - 30), (body_center[0] + 26, body_center[1] + 10)], start=200, end=340, fill=(51, 65, 85, 255), width=4)

    draw.arc([(420, 230), (530, 320)], start=180, end=320, fill=(249, 115, 22, 200), width=6)


def draw_fit_track(draw: ImageDraw.ImageDraw) -> None:
    draw.rounded_rectangle([(70, 70), (WIDTH - 70, HEIGHT - 170)], radius=34, fill=(248, 250, 252, 38), outline=(148, 163, 184, 120), width=3)
    grid_color = (79, 70, 229, 80)
    for x in range(100, WIDTH - 80, 60):
        draw.line([(x, 90), (x, HEIGHT - 190)], fill=grid_color, width=1)
    for y in range(100, HEIGHT - 190, 36):
        draw.line([(90, y), (WIDTH - 90, y)], fill=grid_color, width=1)

    chart_points = [(110, 250), (170, 210), (230, 240), (290, 180), (360, 200), (430, 160), (500, 180)]
    draw.line(chart_points, fill=(59, 130, 246, 230), width=8, joint="curve")
    for point in chart_points:
        draw.ellipse([(point[0] - 10, point[1] - 10), (point[0] + 10, point[1] + 10)], fill=(56, 189, 248, 255))

    bars = [
        ((140, HEIGHT - 180), (180, HEIGHT - 120)),
        ((220, HEIGHT - 210), (260, HEIGHT - 120)),
        ((300, HEIGHT - 150), (340, HEIGHT - 120)),
        ((380, HEIGHT - 190), (420, HEIGHT - 120)),
        ((460, HEIGHT - 160), (500, HEIGHT - 120)),
    ]
    for idx, (top_left, bottom_right) in enumerate(bars):
        draw.rounded_rectangle([top_left, bottom_right], radius=10, fill=(14, 165, 233, 160 + idx * 12))

    draw.rounded_rectangle([(480, 80), (600, 190)], radius=18, fill=(34, 197, 94, 190))
    draw.text((500, 110), "92", font=ImageFont.truetype(FONT_PATH, 46), fill=(15, 23, 42, 255))
    draw.text((504, 155), "READINESS", font=ImageFont.truetype(FONT_PATH, 16), fill=(15, 23, 42, 220))


def draw_party_game_hub(draw: ImageDraw.ImageDraw) -> None:
    import random

    random.seed(42)
    for _ in range(38):
        size = random.randint(6, 14)
        x = random.randint(30, WIDTH - 30)
        y = random.randint(30, HEIGHT - 120)
        color = random.choice([
            (244, 63, 94, 220),
            (129, 140, 248, 220),
            (16, 185, 129, 220),
            (250, 204, 21, 220),
        ])
        shape = random.choice(["circle", "triangle", "square"])
        if shape == "circle":
            draw.ellipse([(x, y), (x + size, y + size)], fill=color)
        elif shape == "square":
            draw.rectangle([(x, y), (x + size, y + size)], fill=color)
        else:
            draw.polygon([(x, y + size), (x + size / 2, y), (x + size, y + size)], fill=color)

    panel = [(120, 120), (520, 260)]
    draw.rounded_rectangle(panel, radius=28, fill=(12, 10, 36, 200), outline=(147, 197, 253, 120), width=3)
    draw.text((160, 150), "Party Queue", font=ImageFont.truetype(FONT_PATH, 32), fill=(248, 250, 252, 255))
    draw.text((160, 192), "Sketch Sprint", font=ImageFont.truetype(FONT_PATH, 20), fill=(248, 250, 252, 255))
    draw.text((160, 222), "Cipher Relay", font=ImageFont.truetype(FONT_PATH, 20), fill=(165, 243, 252, 255))
    draw.rounded_rectangle([(430, 170), (500, 210)], radius=18, fill=(234, 88, 12, 240))
    draw.text((442, 180), "Start", font=ImageFont.truetype(FONT_PATH, 20), fill=(248, 250, 252, 255))


def draw_slp_monitor(draw: ImageDraw.ImageDraw) -> None:
    track_color = (249, 115, 22, 200)
    draw.rectangle([(80, 100), (560, 260)], outline=(148, 163, 184, 180), width=4)
    for x in range(120, 560, 72):
        draw.line([(x, 100), (x, 260)], fill=(71, 85, 105, 140), width=2)
    for y in [140, 180, 220]:
        draw.line([(80, y), (560, y)], fill=(71, 85, 105, 140), width=2)

    stations = [
        (120, HEIGHT - 160, "Feed"),
        (210, HEIGHT - 160, "Sort"),
        (300, HEIGHT - 160, "Clean"),
        (390, HEIGHT - 160, "Refine"),
        (480, HEIGHT - 160, "Pack"),
    ]
    for x, y, label in stations:
        draw.rounded_rectangle([(x - 30, y), (x + 30, y + 48)], radius=12, fill=(30, 41, 59, 220))
        draw.text((x - 24, y + 12), label, font=ImageFont.truetype(FONT_PATH, 16), fill=(248, 250, 252, 255))

    conveyor_path = [
        (110, 210),
        (200, 210),
        (200, 150),
        (380, 150),
        (380, 210),
        (520, 210),
    ]
    draw.line(conveyor_path, fill=track_color, width=12, joint="curve")
    draw.ellipse([(520 - 12, 210 - 12), (520 + 12, 210 + 12)], fill=(251, 191, 36, 255))
    draw.ellipse([(110 - 12, 210 - 12), (110 + 12, 210 + 12)], fill=(251, 191, 36, 255))

    draw.arc([(280, 40), (540, 200)], start=200, end=320, fill=(59, 130, 246, 180), width=6)


def draw_solar_flow(draw: ImageDraw.ImageDraw) -> None:
    grid_color = (94, 234, 212, 80)
    for x in range(80, WIDTH - 40, 60):
        draw.line([(x, 60), (x, HEIGHT - 160)], fill=grid_color, width=1)
    for y in range(60, HEIGHT - 160, 40):
        draw.line([(80, y), (WIDTH - 80, y)], fill=grid_color, width=1)

    zones = [
        ((100, 90), (220, 190)),
        ((240, 90), (360, 190)),
        ((380, 90), (500, 190)),
    ]
    for idx, (top_left, bottom_right) in enumerate(zones):
        draw.rounded_rectangle([top_left, bottom_right], radius=20, outline=(16, 185, 129, 180), width=3)
        draw.text((top_left[0] + 16, top_left[1] + 14), f"Zone {idx + 1}", font=ImageFont.truetype(FONT_PATH, 18), fill=(226, 232, 240, 255))

    path = [
        (120, 220),
        (160, 260),
        (280, 260),
        (320, 220),
        (420, 220),
        (460, 260),
        (540, 260),
    ]
    draw.line(path, fill=(129, 230, 217, 240), width=10, joint="curve")
    draw.ellipse([(540 - 14, 260 - 14), (540 + 14, 260 + 14)], fill=(250, 204, 21, 255))
    draw.ellipse([(120 - 14, 220 - 14), (120 + 14, 220 + 14)], fill=(250, 204, 21, 255))

    agv_box = [(300, 210), (340, 250)]
    draw.rounded_rectangle(agv_box, radius=12, fill=(14, 116, 144, 240))
    draw.rectangle([(308, 218), (332, 230)], fill=(226, 232, 240, 255))
    draw.rectangle([(312, 234), (328, 240)], fill=(16, 185, 129, 255))


def draw_creator_sanctum(draw: ImageDraw.ImageDraw) -> None:
    draw.rectangle([(60, 70), (WIDTH - 60, HEIGHT - 170)], outline=(148, 163, 184, 160), width=3)
    draw.rectangle([(72, 82), (WIDTH - 72, HEIGHT - 182)], fill=(12, 17, 36, 200))

    draw.ellipse([(110, 120), (210, 220)], outline=(94, 234, 212, 220), width=4)
    draw.ellipse([(118, 140), (202, 224)], fill=(30, 64, 175, 200))
    draw.ellipse([(132, 154), (190, 212)], fill=(226, 232, 240, 255))

    draw.rectangle([(240, 120), (520, 200)], fill=(15, 118, 110, 180))
    draw.text((256, 132), "Gary Wu", font=ImageFont.truetype(FONT_PATH, 28), fill=(236, 253, 245))
    draw.text((256, 168), "Engineer • Designer • Mentor", font=ImageFont.truetype(FONT_PATH, 18), fill=(209, 250, 229))

    draw.rounded_rectangle([(240, 214), (520, 302)], radius=18, outline=(94, 234, 212, 150), width=2)
    draw.text((258, 232), "Focus Areas", font=ImageFont.truetype(FONT_PATH, 20), fill=(240, 253, 250))
    bullet_font = ImageFont.truetype(FONT_PATH, 16)
    bullets = ["Docker + Refine systems", "AI-powered storytelling", "Spec-driven mentorship"]
    for idx, text in enumerate(bullets):
        draw.text((264, 264 + idx * 20), f"• {text}", font=bullet_font, fill=(214, 255, 244))

    draw.rounded_rectangle([(96, 238), (204, 318)], radius=14, fill=(30, 64, 175, 180))
    draw.text((110, 252), "Links", font=ImageFont.truetype(FONT_PATH, 18), fill=(226, 232, 240))
    draw.text((110, 278), "Portfolio", font=bullet_font, fill=(191, 219, 254))
    draw.text((110, 300), "Talks", font=bullet_font, fill=(191, 219, 254))

    draw.arc([(460, 60), (620, 220)], start=210, end=300, fill=(94, 234, 212, 140), width=6)
    draw.arc([(430, 40), (590, 200)], start=200, end=320, fill=(56, 189, 248, 90), width=4)


def draw_the_exchange(draw: ImageDraw.ImageDraw) -> None:
    draw.rounded_rectangle([(80, 80), (WIDTH - 80, HEIGHT - 140)], radius=30, fill=(8, 24, 44, 200), outline=(56, 189, 248, 140), width=3)

    title_font = ImageFont.truetype(FONT_PATH, 36)
    subtitle_font = ImageFont.truetype(FONT_PATH, 20)
    metric_font = ImageFont.truetype(FONT_PATH, 16)

    draw.text((100, 100), "The Exchange", font=title_font, fill=(224, 242, 254, 255))
    draw.text((100, 146), "Data Exchange & Observability", font=subtitle_font, fill=(186, 230, 253, 255))

    # lanes = [(100, 200, "Streaming"), (100, 238, "Governance"), (100, 276, "Insight")]
    # for x, y, label in lanes:
    #     draw.rounded_rectangle([(x, y), (x + 160, y + 32)], radius=12, fill=(13, 148, 136, 210))
    #     draw.text((x + 12, y + 6), label, font=metric_font, fill=(240, 253, 244, 255))

    # panel = [(WIDTH - 240, HEIGHT - 128), (WIDTH - 96, HEIGHT - 72)]
    # draw.rounded_rectangle(panel, radius=14, fill=(56, 189, 248, 220))
    # draw.text((panel[0][0] + 12, panel[0][1] + 10), "code-verse.deepwaterslife", font=ImageFont.truetype(FONT_PATH, 16), fill=(4, 12, 24, 255))

    # draw.rectangle([(WIDTH - 230, 190), (WIDTH - 110, 260)], outline=(13, 148, 136, 180), width=2)
    # draw.text((WIDTH - 220, 200), "Kafka", font=metric_font, fill=(224, 242, 254, 255))
    # draw.text((WIDTH - 220, 220), "Superset", font=metric_font, fill=(224, 242, 254, 255))
    # draw.text((WIDTH - 220, 240), "OpenTelemetry", font=metric_font, fill=(224, 242, 254, 255))


CARD_BLUEPRINTS = [
    {
        "id": "ai-posture-coach",
        "title": "AI Posture Coach",
        "gradient": ("041423", "0ea5e9"),
        "accent": "22d3ee",
        "drawer": draw_ai_posture,
    },
    {
        "id": "battle-visualizer",
        "title": "Battle Visualizer",
        "gradient": ("1e293b", "fbbf24"),
        "accent": "fef08a",
        "drawer": draw_battle_visualizer,
    },
    {
        "id": "chimpanzee-guardians",
        "title": "Chimp Guardians",
        "gradient": ("022c22", "14b8a6"),
        "accent": "5eead4",
        "drawer": draw_chimpanzee_guardians,
    },
    {
        "id": "fit-track",
        "title": "Fit Track",
        "gradient": ("0f172a", "38bdf8"),
        "accent": "38bdf8",
        "drawer": draw_fit_track,
    },
    {
        "id": "party-game-hub",
        "title": "Party Game Hub",
        "gradient": ("1d1033", "c084fc"),
        "accent": "e879f9",
        "drawer": draw_party_game_hub,
    },
    {
        "id": "slp-monitor",
        "title": "SLP Monitor",
        "gradient": ("1f2937", "f97316"),
        "accent": "fb923c",
        "drawer": draw_slp_monitor,
    },
    {
        "id": "solar-flow-wms",
        "title": "Solar Flow WMS",
        "gradient": ("082f49", "fbbf24"),
        "accent": "fde68a",
        "drawer": draw_solar_flow,
    },
    {
        "id": "creator-garywu",
        "title": "Creator Gary Wu",
        "gradient": ("020617", "0f766e"),
        "accent": "5eead4",
        "drawer": draw_creator_sanctum,
    },
    {
        "id": "the-exchange",
        "title": "The Exchange",
        "gradient": ("011627", "0ea5e9"),
        "accent": "7dd3fc",
        "drawer": draw_the_exchange,
    },
]


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for blueprint in CARD_BLUEPRINTS:
        image = Image.new("RGBA", (WIDTH, HEIGHT))
        draw_vertical_gradient(image, *blueprint["gradient"])
        overlay = ImageDraw.Draw(image, "RGBA")
        blueprint["drawer"](overlay)
        add_title(overlay, blueprint["title"], blueprint["accent"])
        output_path = OUTPUT_DIR / f"{blueprint['id']}.png"
        image.save(output_path, format="PNG")
        print(f"✓ Generated {output_path.relative_to(Path.cwd())}")


if __name__ == "__main__":
    main()
