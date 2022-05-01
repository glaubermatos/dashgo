import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
    return(
        <Flex align="center" >
            <Box mr="4" textAlign="right">
                <Text>Glauber Matos</Text>
                <Text
                    color="gray.300"
                    fontSize="small"
                >
                    glaub.oliveira@hotmail.com
                </Text>

            </Box>

            <Avatar size="md" name="Glauber Matos" src="https://github.com/glaubermatos.png" />
        </Flex>
    )
}