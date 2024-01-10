import Link from 'next/link'
import { useState } from 'react'

export function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenMov, setIsOpenMov] = useState(false)
  const [isOpenRel, setIsOpenRel] = useState(false)

  function toggleMenu() {
    document.getElementById('menu')?.classList.toggle('hidden')
  }

  function toggleSubMenu(type: string) {
    if (type === 'C') {
      setIsOpen(!isOpen)
      const subMenu = document.getElementById('submenucad')
      const subMenuMov = document.getElementById('submenumov')
      // const subMenuRel = document.getElementById('submenurel')
      subMenu?.classList.toggle('hidden')
      subMenuMov?.classList.toggle('hidden')
    }
    if (type === 'M') {
      setIsOpenMov(!isOpenMov)
      const subMenu = document.getElementById('submenumov')
      // const subMenuCad = document.getElementById('submenucad')
      subMenu?.classList.toggle('hidden')
      // subMenuCad?.classList.toggle('hidden')
    }
    if (type === 'R') {
      setIsOpenRel(!isOpenRel)
      const subMenu = document.getElementById('submenurel')
      subMenu?.classList.toggle('hidden')
    }
  }

  return (
    <>
      <div className="flex flex-row justify-center my-2 sm:hidden">
        <button
          onClick={toggleMenu}
          className="text-2xl w-10 hover:text-white rounded-lg transition-all ease-in duration-300"
        >
          &#9776;
        </button>
      </div>
      <nav
        id="menu"
        className="hidden w-full h-full p-2 md:flex md:items-center md:justify-between transition-all ease-in duration-300"
      >
        <ul className="flex flex-col gap-4 md:flex-row w-full">
          <li className="flex justify-center align-center">
            <Link
              href="/"
              className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-500"
            >
              Home
            </Link>
          </li>
          <li
            className="flex flex-col justify-center items-center font-semibold hover:cursor-pointer"
            onClick={() => toggleSubMenu('C')}
          >
            Cadastros &#9660;
            <div
              id="submenucad"
              className="text-center hidden md:absolute md:text-left md:top-[104px] md:left-24 md:border-l-2 md:border-blue-400"
            >
              <ul className="flex flex-col relative mt-2 md:mt-0 md:left-0 gap-2 bg-blue-200 md:w-40">
                <li className="w-screen md:w-auto">
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
              </ul>
            </div>
          </li>
          <li
            className="flex flex-col justify-center items-center font-semibold hover:cursor-pointer"
            onClick={() => toggleSubMenu('M')}
          >
            Movimentações &#9660;
            <div
              id="submenumov"
              className="text-center hidden md:absolute md:text-left md:top-[100px] md:border-l-2 md:border-blue-400"
            >
              <ul className="flex flex-col relative mt-2 md:mt-0 md:left-0 gap-2 bg-blue-200 md:w-40">
                <li className="w-screen md:w-auto">
                  <Link
                    href="/movimentacoes/ativos"
                    className="px-4 py-2 font-semibold hover:text-white transition-all ease-in duration-300"
                  >
                    Ativos
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="flex justify-center align-center">
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
