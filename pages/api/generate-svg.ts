import ReactDOMServer from 'react-dom/server';
import rechartElement from '../../components/Chart/Chart'
import { parse } from 'node-html-parser'
import type {NextApiRequest, NextApiResponse} from "next";

function recharts2svgString() {

    const htmlStringRoot = ReactDOMServer.renderToString(rechartElement())
    const parsedSting = parse(htmlStringRoot)
    const svgString = parsedSting?.querySelector("svg")?.toString()

    return svgString ?  '<?xml version="1.0"?>' + svgString.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink" ') : 'Error'
}

const RechartsToImageSvg = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {

    res.writeHead(200, {
        "Content-Type": "image/svg+xml",
    });
    res.write(recharts2svgString())
    res.end()
};

export { recharts2svgString };
export default RechartsToImageSvg;