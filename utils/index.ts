import { PortfolioChartDot } from 'types'

export function getPercentDomain(dots: PortfolioChartDot[]) : number[] {
    let min = 0.0,
        max = 0.0;

    dots.forEach(function(dot: PortfolioChartDot) {
        if (min == 0 || min > dot.benchmark || min > dot.portfolio) {
            min = dot.benchmark > dot.portfolio ? dot.portfolio : dot.benchmark
        }

        if (max == 0 || max < dot.benchmark || max < dot.portfolio) {
            max = dot.benchmark < dot.portfolio ? dot.portfolio : dot.benchmark
        }
    });

    min = Math.ceil(min)
    max = Math.floor(max + 2)

    let diff = max - min

    return [min - diff*2, max]
}

export function getNavDomain(dots: PortfolioChartDot[]) : number[] {
    let min = 0.0,
        max = 0.0;

    dots.forEach(function(dot: PortfolioChartDot) {
        if (min == 0 || (dot.nav != 0 && min > dot.nav)) {
            min = dot.nav
        }

        if (min == 0 || (dot.nav_historical != 0 && min > dot.nav_historical)) {
            min = dot.nav_historical
        }

        if (max == 0 || (dot.nav != 0 && max < dot.nav)) {
            max = dot.nav
        }

        if (max == 0 || (dot.nav_historical != 0 && max < dot.nav_historical)) {
            max = dot.nav_historical
        }
    });

    min = min*0.92
    const min_length = min.toFixed(0).length

    if (min_length <= 2) {
        min = 0
    } else if (min_length <= 3) {
        min = parseInt(min.toFixed(0)[0].padEnd(min_length, "0"))
    } else {
        min = parseInt((min.toFixed(0)[0] + min.toFixed(0)[1]).padEnd(min_length, "0"))
    }

    const diff = (max - min)/2
    max = max + (diff < 0.1*max && diff <= 100 ? 0.3*max : diff)

    const max_length = max.toFixed(0).length

    if (max_length > 1 && max_length <= 3) {
        max = parseInt((parseInt(max.toFixed(0)[0])+1).toFixed(0).padEnd(max_length, "0"))
    } else if (max_length > 3) {
        max = parseInt((max.toFixed(0)[0] + max.toFixed(0)[1]).padEnd(max_length, "0"))
    }

    return [min, max]
}