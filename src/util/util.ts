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

export const githubGist = (color) => {
  return {
    hljs: {
      display: "block",
      background: "white",
      padding: "0.5em",
      color: color.text,
      overflowX: "auto",
    },
    "hljs-comment": {
      color: "#969896",
    },
    "hljs-meta": {
      color: "#969896",
    },
    "hljs-string": {
      color: "#df5000",
    },
    "hljs-variable": {
      color: "#df5000",
    },
    "hljs-template-variable": {
      color: "#df5000",
    },
    "hljs-strong": {
      color: "#df5000",
    },
    "hljs-emphasis": {
      color: "#df5000",
    },
    "hljs-quote": {
      color: "#df5000",
    },
    "hljs-keyword": {
      color: "#a71d5d",
    },
    "hljs-selector-tag": {
      color: "#a71d5d",
    },
    "hljs-type": {
      color: "#a71d5d",
    },
    "hljs-literal": {
      color: "#0086b3",
    },
    "hljs-symbol": {
      color: "#0086b3",
    },
    "hljs-bullet": {
      color: "#0086b3",
    },
    "hljs-attribute": {
      color: "#0086b3",
    },
    "hljs-section": {
      color: "#63a35c",
    },
    "hljs-name": {
      color: "#63a35c",
    },
    "hljs-tag": {
      color: "#333333",
    },
    "hljs-title": {
      color: "#795da3",
    },
    "hljs-attr": {
      color: "#795da3",
    },
    "hljs-selector-id": {
      color: "#795da3",
    },
    "hljs-selector-class": {
      color: "#795da3",
    },
    "hljs-selector-attr": {
      color: "#795da3",
    },
    "hljs-selector-pseudo": {
      color: "#795da3",
    },
    "hljs-addition": {
      color: "#55a532",
      backgroundColor: "#eaffea",
    },
    "hljs-deletion": {
      color: "#bd2c00",
      backgroundColor: "#ffecec",
    },
    "hljs-link": {
      textDecoration: "underline",
    },
  };
};

export const normalizeString = (string) => {
  return string
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&le;/g, "≤")
    .replace(/&ge;/g, "≥")
    .replace(/&#(\d+);/g, function (m, n) {
      return String.fromCharCode(n);
    });
};
