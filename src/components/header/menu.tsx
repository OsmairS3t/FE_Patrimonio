import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

export function Menu() {
  const [open, setOpen] = useState(true)

  function toglleMenu() {
    const mnu = document.getElementById('menu')
    mnu?.classList.toggle('hidden')
    setOpen(!open)
  }

  return (
    <>
      <div className="flex flex-row justify-center my-2 print:hidden">
        <button
          onClick={toglleMenu}
          className="sm:hidden text-2xl w-10 hover:text-white rounded-lg transition-all ease-in duration-300"
        >
          <span id="btnMenu">{open ? <FiMenu /> : <FiX />}</span>
        </button>
      </div>

      <nav
        id="menu"
        className="print:hidden md:print:hidden hidden w-full h-full p-2 md:flex md:items-center md:justify-between transition-all ease-in duration-300"
      >
        <ul className="flex flex-col gap-4 md:flex-row w-full">
          <li>
            <Link
              onClick={toglleMenu}
              href="/"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={toglleMenu}
              href="/grupos"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-300"
            >
              Grupos
            </Link>
          </li>
          <li>
            <Link
              onClick={toglleMenu}
              href="/subgrupos"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-300"
            >
              Sub-Grupos
            </Link>
          </li>
          <li>
            <Link
              onClick={toglleMenu}
              href="/marcas"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-300"
            >
              Marcas
            </Link>
          </li>
          <li>
            <Link
              onClick={toglleMenu}
              href="/centrocusto"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-300"
            >
              Centro de custo
            </Link>
          </li>
          <li>
            <Link
              onClick={toglleMenu}
              href="/ativos"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-300"
            >
              Ativos
            </Link>
          </li>
          <li>
            <Link
              onClick={toglleMenu}
              href="/relatorios"
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
