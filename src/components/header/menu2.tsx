import Link from 'next/link'

export function Menu2() {
  function toggleMenu() {
    document.getElementById('menu')?.classList.toggle('hidden')
  }

  function toggleSubMenuCad() {
    document.getElementById('submenucad')?.classList.toggle('hidden')
  }

  function toggleSubMenuMov() {
    document.getElementById('submenumov')?.classList.toggle('hidden')
  }

  return (
    <>
      <div className="print:hidden flex flex-row justify-center my-2 sm:hidden">
        <button
          onClick={toggleMenu}
          className="text-2xl w-10 hover:text-white rounded-lg transition-all ease-in duration-300"
        >
          &#9776;
        </button>
      </div>
      <nav id="menu" className="print:hidden">
        <ul className="md:flex md:flex-row md:justify-start md:items-start md:gap-4 md:p-2 flex flex-col justify-center items-center gap-2 p-2">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li className="hover:cursor-pointer" onClick={toggleSubMenuCad}>
            Cadastros &#8595;
            <ul
              id="submenucad"
              className="hidden absolute z-10 w-40 top-[89px]"
            >
              <li className="bg-blue-200 w-full p-2 hover:bg-blue-300">
                <Link href="/grupos">Grupos</Link>
              </li>
              <li className="bg-blue-200 w-full p-2 hover:bg-blue-300">
                <Link href="/subgrupos">Sub-Grupos</Link>
              </li>
              <li className="bg-blue-200 w-full p-2 hover:bg-blue-300">
                <Link href="/marcas">Marcas</Link>
              </li>
              <li className="bg-blue-200 w-full p-2 hover:bg-blue-300">
                <Link href="/centrocusto">Centro de custo</Link>
              </li>
              <li className="bg-blue-200 w-full p-2 hover:bg-blue-300">
                <Link href="/ativos">Ativos</Link>
              </li>
            </ul>
          </li>
          <li className="hover:cursor-pointer" onClick={toggleSubMenuMov}>
            Movimentações &#8595;
            <ul
              id="submenumov"
              className="hidden absolute z-10 w-40 top-[89px]"
            >
              <li className="bg-blue-200 w-full p-2 hover:bg-blue-300">
                <Link href="/movimentacoes/ativos">Ativos</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/">Relatórios</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
