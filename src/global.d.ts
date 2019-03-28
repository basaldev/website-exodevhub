declare module '*.svg' {
  const fileName: string;
  export = fileName;
}

declare module '*.png' {
  const fileName: string;
  export = fileName;
}

declare module '*.jpg' {
  const fileName: string;
  export = fileName;
}

declare global {
  interface Window { MyNamespace: any; }
}

window.location = window.MyNamespace || {};