export function buildWhatsAppLink(number: string, message: string): string {
  return `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
}
