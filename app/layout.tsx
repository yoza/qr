import React from 'react'
import '@/app/globals.css'
import styles from '@/app/layout.module.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/lib/providers'
import clsx from 'clsx'
import ThemeProvider from './theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Рецепты на салфетках | Qrecipes',
  description: 'Сайт для любителей повозиться на кухне. Рецепты готовки здоровой и вкусной пищи.',
}

export default async function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <head></head>
        <body className={clsx('h-full', inter.className)}>
          <ThemeProvider>
            <section className={styles.container}>
              <header className={clsx("bg-recipe-brown sticky top-0", styles.header)}>
                <Header />
              </header>
              <main className={styles.main}>{props.children}</main>
              <footer className={styles.footer}><Footer /></footer>
            </section>
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  )
}
