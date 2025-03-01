export function getLocalISOTime() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Convert offset from minutes to milliseconds
    const localISOTime = new Date(now - offset).toISOString().slice(0, -1); // Remove 'Z' since it's not UTC anymore
    return localISOTime + "Z"; // Append 'Z' to indicate ISO format
}

export const getHumanReadableDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';

    return `${year}-${month}-${day} • ${hours}:${minutes} ${ampm}`;
}
