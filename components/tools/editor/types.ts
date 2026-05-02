export type EditorElement = {
  id: string;
  page: number;
  type: "signature" | "text" | "image";
  xPct: number;
  yPct: number;
  wPct: number;
  hPct: number;
  data: SignatureData | TextData | ImageData;
};

export type SignatureData = { kind: "signature"; dataUrl: string };
export type TextData = { kind: "text"; text: string; fontSize: number; color: string };
export type ImageData = { kind: "image"; dataUrl: string };

export type AnyData = SignatureData | TextData | ImageData;
