import { legoColors } from "@/constants/colors";

type rgbVal = {r: number, g: number, b: number}

const hexToRGB = (hex: string) =>{
    hex = hex.replace(/^0x/, ''); // Remove the '0x' part if present
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

// Euclidean distance between two RGB colors
const colorDistance = (rgb1: rgbVal, rgb2: rgbVal) => {
    const rDiff = rgb1.r - rgb2.r;
    const gDiff = rgb1.g - rgb2.g;
    const bDiff = rgb1.b - rgb2.b;
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
};

// calculate the distance from the found rgb val to the values within the map
export const findClosestColor = (rgb: rgbVal) => {
    let closestColor = null;
    let minDistance = Infinity;

    for (const hex in legoColors) {
        const colorRGB = hexToRGB(hex);
        const distance = colorDistance(rgb, colorRGB);

        if (distance < minDistance) {
            minDistance = distance;
            closestColor = legoColors[hex];
        }
    }

    return closestColor;
};