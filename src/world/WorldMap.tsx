import { useEffect, useMemo } from 'react';
import { PlaneGeometry, TextureLoader, Vector2 } from 'three';
import { useThree, useLoader } from '@react-three/fiber';

const MAP_TEXTURE_PATH = '/textures/codeverse_map.png';
const HEIGHT_TEXTURE_PATH = '/textures/codeverse_map_height.png';
const MAP_SIZE = 120;
const SUBDIVISIONS = 256;

const useHeightDisplacement = (geometry: PlaneGeometry | null) => {
  useEffect(() => {
    if (!geometry) return;
    if (import.meta.env.VITE_USE_HEIGHTMAP !== 'true') return;

    const loader = new TextureLoader();
    loader.load(
      HEIGHT_TEXTURE_PATH,
      (texture) => {
        const canvas = document.createElement('canvas');
        canvas.width = SUBDIVISIONS;
        canvas.height = SUBDIVISIONS;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(texture.image as CanvasImageSource, 0, 0, SUBDIVISIONS, SUBDIVISIONS);
        const { data } = ctx.getImageData(0, 0, SUBDIVISIONS, SUBDIVISIONS);
        const position = geometry.attributes.position;

        for (let i = 0, j = 0; i < data.length; i += 4, j += 3) {
          const brightness = data[i] / 255;
          position.array[j + 2] = brightness * 8;
        }

        position.needsUpdate = true;
        geometry.computeVertexNormals();
      },
      undefined,
      (error) => {
        console.warn('Failed to load height map texture', error);
      }
    );
  }, [geometry]);
};

export const WorldMap = () => {
  const texture = useLoader(TextureLoader, MAP_TEXTURE_PATH);
  const geometry = useMemo(
    () => new PlaneGeometry(MAP_SIZE, MAP_SIZE, SUBDIVISIONS, SUBDIVISIONS),
    []
  );

  const { gl } = useThree();
  useEffect(() => {
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    texture.repeat = new Vector2(1, 1);
    texture.needsUpdate = true;
  }, [gl, texture]);

  useHeightDisplacement(geometry);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default WorldMap;
