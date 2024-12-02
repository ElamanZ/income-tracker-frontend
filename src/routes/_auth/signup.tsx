import { createFileRoute } from '@tanstack/react-router'

import '../../index.css'

export const Route = createFileRoute('/_auth/signup')({
  component: SignUp,
})

function SignUp() {
  // const [signUpWithPhone] = useSignUpWithPhone()
  return (
    <div className="reg h-screen flex items-center justify-center">
      <div>{/* <SignUpFormWithPhoneForm onSubmit={signUpWithPhone} /> */}</div>
    </div>
  )
}
