"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download } from "lucide-react";

export function QrGenerator() {
  const [text, setText] = useState("https://toolram.com");
  const [size, setSize] = useState(512);
  const [color, setColor] = useState("#0a0a0a");
  const [bg, setBg] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text) return;
    QRCode.toCanvas(canvasRef.current, text, { width: size, margin: 2, color: { dark: color, light: bg } }).catch(() => {});
  }, [text, size, color, bg]);

  function download() {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "toolram-qr.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <div>
          <label className="block text-xs uppercase mb-1">Texto o URL</label>
          <textarea rows={4} className="input" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs uppercase mb-1">Tamaño</label>
            <select className="input" value={size} onChange={(e) => setSize(parseInt(e.target.value))}>
              <option value={256}>256px</option>
              <option value={512}>512px</option>
              <option value={1024}>1024px</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase mb-1">Color</label>
            <input type="color" className="input !p-1 h-10" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs uppercase mb-1">Fondo</label>
            <input type="color" className="input !p-1 h-10" value={bg} onChange={(e) => setBg(e.target.value)} />
          </div>
        </div>
        <button onClick={download} className="btn btn-primary w-full"><Download className="w-4 h-4" /> Descargar PNG</button>
      </div>
      <div className="card flex items-center justify-center !p-4">
        <canvas ref={canvasRef} className="max-w-full h-auto" />
      </div>
    </div>
  );
}
