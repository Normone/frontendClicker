export function shortenNumber(number: number): string {
    const suffixes = ["", "K", "M", "B", "T", "Q", "Qi", "S", "Sp"];
    let suffixIndex = 0;
    const sign = number < 0 ? "-" : "";
    number = Math.abs(number); // Берем абсолютное значение

    while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    number /= 1000;
    suffixIndex++;
    }

    return sign + number.toFixed(1) + suffixes[suffixIndex];
}