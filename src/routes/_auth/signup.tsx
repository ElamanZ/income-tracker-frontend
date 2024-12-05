import { createFileRoute } from '@tanstack/react-router'
import '../../index.css'
import SignUpForm from '~/components/Login/SignUpForm'
import { useSignUp } from '~/services/signUp'


function SignUp() {
  const [signUp] = useSignUp()
  return (
    <div className="reg h-screen flex items-center justify-center">
      <SignUpForm onSubmit={signUp} />
    </div>
  )
}


export const Route = createFileRoute('/_auth/signup')({
  component: SignUp,
})
