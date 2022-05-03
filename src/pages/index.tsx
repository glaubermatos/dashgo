import { Flex, Button, Stack, } from '@chakra-ui/react'
import { resolve } from 'path';
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../components/Form/Input'

type SignInFormData = {
  email: string;
  password: string;
}

export default function SignIn() {

  const { register, handleSubmit, formState } = useForm()

  const  handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log(values)
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name='email'
            label='E-mail'
            type='email'
            {...register('email')} />
          <Input
            name='password'
            label='Password'
            type='password'            
            {...register('password')} />
        </Stack>

        <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
      </Flex>
    </Flex>
  )
}
