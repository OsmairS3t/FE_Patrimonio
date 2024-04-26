import Link from 'next/link'
import { useState } from 'react'

export function Menu() {
  const [isOpen, setIsOpen] = useState(true)

  function toglleMenu() {
    const menu = document.querySelector('#btnMenu')
    setIsOpen(!isOpen)
    isOpen ? (menu.innerHTML = 'X') : (menu.innerHTML = '&#9776;')
    document.getElementById('menu')?.classList.toggle('hidden')
  }

  return (
    <>
      <div className="flex flex-row justify-center my-2 sm:hidden">
        <button
          onClick={toglleMenu}
          className="text-2xl w-10 hover:text-white rounded-lg transition-all ease-in duration-300"
        >
          <span id="btnMenu">&#9776;</span>
        </button>
      </div>
      <nav
        id="menu"
        className="hidden w-full h-full p-2 md:flex md:items-center md:justify-between transition-all ease-in duration-300"
      >
        <ul className="flex flex-col gap-4 md:flex-row w-full">
          <li>
            <Link
              href="/"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/grupos"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-300"
            >
              Grupos
            </Link>
          </li>
          <li>
            <Link
              href="/subgrupos"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-300"
            >
              Sub-Grupos
            </Link>
          </li>
          <li>
            <Link
              href="/marcas"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-300"
            >
              Marcas
            </Link>
          </li>
          <li>
            <Link
              href="/centrocusto"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-300"
            >
              Centro de custo
            </Link>
          </li>
          <li>
            <Link
              href="/ativos"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-300"
            >
              Ativos
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-300"
            >
              Relatórios
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
