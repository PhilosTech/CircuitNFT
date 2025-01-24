import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Image } from "@chakra-ui/react";

import circuitNftImage from "assets/img/dashboards/circuitnft1.png";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Image src={circuitNftImage} alt='logo' h='4.5rem' />
      <HSeparator m='20px 0' />
    </Flex>
  );
}

export default SidebarBrand;
