import { createFileRoute, redirect } from '@tanstack/react-router'

function RouteComponent() {
  return <div>Index</div>
}


export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad() {
    throw redirect({ from: '/', to: '/balance', replace: true })
  },
})