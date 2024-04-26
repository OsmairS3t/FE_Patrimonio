'use client'

// import { Menu2 } from './menu2'
import { Menu } from './menu'

export default function Header() {
  // const [isOpen, setIsOpen] = useState(false)

  // function toggleMenu() {
  //   setIsOpen(!isOpen)
  //   const menu = document.getElementById('menu')
  //   menu?.classList.toggle('hidden')
  // }

  return (
    <div className="flex flex-col justify-between w-full bg-blue-300 mb-4">
      <h1 className="flex flex-row w-full h-full font-bold bg-blue-400 py-2 text-center text-2xl justify-center items-center">
        Controle de Patrimônio
      </h1>

      <Menu />
    </div>
  )
}
