export default function getCorrectDate(date: string): string {
    return date.split("-").reverse().join(".");
}
