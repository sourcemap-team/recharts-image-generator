import { createCanvas, Image } from 'canvas'
import { recharts2svgString } from './generate-svg'
import type {NextApiRequest, NextApiResponse} from "next";

const RechartsToImagePng = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    const { data, chartName, width, height } = req.body
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = '#FFFFFF';

    const img = new Image();
    img.src = "data:image/svg+xml," + await recharts2svgString(data,chartName);

    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const buffer = canvas.toBuffer();
    res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": buffer.length,
    });
    res.end(buffer, "binary");
};

export default RechartsToImagePng;