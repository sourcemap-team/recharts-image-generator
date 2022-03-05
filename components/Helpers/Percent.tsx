import React from "react";

export default (props: {amount?: number}) => {
    const {amount} = props
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    })
    const total = amount ? formatter.format(amount) : 0.0

    return <>{amount && total}</>
}