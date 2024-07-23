import { Grid, Spinner, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = ({text}) => {
  return (
    <Grid
          pos="fixed"
          zIndex={"2"}
          inset="0"
          bg="rgba(20,20,20,.5)"
          backdropFilter={"blur(5px)"}
          placeItems="center"
        >
          <VStack>
            <Spinner size="xl" borderWidth={"3px"} color={"white"} />
            <Text color={"white"} fontWeight="bold" letterSpacing=".3rem">
              {text}
            </Text>
          </VStack>
        </Grid>
  )
}

export default Loader