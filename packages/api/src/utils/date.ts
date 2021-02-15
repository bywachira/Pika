export function formatData(date: Date): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return `${months[date.getMonth()]}, ${date.getDate()} ${date.getFullYear()}`;
}