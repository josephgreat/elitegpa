import { Box, Container, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ServerError = () => {
  return (
    <Container display="grid" minH="100vh" placeItems={"center"}>
      <Box textAlign={"center"}>
        <Box
          as={"img"}
          src="/images/No wifi.gif"
          w="auto"
          mx="auto"
        />
        <Heading as="h1" fontSize={"clamp(3rem, 10vw, 5rem)"}>
          Not your Fault, but ours
        </Heading>
        <Heading as="h2">Internal Server Error</Heading>
        <Text>You can go to our homepage <Link to="/">elitegpa</Link></Text>
        <Heading
          w={"clamp(5rem, 10vw, 6rem)"}
          fontSize={"clamp(1.2rem, 3vw, 1.5rem)"}
          mt="4"
          mx="auto"
        >
          <Img alt="eliteGPA" w="100%" src={`/images/4x/logo.png`} />
        </Heading>
      </Box>
    </Container>
  )
}

export default ServerError