import Link from "next/link";

// Lightweight markdown-ish renderer (h2, h3, p, ul/ol/li, table, code)
// Avoids adding a heavy markdown lib for these structured posts.
export function BlogBody({ body }: { body: string }) {
  const lines = body.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;

  function flushParagraph(buffer: string[]) {
    const text = buffer.join("\n").trim();
    if (!text) return;
    out.push(
      <p key={`p-${out.length}`} className="text-[color:var(--color-fg-soft)] leading-relaxed mb-4">
        {renderInline(text)}
      </p>
    );
  }

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      out.push(<h2 key={`h2-${out.length}`} className="text-2xl font-bold mt-8 mb-3">{renderInline(line.slice(3))}</h2>);
      i++;
    } else if (line.startsWith("### ")) {
      out.push(<h3 key={`h3-${out.length}`} className="text-xl font-bold mt-6 mb-2">{renderInline(line.slice(4))}</h3>);
      i++;
    } else if (line.startsWith("[CODEBLOCK]")) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("[CODEBLOCK]")) {
        buf.push(lines[i]);
        i++;
      }
      i++;
      out.push(
        <pre key={`code-${out.length}`} className="card !p-3 text-sm font-mono whitespace-pre-wrap overflow-x-auto mb-4">
          <code>{buf.join("\n")}</code>
        </pre>
      );
    } else if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      out.push(renderTable(tableLines, out.length));
    } else if (line.startsWith("- ") || line.startsWith("* ") || /^\d+\.\s/.test(line)) {
      const items: string[] = [];
      const ordered = /^\d+\.\s/.test(line);
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* ") || /^\d+\.\s/.test(lines[i]))) {
        items.push(lines[i].replace(/^(-\s|\*\s|\d+\.\s)/, ""));
        i++;
      }
      const Tag = ordered ? "ol" : "ul";
      out.push(
        <Tag key={`l-${out.length}`} className={`${ordered ? "list-decimal" : "list-disc"} list-outside ml-5 space-y-1.5 text-[color:var(--color-fg-soft)] leading-relaxed mb-4`}>
          {items.map((it, k) => <li key={k}>{renderInline(it)}</li>)}
        </Tag>
      );
    } else if (line.trim() === "" || line.startsWith("---")) {
      if (line.startsWith("---")) {
        out.push(<hr key={`hr-${out.length}`} className="my-8 border-[color:var(--color-border)]" />);
      }
      i++;
    } else {
      const buf: string[] = [];
      while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#") && !lines[i].startsWith("|") && !lines[i].startsWith("```") && !lines[i].startsWith("- ") && !lines[i].startsWith("* ") && !/^\d+\.\s/.test(lines[i]) && !lines[i].startsWith("---")) {
        buf.push(lines[i]);
        i++;
      }
      flushParagraph(buf);
    }
  }
  return <>{out}</>;
}

function renderTable(lines: string[], key: number) {
  if (lines.length < 2) return null;
  const parseRow = (l: string) => l.split("|").map((c) => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
  const headers = parseRow(lines[0]);
  const rows = lines.slice(2).map(parseRow);
  return (
    <div key={`tbl-${key}`} className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            {headers.map((h, i) => <th key={i} className="text-left py-2 px-2 font-semibold">{renderInline(h)}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b">
              {r.map((c, j) => <td key={j} className="py-2 px-2 align-top">{renderInline(c)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  let plain = "";
  const len = text.length;
  const flush = () => {
    if (plain) {
      parts.push(<span key={key++}>{plain}</span>);
      plain = "";
    }
  };
  while (i < len) {
    if (text[i] === "[") {
      const closeBracket = text.indexOf("]", i + 1);
      if (closeBracket > -1 && text[closeBracket + 1] === "(") {
        const closeParen = text.indexOf(")", closeBracket + 2);
        if (closeParen > -1) {
          flush();
          const linkText = text.slice(i + 1, closeBracket);
          const url = text.slice(closeBracket + 2, closeParen);
          if (url.startsWith("/") || url.startsWith("#")) {
            parts.push(<Link key={key++} href={url} className="text-[color:var(--color-brand)] hover:underline">{renderInline(linkText)}</Link>);
          } else {
            parts.push(<a key={key++} href={url} target="_blank" rel="noopener" className="text-[color:var(--color-brand)] hover:underline">{renderInline(linkText)}</a>);
          }
          i = closeParen + 1;
          continue;
        }
      }
    }
    if (text[i] === "*" && text[i + 1] === "*") {
      const end = text.indexOf("**", i + 2);
      if (end > -1) {
        flush();
        parts.push(<strong key={key++} className="text-[color:var(--color-fg)]">{text.slice(i + 2, end)}</strong>);
        i = end + 2;
        continue;
      }
    }
    if (text[i] === "`") {
      const end = text.indexOf("`", i + 1);
      if (end > -1) {
        flush();
        parts.push(<code key={key++} className="bg-[color:var(--color-bg-soft)] px-1 py-0.5 rounded text-xs font-mono">{text.slice(i + 1, end)}</code>);
        i = end + 1;
        continue;
      }
    }
    plain += text[i];
    i++;
  }
  flush();
  return <>{parts}</>;
}
