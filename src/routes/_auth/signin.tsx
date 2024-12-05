import { Button } from '@mantine/core'
import { createFileRoute, Link } from '@tanstack/react-router'
import LoginForm from '~/components/Login/LoginForm'
import LogoWithText2 from '~/components/Logo/LogoWithText2'
import { useLogin } from '~/services/login'


function Login() {
  const [login] = useLogin()

  return (
    <div className="reg h-screen flex items-center justify-center">
      <div className="p-4 bg-white rounded-3xl">
        <div className="flex justify-center items-center mb-5 border-2 border-[#62B440] rounded-md p-2">
          <LogoWithText2 size={150} />
        </div>
        <LoginForm onSubmit={login} />

        <div className="flex gap-5 mt-4">
          <Link to="/signup">
            <Button
              size="xs"
              color="#62B440"
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
              color="#62B440"
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

export const Route = createFileRoute('/_auth/signin')({
  component: Login,
})
