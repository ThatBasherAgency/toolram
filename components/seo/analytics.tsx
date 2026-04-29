import Script from "next/script";

export const GA_ID = "G-TQ1B5S820Q";

export function Analytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', {
  anonymize_ip: true,
  cookie_flags: 'SameSite=None;Secure'
});`}
      </Script>
    </>
  );
}
