import { useEffect, useMemo, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useWorldStore } from '@store/worldStore';

const WORLD_UP = new Vector3(0, 1, 0);
const CAMERA_LERP = 0.12;

const toArray = (vector: Vector3) => [vector.x, vector.y, vector.z] as [number, number, number];

export const CameraController = () => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const desiredPosition = useRef(new Vector3());
  const desiredTarget = useRef(new Vector3());
  const keys = useMemo(() => new Set<string>(), []);

  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);

  const cameraPosition = useWorldStore((state) => state.cameraPosition);
  const cameraLookAt = useWorldStore((state) => state.cameraLookAt);
  const cameraMode = useWorldStore((state) => state.cameraMode);
  const updateCameraPose = useWorldStore((state) => state.updateCameraPose);

  useEffect(() => {
    desiredPosition.current.set(...cameraPosition);
  }, [cameraPosition]);

  useEffect(() => {
    desiredTarget.current.set(...cameraLookAt);
    controlsRef.current?.target.copy(desiredTarget.current);
  }, [cameraLookAt]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keys.add(event.key.toLowerCase());
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keys.delete(event.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keys]);

  useFrame((_, delta) => {
    const targetSpeed = cameraMode === 'desktop' ? 20 : cameraMode === 'tablet' ? 15 : 12;
    const step = targetSpeed * delta;

    const forward = new Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();

    const right = new Vector3().crossVectors(forward, WORLD_UP).normalize();

    const movement = new Vector3();
    if (keys.has('w')) movement.add(forward);
    if (keys.has('s')) movement.sub(forward);
    if (keys.has('a')) movement.sub(right);
    if (keys.has('d')) movement.add(right);

    if (movement.lengthSq() > 0) {
      movement.normalize().multiplyScalar(step);
      desiredPosition.current.add(movement);
      desiredTarget.current.add(movement);
    }

    const lerpAlpha = 1 - Math.pow(1 - CAMERA_LERP, delta * 60);
    camera.position.lerp(desiredPosition.current, lerpAlpha);
    controlsRef.current?.target.lerp(desiredTarget.current, lerpAlpha);
    controlsRef.current?.update();

    const currentPosition = camera.position.clone();
    const currentTarget = controlsRef.current?.target.clone() ?? desiredTarget.current.clone();
    updateCameraPose(toArray(currentPosition), toArray(currentTarget));
  });

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enablePan
      enableDamping
      dampingFactor={0.08}
      maxPolarAngle={Math.PI / 2.1}
      minDistance={10}
      maxDistance={140}
    />
  );
};

export default CameraController;
