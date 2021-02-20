import React, {Suspense} from "react";
import {useFrame, useThree} from "react-three-fiber";
import {AdditiveBlending, Mesh, Vector3} from "three";
import {useConfigStore} from "./configStore";
import Interstellar from "./Interstellar";
import Nebula from "./Nebula";
import Planetary from "./Planetary";
import {Line as LineMesh} from "@react-three/drei";
import {Line2} from "three/examples/jsm/lines/Line2";
// @ts-ignore
import TextTexture from "@seregpie/three.text-texture";
import {mergeRefs} from "../../helpers/mergeRefs";

function midPoint(vec1: Vector3, vec2: Vector3) {
  return new Vector3(
    (vec1.x + vec2.x) / 2,
    (vec1.y + vec2.y) / 2,
    (vec1.z + vec2.z) / 2
  );
}

const TextLabel = React.forwardRef<Mesh, {text: string; position?: Vector3}>(
  ({text, position = new Vector3()}, ref) => {
    const textTexture = React.useMemo(() => {
      let texture = new TextTexture({
        color: "rgb(0,255,255)",
        fontFamily: 'Electrolize, "Gill Sans", sans-serif',
        fontSize: 128,
        alignment: "right",
        text,
      });
      texture.redraw();
      return texture;
    }, [text]);

    const localRef = React.useRef<Mesh>();
    const scale = 3 / 128;
    const spriteWidth = textTexture.width / textTexture.height;

    useFrame(({camera, mouse}) => {
      if (localRef.current) {
        const zoom = camera.position.distanceTo(localRef.current?.position);
        let zoomedScale = (zoom / 2) * 0.0003;
        localRef.current.scale.set(zoomedScale, zoomedScale, zoomedScale);
        localRef.current.quaternion.copy(camera.quaternion);
      }
    });

    return (
      <mesh
        ref={mergeRefs([localRef, ref])}
        position={[-spriteWidth * 2.7 - 2 + position.x, position.y, position.z]}
        userData={{spriteWidth}}
        scale={[scale, scale, scale]}
        renderOrder={1000}
      >
        <planeBufferGeometry
          args={[textTexture.width, textTexture.height, 1]}
          attach="geometry"
        />
        <meshBasicMaterial
          attach="material"
          map={textTexture}
          transparent
          blending={AdditiveBlending}
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
    );
  }
);
const MeasureLine = () => {
  const selectedPosition = useConfigStore(store => store.selectedPosition);
  const hoveredPosition = useConfigStore(store => store.hoveredPosition);

  const systemId = useConfigStore(store => store.systemId);
  const hasMeasureLine = !!(
    selectedPosition &&
    hoveredPosition &&
    !(
      selectedPosition.x === hoveredPosition.x &&
      selectedPosition.y === hoveredPosition.y &&
      selectedPosition.z === hoveredPosition.z
    )
  );
  const ref = React.useRef<Line2>(null);
  const orb = React.useRef<Mesh>(null);
  useFrame(() => {
    if (!hasMeasureLine) return;
    const {
      scaledSelectedPosition: selectedPosition,
      scaledHoveredPosition: hoveredPosition,
    } = useConfigStore.getState();
    if (!hoveredPosition || !selectedPosition) return;
    const position = [
      selectedPosition.x,
      selectedPosition.y,
      selectedPosition.z,
    ];

    if (ref.current) {
      ref.current.geometry.setPositions(
        [
          position,
          [hoveredPosition.x, hoveredPosition.y, hoveredPosition.z],
        ].flat()
      );
    }
    if (orb.current) {
      orb.current.position.copy(
        midPoint(new Vector3(...position), hoveredPosition)
      );
    }
  });
  if (!selectedPosition || !hoveredPosition || !hasMeasureLine) return null;

  const distanceValue =
    Math.round(hoveredPosition.distanceTo(selectedPosition) * 100) / 100;
  const distance = `${distanceValue.toLocaleString()} ${
    systemId ? "KM" : "LY"
  }`;
  return (
    <>
      <LineMesh
        ref={ref}
        points={[[0, 0, 0]]}
        color="#0088ff"
        transparent
        depthTest={false}
        opacity={0.3}
        linewidth={3}
      />
      <TextLabel text={distance} ref={orb} />
    </>
  );
};
const Scene = React.forwardRef((props, ref) => {
  const universeId = useConfigStore(s => s.universeId);
  const systemId = useConfigStore(s => s.systemId);
  const measuring = useConfigStore(s => s.measuring);

  React.useEffect(() => {
    useConfigStore.setState({viewingMode: "editor"});
  }, []);
  const {camera} = useThree();
  React.useImperativeHandle(ref, () => ({
    camera: () => {
      return camera;
    },
  }));
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} />
      {universeId && !systemId && <Interstellar universeId={universeId} />}
      {universeId && systemId && (
        <Planetary universeId={universeId} systemId={systemId} />
      )}
      <Suspense fallback={null}>
        <Nebula />
      </Suspense>
      {measuring && <MeasureLine />}
    </>
  );
});

export default Scene;
