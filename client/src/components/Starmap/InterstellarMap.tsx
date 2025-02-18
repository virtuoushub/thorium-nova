import * as React from "react";
import {useParams} from "react-router-dom";
import {useThree} from "@react-three/fiber";
import {useRef, Suspense, useEffect} from "react";
import {Box3, Camera, Vector3} from "three";
import {useStarmapStore} from "client/src/components/Starmap/starmapStore";
import {useNetRequest} from "client/src/context/useNetRequest";
import SystemMarker from "client/src/components/Starmap/SystemMarker";
import Starfield from "client/src/components/Starmap/Starfield";
import {LightYear, lightYearToLightMinute} from "server/src/utils/unitTypes";
import {toast} from "client/src/context/ToastContext";
import {netSend} from "client/src/context/netSend";
import {useConfirm} from "@thorium/ui/AlertDialog";
import Button from "@thorium/ui/Button";
import {CameraControls} from "./CameraControls";
import CameraControlsClass from "camera-controls";
import debounce from "lodash.debounce";
import Input from "@thorium/ui/Input";
import {PolarGrid} from "./PolarGrid";

const ACTION = CameraControlsClass.ACTION;

const INTERSTELLAR_MAX_DISTANCE: LightYear = 2000;

export function InterstellarMap() {
  const {pluginId} = useParams() as {
    pluginId: string;
  };

  const stars = useNetRequest("pluginSolarSystems", {pluginId});
  const controlsEnabled = useStarmapStore(s => s.cameraControlsEnabled);
  const cameraView = useStarmapStore(s => s.cameraView);
  const orbitControls = useRef<CameraControlsClass>(null);
  const {camera} = useThree();
  useEffect(() => {
    // Set the initial camera position
    orbitControls.current?.setPosition(
      0,
      lightYearToLightMinute(INTERSTELLAR_MAX_DISTANCE) / 2,
      0
    );
    const max = lightYearToLightMinute(INTERSTELLAR_MAX_DISTANCE) * 0.75;
    orbitControls.current?.setBoundary(
      new Box3(new Vector3(-max, -max, -max), new Vector3(max, max, max))
    );
  }, [camera]);

  useEffect(() => {
    if (cameraView === "2d") {
      orbitControls.current?.rotatePolarTo(0, true);
      orbitControls.current?.rotateAzimuthTo(0, true);
    }
  }, [camera, cameraView]);

  useEffect(() => {
    useStarmapStore.setState({skyboxKey: "blank"});
  }, []);

  return (
    <Suspense fallback={null}>
      <Starfield radius={lightYearToLightMinute(INTERSTELLAR_MAX_DISTANCE)} />
      <CameraControls
        ref={orbitControls}
        enabled={controlsEnabled}
        maxDistance={lightYearToLightMinute(INTERSTELLAR_MAX_DISTANCE)}
        minDistance={1}
        mouseButtons={{
          left: cameraView === "2d" ? ACTION.TRUCK : ACTION.ROTATE,
          right: ACTION.TRUCK,
          middle: ACTION.DOLLY,
          wheel: ACTION.DOLLY,
          shiftLeft: ACTION.DOLLY,
        }}
        dollyToCursor
        dollySpeed={0.5}
      />
      <PolarGrid
        rotation={[0, (2 * Math.PI) / 12, 0]}
        args={[
          lightYearToLightMinute(INTERSTELLAR_MAX_DISTANCE),
          12,
          20,
          64,
          0xffffff,
          0xffffff,
        ]}
      />
      {stars.map(star => (
        <SystemMarker
          key={star.name}
          systemId={star.name}
          position={Object.values(star.position) as [number, number, number]}
          name={star.name}
          draggable
        />
      ))}
    </Suspense>
  );
}

interface SceneRef {
  camera: () => Camera;
}

