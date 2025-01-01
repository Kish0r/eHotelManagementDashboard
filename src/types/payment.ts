export type Payment = {
    payment_id: string
    booking_id: string
    amount: number
    status: string
    payment_date: Date
}

export type PaginatedPayment = {
    payments: Payment[]
    total: number
}