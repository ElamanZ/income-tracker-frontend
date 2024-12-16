import { Button } from '@mantine/core'
import { createFileRoute, Link } from '@tanstack/react-router'
import LoginForm from '~/components/Login/LoginForm'
import { useLogin } from '~/services/login'


function Login() {
  const [login] = useLogin();
  return (
    <div className="bg-custom-gradient h-screen flex items-center justify-center">
      <div className="p-4">
        <LoginForm onSubmit={login} />

        <div className="flex gap-5 mt-4">
          <Link to="/signup">
            <Button
              size="xs"
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
