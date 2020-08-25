import {
  Accordion,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/core";

import React from "react";
import PropertyPalette from "../../ui/propertyPalette";
import {configStoreApi, useConfigStore} from "../configStore";
import {useTranslation} from "react-i18next";
import OrbitPalette from "./orbit";
import BasicPalette from "./basic";
import {hasOrbit, isPlanet, isStar} from "./utils";
import StarPalette from "./star";
import PlanetPalette from "./planet";

const ConfigPalette: React.FC = () => {
  const {t} = useTranslation();
  const selectedObject = useConfigStore(store => store.selectedObject);

  if (!selectedObject) return null;

  return (
    <PropertyPalette
      key={selectedObject.id}
      onClose={() => configStoreApi.setState({selectedObject: null})}
    >
      <Accordion>
        <AccordionItem>
          <AccordionHeader>
            <Box flex="1" textAlign="left">
              {t("Basics")}
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel>
            <BasicPalette />
          </AccordionPanel>
        </AccordionItem>
        {hasOrbit(selectedObject) && (
          <AccordionItem>
            <AccordionHeader>
              <Box flex="1" textAlign="left">
                {t("Orbit")}
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel>
              <OrbitPalette />
            </AccordionPanel>
          </AccordionItem>
        )}
        {isStar(selectedObject) && (
          <AccordionItem>
            <AccordionHeader>
              <Box flex="1" textAlign="left">
                {t("Star Properties")}
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel>
              <StarPalette />
            </AccordionPanel>
          </AccordionItem>
        )}
        {isPlanet(selectedObject) && (
          <AccordionItem>
            <AccordionHeader>
              <Box flex="1" textAlign="left">
                {t("Planet Properties")}
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel>
              <PlanetPalette />
            </AccordionPanel>
          </AccordionItem>
        )}
      </Accordion>
    </PropertyPalette>
  );
};

export default ConfigPalette;
