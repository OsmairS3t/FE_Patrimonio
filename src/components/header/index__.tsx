'use client'

import Link from 'next/link'
import Hamburger from 'hamburger-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleMenu() {
    setIsOpen(!isOpen)
    const menu = document.getElementById('menu')
    menu?.classList.toggle('hidden')
  }

  return (
    <div className="flex flex-col justify-between w-full bg-blue-300 mb-4">
      <h1 className="flex flex-row w-full h-full font-bold text-center text-2xl justify-center items-center">
        Controle de Patrimônio
      </h1>

      <nav className="w-full h-full p-2 bg-blue-300 shadow md:flex md:items-center md:justify-between">
        <div className="md:hidden block">
          <Hamburger size={28} toggled={isOpen} onToggle={toggleMenu} />
        </div>
        <ul
          id="menu"
          className="md:flex md:items-center md:justify-center md:z-auto md:static md:w-auto md:opacity-100 hidden absolute w-full bg-blue-300 left-0 transition-all ease-in duration-500"
        >
          <li className="mx-4 my-6 md:my-0">
            <Link
              onClick={toggleMenu}
              href="/grupos"
              className="text-xl hover:text-white duration-500"
            >
              Grupos
            </Link>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <Link
              onClick={toggleMenu}
              href="/subgrupos"
              className="text-xl hover:text-white duration-500"
            >
              Sub Grupos
            </Link>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <Link
              onClick={toggleMenu}
              href="/marcas"
              className="text-xl hover:text-white duration-500"
            >
              Marcas
            </Link>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <Link
              onClick={toggleMenu}
              href="/centrocusto"
              className="text-xl hover:text-white duration-500"
            >
              Centro de custo
            </Link>
          </li>
          <li className="mx-4 my-6 md:my-0">
            <Link
              onClick={toggleMenu}
              href="/ativos"
              className="text-xl hover:text-white duration-500"
            >
              Ativos
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
