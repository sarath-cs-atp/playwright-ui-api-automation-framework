
import fs from 'fs/promises';
import path from 'path';

export async function loadProductData(){

    const filePath = path.resolve('data', 'productData.json');
    const data = await fs.readFile(filePath, 'utf-8');

    return JSON.parse(data);

}