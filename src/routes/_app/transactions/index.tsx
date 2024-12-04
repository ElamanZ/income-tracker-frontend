import { createFileRoute } from '@tanstack/react-router'


function TransactionsPage() {
    return (
        <div>TransactionsPage</div>
    )
}


export const Route = createFileRoute('/_app/transactions/')({
    component: TransactionsPage,
})
