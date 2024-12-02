import { Button } from '@mantine/core'
import { createFileRoute, Link } from '@tanstack/react-router'
import LoginForm from '~/components/Login/LoginForm'
import { useLogin } from '~/services/login'

export const Route = createFileRoute('/_auth/signin')({
  component: Login,
})

function Login() {
  const [login] = useLogin()

  return (
    <div className="reg h-screen flex items-center justify-center">
      <div className="p-10 bg-white rounded-3xl">
        <div className="flex justify-center items-center mb-5">
          {/* <Logo height={30} /> */}
        </div>
        <LoginForm onSubmit={login} />

        <div className="flex gap-5 mt-4 ">
          <Link to="/signup">
            <Button
              size="xs"
              color="#722CCC"
              variant="outline"
              fullWidth
              radius={10}
            >
              Зарегистрироваться
            </Button>
          </Link>
          <Link >
            <Button
              size="xs"
              color="#722CCC"
              variant="outline"
              fullWidth
              radius={10}
            >
              Забыли пароль
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
