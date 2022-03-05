import ReactDOMServer from 'react-dom/server';
import { ChartName } from 'types'
import { Chart } from '@components/Chart/Chart'
import PortfolioStructure from '@components/Chart/PortfolioStructure'

import { parse } from 'node-html-parser'
import type {NextApiRequest, NextApiResponse} from "next";

function recharts2svgString(data: any, chartName: string) {
    let htmlStringRoot: string = ''
    let parsedSting
    switch(chartName){
        case ChartName.PortfolioStructure:
            htmlStringRoot = ReactDOMServer.renderToString(PortfolioStructure(data))
            break;
        case ChartName.HABWeek:
            htmlStringRoot = ReactDOMServer.renderToString(Chart(data))
            break;
    }

    if (htmlStringRoot) {
        parsedSting = parse(htmlStringRoot)
    }

    const svgString = parsedSting?.querySelector("svg")?.toString()

    return svgString ?  '<?xml version="1.0"?>' + svgString.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink" ') : 'Error'
}

const RechartsToImageSvg = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {

    const { data, chartName } = req.body

    res.writeHead(200, {
        "Content-Type": "image/svg+xml",
    });
    res.write(recharts2svgString(data, chartName))
    res.end()
};

export { recharts2svgString };
export default RechartsToImageSvg;