export function InterstellarMenuButtons({
  sceneRef,
}: {
  sceneRef: React.MutableRefObject<SceneRef | undefined>;
}) {
  const {pluginId} = useParams() as {
    pluginId: string;
  };

  const selectedObjectId = useStarmapStore(s => s.selectedObjectId);
  const cameraView = useStarmapStore(s => s.cameraView);
  const confirm = useConfirm();
  async function deleteObject() {
    const selectedObjectId = useStarmapStore.getState().selectedObjectId;
    if (!selectedObjectId) return;

    const doRemove = await confirm({
      header: "Are you sure you want to remove this object?",
      body: "It will remove all of the objects inside of it.",
    });
    if (!doRemove) return;

    await netSend("pluginSolarSystemDelete", {
      pluginId,
      solarSystemId: selectedObjectId,
    });

    useStarmapStore.setState({
      selectedObjectId: null,
    });
  }

  return (
    <>
      <Button
        className="btn-success btn-outline btn-xs"
        onClick={async () => {
          const camera = sceneRef.current?.camera();
          if (!camera) return;
          const vec = new Vector3(0, 0, lightYearToLightMinute(-300));

          vec.applyQuaternion(camera.quaternion).add(camera.position);
          try {
            const system = await netSend("pluginSolarSystemCreate", {
              pluginId,
              position: vec,
            });
            useStarmapStore.setState({
              selectedObjectId: system.solarSystemId,
            });
          } catch (err) {
            if (err instanceof Error) {
              toast({
                title: "Error creating system",
                body: err.message,
                color: "error",
              });
              return;
            }
          }
        }}
      >
        Add
      </Button>
      <Button
        className="btn-error btn-outline btn-xs"
        disabled={!selectedObjectId}
        onClick={deleteObject}
      >
        Delete
      </Button>
      <Button
        className="btn-primary btn-outline btn-xs"
        disabled={!selectedObjectId}
      >
        Edit
      </Button>
      <Button
        className="btn-notice btn-outline btn-xs"
        onClick={() =>
          useStarmapStore
            .getState()
            .setCameraView(cameraView === "2d" ? "3d" : "2d")
        }
      >
        Go to {cameraView === "2d" ? "3D" : "2D"}
      </Button>
    </>
  );
}

export const InterstellarPalette = () => {
  const {pluginId} = useParams() as {
    pluginId: string;
  };
  const selectedObjectId = useStarmapStore(store => store.selectedObjectId);
  const stars = useNetRequest("pluginSolarSystems", {pluginId});

  const selectedStar = stars.find(s => s.name === selectedObjectId);

  useEffect(() => {
    if (!selectedStar) {
      useStarmapStore.setState({selectedObjectId: null});
    }
  }, [selectedStar]);

  const [name, setName] = React.useState(selectedStar?.name || "");
  const [description, setDescription] = React.useState(
    selectedStar?.description || ""
  );

  const update = React.useMemo(
    () =>
      debounce(
        async (params: {name?: string; description?: string}) => {
          if (!selectedObjectId) return;
          const result = await netSend("pluginSolarSystemUpdate", {
            pluginId,
            solarSystemId: selectedObjectId,
            ...params,
          });
          if (params.name) {
            useStarmapStore.setState({selectedObjectId: result.solarSystemId});
          }
        },
        500,
        {maxWait: 2000, trailing: true}
      ),
    [pluginId, selectedObjectId]
  );

  useEffect(() => {
    if (!selectedStar) return;
    setName(selectedStar.name);
    setDescription(selectedStar.description);
  }, [selectedStar, selectedStar?.name, selectedStar?.description]);

  return (
    <div className="w-full h-full overflow-y-auto p-2 text-white">
      <Input
        label="Name"
        value={name}
        onChange={e => {
          setName(e.target.value);
          update({name: e.target.value});
        }}
        name="name"
      />
      <Input
        label="Description"
        as="textarea"
        rows={5}
        className="resize-none"
        value={description}
        onChange={e => {
          setDescription(e.target.value);
          update({description: e.target.value});
        }}
        name="description"
      />
    </div>
  );
};
