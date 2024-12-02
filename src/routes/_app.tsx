import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'
import Layout from '~/components/Layout/Layout'
import { useGetMe } from '~/services/getMe'


function AppLayout() {
  const [me] = useGetMe()

  useEffect(() => {
    if (!me) {
      location.replace(`/signin?redirect=${location.pathname}`)
    }
  }, [me])



  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}


export const Route = createFileRoute('/_app')({
  component: AppLayout,


  beforeLoad: async ({ location, context }) => {
    const isAuth = !!context.me

    if (!isAuth) {
      throw redirect({
        to: '/signin',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      })
    }
  },
})
