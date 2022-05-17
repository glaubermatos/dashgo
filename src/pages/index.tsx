import { Flex, Button, Stack, } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Input } from '../components/Form/Input'
import { useRouter } from 'next/router';

type SignInFormData = {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required()
}).required();

export default function SignIn() {
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema)
  })

  const { errors } = formState

  console.log(errors)

  const  handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log(values)

    router.push('/dashboard')
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
            error={errors.email}
            {...register('email')} />
          <Input
            name='password'
            label='Password'
            type='password'  
            error={errors.password}
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
