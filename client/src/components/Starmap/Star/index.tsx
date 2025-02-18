import React from "react";
import {solarRadiusToKilometers} from "server/src/utils/unitTypes";
import {Color} from "three";
import OrbitContainer from "../OrbitContainer";
import Star from "./StarMesh";
import Selected from "../Selected";
import {useStarmapStore} from "../starmapStore";
import {getOrbitPosition} from "server/src/utils/getOrbitPosition";
import StarPlugin from "server/src/classes/Plugins/Universe/Star";

const StarEntity: React.FC<{
  star: StarPlugin;
}> = ({star}) => {
  const viewingMode = useStarmapStore(state => state.viewingMode);
  // const selectedId = useConfigStore(store => store.selectedObject?.id);
  const selected = false; //selectedId === entity.id;
  if (!star.satellite) return null;
  const {semiMajorAxis, eccentricity, orbitalArc, inclination, showOrbit} =
    star.satellite;
  const color1 = new Color(
    `hsl(${star.hue}, 100%, ${star.isWhite ? 100 : 50}%)`
  );
  const color2 = new Color(
    `hsl(${star.hue + 20}, 100%, ${star.isWhite ? 100 : 50}%)`
  );

  const size =
    viewingMode === "editor"
      ? 10 + 5 * star.radius
      : solarRadiusToKilometers(star.radius);
  return (
    <OrbitContainer
      radius={semiMajorAxis}
      eccentricity={eccentricity}
      orbitalArc={orbitalArc}
      orbitalInclination={inclination}
      showOrbit={showOrbit}
    >
      <group
        onPointerOver={() => {
          if (viewingMode === "viewscreen") return;
          if (viewingMode === "core") return;
          document.body.style.cursor = "pointer";
          const position = getOrbitPosition({
            eccentricity,
            orbitalArc,
            inclination: inclination,
            semiMajorAxis: semiMajorAxis,
          });
          // useConfigStore.setState({
          //   hoveredPosition: position,
          //   scaledHoveredPosition: position,
          // });
        }}
        onPointerOut={() => {
          if (viewingMode === "viewscreen") return;
          if (viewingMode === "core") return;
          document.body.style.cursor = "auto";
          // useConfigStore.setState({
          //   hoveredPosition: null,
          //   scaledHoveredPosition: null,
          // });
        }}
        onClick={() => {
          if (viewingMode === "viewscreen") return;
          if (viewingMode === "core") return;
          const position = getOrbitPosition({
            eccentricity,
            orbitalArc,
            inclination: inclination,
            semiMajorAxis: semiMajorAxis,
          });
          useStarmapStore.setState({
            selectedObjectId: star.name,
            // selectedPosition: position,
            // scaledSelectedPosition: position,
          });
        }}
        scale={[size, size, size]}
      >
        {selected && viewingMode !== "viewscreen" && <Selected />}
        <Star color1={color1} color2={color2} size={size} />
      </group>
    </OrbitContainer>
  );
};

export default StarEntity;
