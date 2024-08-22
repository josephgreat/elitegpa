import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Error = ({error_text}) => {
  return (
    <Box>
        <Text>{error_text}</Text>
    </Box>
  )
}

export default Error