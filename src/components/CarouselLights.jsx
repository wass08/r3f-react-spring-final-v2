import { useEffect, useState } from "react";
import { STEP_DURATION } from "./Carousel";

const NB_LIGHTS = 42;

export const CarouselLights = ({ currentStepSpring }) => {
  const [curMaxLight, setCurMaxLight] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [init, setInit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const roundedStep = Math.round(currentStepSpring.get());
      if (roundedStep != currentStep) {
        setCurrentStep(roundedStep);
        setCurMaxLight((NB_LIGHTS / 4) * roundedStep);
      }
      setCurMaxLight((curMaxLight) =>
        curMaxLight === NB_LIGHTS ? 0 : curMaxLight + 1
      );
    }, ((STEP_DURATION + (init ? 800 : 0)) / NB_LIGHTS) * 4);
    setInit(true);
    return () => {
      clearInterval(interval);
    };
  }, [currentStep]);
  return (
    <>
      {[...Array(NB_LIGHTS)].map((_item, index) => {
        const angle = (index / NB_LIGHTS) * Math.PI * 2;
        const x = Math.sin(angle) * 12;
        const z = Math.cos(angle) * 12;

        const isActive = index < curMaxLight;
        const colors = {
          0: [1.1, 0, 0],
          1: [0, 1.1, 0],
          2: [0, 0, 4],
        };
        const emissiveColor = isActive ? colors[index % 3] : [0, 0, 0];

        return (
          <mesh key={index} scale={[0.2, 0.2, 0.2]} position={[x, -1, z]}>
            <sphereGeometry />
            <meshStandardMaterial
              toneMapped={false}
              emissive={emissiveColor}
              emissiveIntensity={isActive ? 2 : 0}
            />
          </mesh>
        );
      })}
    </>
  );
};
