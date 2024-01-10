import Header from '@/components/header'
import './globals.css'

export const metadata = {
  title: 'Controle de Patrimônio',
  description: 'Controle patrimonial CDL Anápolis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <div className="pl-4 pr-4">{children}</div>
      </body>
    </html>
  )
}
