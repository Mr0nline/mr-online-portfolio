import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import PageLoader from "../components/PageLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

const Model = () => {
  const gltf = useLoader(GLTFLoader, require("../assets/ramen_house.glb"));
  return (
    <>
      <primitive
        object={gltf.scene}
        scale={0.04}
        position={[0, 2, 0]}
        rotation={[-Math.PI / 180, 0, 0]}
      />
    </>
  );
};

const Home = (props) => {
  return (
    <Canvas
      colorManagement
      gl={{
        powerPreference: "high-performance",
        alpha: false,
        antialias: false,
        stencil: false,
        depth: false,
      }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <color attach="background" args={["#9c999c"]} />
      <fog color="#161616" attach="fog" near={5} far={10} />
      {/*<Suspense fallback={<PageLoader />}>*/}
      <Suspense fallback={null}>
        <PerspectiveCamera>
          <Model />
        </PerspectiveCamera>
        <OrbitControls />
        <Environment preset="city" />
      </Suspense>

      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.25}
          bokehScale={0.75}
          height={480}
        />
        <Bloom luminanceThreshold={1} luminanceSmoothing={0.1} height={500} />
        <Noise opacity={0.01} />
        <Vignette eskil={false} offset={0.1} darkness={0.75} />
      </EffectComposer>
    </Canvas>
  );
};

export default Home;
