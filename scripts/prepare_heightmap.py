from __future__ import annotations

import argparse
from pathlib import Path

import math
from PIL import Image, ImageChops, ImageFilter, ImageOps

DEFAULT_TARGET = 256
SOURCE_NAME = "codeverse_map_height_source.png"
TARGET_NAME = "codeverse_map_height.png"


def build_falloff_mask(width: int, height: int, exponent: float) -> Image.Image:
    cx, cy = width / 2.0, height / 2.0
    max_distance = math.sqrt(cx ** 2 + cy ** 2)
    pixels = []
    for y in range(height):
        for x in range(width):
            dist = math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
            falloff = 1.0 - min(dist / max_distance, 1.0)
            value = int((falloff ** exponent) * 255)
            pixels.append(value)
    mask = Image.new('L', (width, height))
    mask.putdata(pixels)
    return mask


def normalize_image(image: Image.Image) -> Image.Image:
    black, white = image.getextrema()
    if black == white:
        return Image.new('L', image.size)
    return image.point(lambda v: int((v - black) * 255 / (white - black)))


def process_heightmap(
    source_path: Path,
    output_path: Path,
    size: int,
    blur_radius: float,
    falloff_strength: float,
    apply_equalize: bool,
) -> None:
    if not source_path.exists():
        raise FileNotFoundError(f"Missing source heightmap at {source_path}")

    image = Image.open(source_path).convert("L")

    if apply_equalize:
        image = ImageOps.equalize(image)

    if blur_radius > 0:
        image = image.filter(ImageFilter.GaussianBlur(radius=blur_radius))

    if falloff_strength > 0:
        falloff_mask = build_falloff_mask(image.size[0], image.size[1], exponent=falloff_strength)
        image = ImageChops.multiply(image, falloff_mask)

    image = normalize_image(image)
    processed = image.resize((size, size), Image.Resampling.LANCZOS)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    processed.save(output_path)


def main() -> None:
    parser = argparse.ArgumentParser(description="Prepare CodeVerse terrain heightmap")
    parser.add_argument(
        "--source",
        type=Path,
        default=Path("public/textures") / SOURCE_NAME,
        help="Path to the raw grayscale concept art (default: public/textures/codeverse_map_height_source.png)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("public/textures") / TARGET_NAME,
        help="Destination for the normalized heightmap (default: public/textures/codeverse_map_height.png)",
    )
    parser.add_argument(
        "--size",
        type=int,
        default=DEFAULT_TARGET,
        help="Square resolution for the exported heightmap (default: 256)",
    )
    parser.add_argument(
        "--blur",
        type=float,
        default=2.5,
        help="Gaussian blur radius applied before normalization to soften sharp poly edges (default: 2.5)",
    )
    parser.add_argument(
        "--falloff",
        type=float,
        default=1.6,
        help="Radial falloff exponent to taper heights near the border (0 disables falloff)",
    )
    parser.add_argument(
        "--no-equalize",
        action="store_true",
        help="Skip histogram equalization; use if the source already has correct contrast",
    )

    args = parser.parse_args()

    process_heightmap(
        source_path=args.source,
        output_path=args.output,
        size=args.size,
        blur_radius=args.blur,
        falloff_strength=args.falloff,
        apply_equalize=not args.no_equalize,
    )

    print(f"✓ Heightmap exported to {args.output}")


if __name__ == "__main__":
    main()
