export function upperFirstCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function testImageUrl(url: string): boolean {
    let reg = /\.(jpg|jpeg|png|gif|bmp|svg|webp|tiff)$/g;
    return reg.test(url);
}