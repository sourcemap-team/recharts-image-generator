import React from "react";

export const roundAmount = (amount: number, currency?: string | undefined, round?: number | undefined) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency ? currency : 'USD',
        minimumFractionDigits: round === undefined ? 0 : round,
        maximumFractionDigits: round === undefined ? 0 : round
    })
    return formatter.format(amount)
}

export default (props: {amount: number, currency?: string | undefined, round?: number | undefined}) => {
    const {amount, currency, round} = props
    const total = roundAmount(amount, currency, round)
    return <>{total}</>
}