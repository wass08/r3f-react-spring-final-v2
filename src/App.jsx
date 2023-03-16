import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Scanline,
  Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { Experience } from "./components/Experience";

function App() {
  const { focusDistance, focalLength, bokehScale, height, scanlineDensity } =
    useControls({
      focusDistance: {
        min: 0,
        max: 1,
        value: 0,
      },
      focalLength: {
        min: 0,
        max: 2,
        value: 0.2,
      },
      bokehScale: {
        min: 0,
        max: 10,
        value: 4.2,
      },
      height: {
        min: 0,
        max: 1024,
        value: 480,
      },
      scanlineDensity: {
        min: 0,
        max: 4,
        value: 0.42,
      },
    });

  return (
    <Canvas shadows camera={{ position: [0, 16, 42], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <Experience />
      <EffectComposer>
        <DepthOfField
          focusDistance={focusDistance}
          focalLength={focalLength}
          bokehScale={bokehScale}
          height={height}
        />
        <Bloom mipmapBlur luminanceThreshold={1} intensity={2.4} />
        <Vignette offset={0.3} darkness={0.6} />
        <Scanline density={scanlineDensity} opacity={0.1} />
      </EffectComposer>
    </Canvas>
  );
}

export default App;
