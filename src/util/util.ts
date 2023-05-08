export const mailFormatValidator =
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export function time_ago(time: string) {
  const date: any = time ? new Date(time) : new Date();
  const now: any = new Date();
  const diffMs = now - date;

  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.round(diffMs / (1000 * 60 * 60 * 24 * 30.44));

  if (diffSeconds < 30) {
    return "agora mesmo";
  } else if (diffSeconds < 60) {
    return `${diffSeconds} segundos atrás`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minutos atrás`;
  } else if (diffHours < 24) {
    return `${diffHours} horas atrás`;
  } else if (diffDays < 30) {
    if (diffDays === 1) return `1 dia atrás`;
    else return `${diffDays} dias atrás`;
  } else if (diffMonths < 1) {
    return "nesse mês";
  } else if (diffMonths === 1) {
    return "1 mês atrás";
  } else {
    return `${diffMonths} meses atrás`;
  }
}
