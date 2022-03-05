import { createCanvas, Image } from 'canvas'
import { ChartName } from '../../types'
import { recharts2svgString } from './generate-svg'
import type {NextApiRequest, NextApiResponse} from "next";

const RechartsToImagePng = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    const { data, chartName } = req.body
    const canvas = createCanvas(403, 400);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = '#FFFFFF';

    const img = new Image();
    img.src = "data:image/svg+xml," + await recharts2svgString(data,chartName);

    switch(chartName){
        case ChartName.PortfolioStructure:
            ctx.fillRect(0, 0, 403, 240);
            ctx.drawImage(img, 0, 0, 403, 240);
            break;
        case ChartName.HABWeek:
            ctx.fillRect(0, 0, 400, 400);
            ctx.drawImage(img, 0, 0, 400, 400);
            break;
    }

    // canvasをpngでresponseする
    const buffer = canvas.toBuffer();
    res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": buffer.length,
    });
    res.end(buffer, "binary");
};

export default RechartsToImagePng;