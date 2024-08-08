export function upperFirstCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function testImageUrl(url: string): boolean {
    let reg = /\.(jpg|jpeg|png|gif|bmp|svg|webp|tiff)$/g;
    return reg.test(url);
}

export function getTimeSince(timestamp: number) {
    var currentTimestamp = new Date().getTime();
    var timeDifference = currentTimestamp - timestamp;
    if (timeDifference < 60000) {
        return Math.floor(timeDifference / 1000) + ' secs ago';
    } else if (timeDifference < 3600000) {
        return Math.floor(timeDifference / 60000) + ' mins ago';
    } else if (timeDifference < 86400000) {
        return Math.floor(timeDifference / 3600000) + ' hours ago';
    } else {
        var date = new Date(timestamp);
        return date.toLocaleDateString();
    }
}

export function getHash(hash: string) {
    if (hash != null) {
        return hash.slice(0, 5) + "..." + hash.slice(-5)
    }
}
export function isTimestampMoreThan14DaysAgo(timestamp:number) {
    // 获取当前时间的时间戳
    const now = Date.now();
  
    // 14 天的毫秒数
    const fourteenDaysInMillis = 14 * 24 * 60 * 60 * 1000;
  
    // 计算时间差
    const difference = now - timestamp;
  
    // 如果时间差大于 14 天的毫秒数，返回 true，否则返回 false
    return difference > fourteenDaysInMillis;
  }
export { BotObserve } from './botObserve';
