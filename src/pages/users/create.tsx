import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler , useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { useMutation } from "react-query";

import { useToast } from '@chakra-ui/react'

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

interface CreateUserFormData {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
}

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required()
}).required()


export default function CreateUser() {
    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = await api.post('users', {
            user: {
                ...user,
                 created_at: new Date()
            }
        })

        return response.data.user
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')
        }
    })
    
    const router = useRouter()
    const toast = useToast()

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema)
    })

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        createUser.mutateAsync(values)
        console.log(values)

        showSuccessToast()
        router.push('/users')
    }

    function showSuccessToast() {
        toast({
            title: 'Account created.',
            description: "account created successfully.",
            status: 'success',
            position: 'top',
            duration: 9000,
            isClosable: true,
          })
    }

    return(
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth="1480" mx="auto" px="6">
                <Sidebar />

                <Box as="form" onSubmit={handleSubmit(handleCreateUser)} flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
                    <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input 
                                name="name" 
                                label="Nome completo"
                                error={formState.errors.name}
                                {...register('name')} 
                            />

                            <Input 
                                name="email" 
                                type="email" 
                                label="E-mail" 
                                error={formState.errors.email}
                                {...register('email')} 
                            />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input 
                                name="password" 
                                type="password" 
                                label="Senha" 
                                error={formState.errors.password}
                                {...register('password')}
                            />

                            <Input 
                                name="password_confirmation" 
                                type="password" 
                                label="Confirmaçao da senha"
                                error={formState.errors.passwordConfirmation}
                                {...register('passwordConfirmation')} 
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href={"/users"} passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}