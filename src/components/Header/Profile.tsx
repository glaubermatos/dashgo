import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return(
        <Flex align="center" >
            { showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Glauber Matos</Text>
                    <Text
                        color="gray.300"
                        fontSize="small"
                    >
                        glaub.oliveira@hotmail.com
                    </Text>
                </Box>
            ) }

            <Avatar size="md" name="Glauber Matos" src="https://github.com/glaubermatos.png" />
        </Flex>
    )
}