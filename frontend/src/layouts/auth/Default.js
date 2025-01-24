// Chakra imports
import { Box, Flex, Icon, Text, Image } from "@chakra-ui/react"
import PropTypes from "prop-types"
import React from "react"
import Footer from "components/footer/FooterAuth"
import FixedPlugin from "components/fixedPlugin/FixedPlugin"
// Custom components
import { NavLink } from "react-router-dom"
// Assets
import { FaChevronLeft } from "react-icons/fa"

function AuthIllustration(props) {
  const { children, circuitNftImage } = props

  return (
    <Flex position='relative' h='max-content'>
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "97vh",
        }}
        w='100%'
        maxW={{ md: "66%", lg: "1313px" }}
        mx='auto'
        pt={{ sm: "50px", md: "0px" }}
        px={{ lg: "30px", xl: "0px" }}
        ps={{ xl: "70px" }}
        justifyContent='start'
        direction='column'>
        <NavLink
          to='/admin/dashboard'
          style={() => ({
            width: "fit-content",
            marginTop: "40px",
          })}>
          <Flex
            align='center'
            ps={{ base: "25px", lg: "0px" }}
            pt={{ lg: "0px", xl: "0px" }}
            w='fit-content'>
            <Icon
              as={FaChevronLeft}
              me='12px'
              h='13px'
              w='8px'
              color='secondaryGray.600'
            />
            <Text ms='0px' fontSize='sm' color='secondaryGray.600'>
              Back to Dashboard
            </Text>
          </Flex>
        </NavLink>
        {children}
        <Box
          display={{ base: "none", md: "block" }}
          h="100%"
          minH="100vh"
          w={{ lg: "50vw", "2xl": "44vw" }}
          position="absolute"
          right="0px"
          bgGradient="linear(to-br, #9a8af7, #784BFF, #2118a5)"
          bgSize="cover"
          bgPosition="center"
        >
          <Box
            h="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="50%"
            margin="0 auto"
          >
            <Image
              src={circuitNftImage}
              alt="Transparent Logo"
            />
          </Box>
        </Box>

        <Footer />
      </Flex>
      <FixedPlugin />
    </Flex>
  )
}
// PROPS

AuthIllustration.propTypes = {
  circuitNftImage: PropTypes.string,
}

export default AuthIllustration
