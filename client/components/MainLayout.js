import Head from "next/head";
import Link from "next/link";

export function MainLayout({children}) {
  return (
    <>
      <Head>
        <title>Smart Design</title>
        <meta charSet="utf-8"/>
      </Head>
      <nav>
        <Link href="/"><a>Все товары</a></Link>
        <Link href="/add-item"><a>Добавить товар</a></Link>
      </nav>
      <main>
        {children}
      </main>
    </>
  )
}

