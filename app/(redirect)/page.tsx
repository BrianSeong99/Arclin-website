import Link from "next/link";
import Script from "next/script";

/**
 * Root route: pick a locale before paint.
 * Priority: remembered choice (localStorage) -> browser language (ja / en / zh) -> ja.
 */
const detect = `
(function(){
  var k='arclin-locale';var l=null;
  try{l=localStorage.getItem(k)}catch(e){}
  if(l!=='ja'&&l!=='en'&&l!=='zh'){
    var langs=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'ja']);
    l='ja';
    for(var i=0;i<langs.length;i++){var s=String(langs[i]).toLowerCase();
      if(s.indexOf('ja')===0){l='ja';break}
      if(s.indexOf('en')===0){l='en';break}
      if(s.indexOf('zh')===0){l='zh';break}}
  }
  var base=location.pathname.replace(/\\/(index\\.html)?$/,'');
  location.replace(base+'/'+l+'/');
})();`;

export default function RootRedirect() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <Script id="locale-redirect" strategy="beforeInteractive">
        {detect}
      </Script>
      <noscript>
        <p>
          <Link href="/ja/" hrefLang="ja" lang="ja">日本語</Link> · <Link href="/en/" hrefLang="en" lang="en">English</Link> · <Link href="/zh/" hrefLang="zh" lang="zh">中文</Link>
        </p>
      </noscript>
    </main>
  );
}
