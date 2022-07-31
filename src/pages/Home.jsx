import React, { useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import PageLoader from "../components/PageLoader";
import AppControls from "../components/AppControls";
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
        scale={0.375}
        position={[0, -1.1, 0]}
        rotation={[-Math.PI / 180, 0, 0]}
      />
    </>
  );
};

const Home = (props) => {
  const [xSpotLight, setXSpotLight] = useState(10);
  const [ySpotLight, setYSpotLight] = useState(10);
  const [zSpotLight, setZSpotLight] = useState(10);
  const [angleSpotLight, setAngleSpotLight] = useState(0.15);
  const [modelLoading, setModelLoading] = useState(true);

  return (
    <>
      {/* <AppControls /> */}
      <label htmlFor="xSpotLight">Spotlight X</label>
      <input
        type="number"
        name="xSpotLight"
        id="xSpotLight"
        onChange={(e) => setXSpotLight(+e.target.value)}
      />
      <label htmlFor="ySpotLight">Spotlight Y</label>
      <input
        type="number"
        name="ySpotLight"
        id="ySpotLight"
        onChange={(e) => setYSpotLight(+e.target.value)}
      />
      <label htmlFor="zSpotLight">Spotlight Z</label>
      <input
        type="number"
        name="zSpotLight"
        id="zSpotLight"
        onChange={(e) => setZSpotLight(+e.target.value)}
      />
      <label htmlFor="angleSpotLight">Spotlight Angle</label>
      <input
        type="number"
        name="angleSpotLight"
        id="angleSpotLight"
        onChange={(e) => setAngleSpotLight(+e.target.value)}
      />
      {modelLoading ? <PageLoader /> : null}
      <Canvas
        className={modelLoading ? "d-none" : ""}
        gl={{
          powerPreference: "high-performance",
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[xSpotLight, ySpotLight, zSpotLight]}
          angle={angleSpotLight}
          penumbra={1}
        />
        <color attach="background" args={["#9c999c"]} />
        <fog color="#161616" attach="fog" near={5} far={10} />
        {/* <Suspense fallback={<PageLoader />}> */}
        <Suspense fallback={null}>
          <PerspectiveCamera
            rotateOnAxis={[1, 0, 0]}
            onAfterRender={() => {
              console.log("Rendered");
              setModelLoading(false);
            }}
          >
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
    </>
  );
};

export default Home;
