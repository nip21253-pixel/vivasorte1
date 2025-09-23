import { ReactNode } from 'react'

export const metadata = {
  title: 'Projeto Next',
  description: 'Aplicação Next.js',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}