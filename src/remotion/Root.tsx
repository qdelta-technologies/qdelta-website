import React from "react";
import { Composition } from "remotion";
import { BrandTransformationComposition } from "./BrandTransformation";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BrandTransformation"
        component={BrandTransformationComposition}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          primaryColor: "#E7B72A",
          accentColor: "#06070A",
        }}
      />
    </>
  );
};
