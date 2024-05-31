'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Modal from 'react-modal'
import ListActives from './listActives'
import { Adicionar } from './adicionar'
import { api } from '@/lib/axios'
import { ICostCenter, ISubGroups } from '@/utils/interface'
import { FiPrinter } from 'react-icons/fi'
import { customStylesModal } from '@/utils/styles'

export default function Active() {
  const [centroCustos, setCentroCustos] = useState<ICostCenter[]>([])
  const [subGrupos, setSubGrupos] = useState<ISubGroups[]>([])
  const [codCentroCusto, setCodCentroCusto] = useState('0')
  const [codSubGrupo, setCodSubGrupo] = useState('0')
  const [isOpen, setIsOpen] = useState(false)

  function handleAddNew() {
    setIsOpen(true)
  }

  function handleTurnCentroCusto(event: any) {
    setCodCentroCusto(event.target.value)
  }

  function handleTurnSubGrupo(event: any) {
    setCodSubGrupo(event.target.value)
  }

  async function listCentroCusto() {
    const response = await api.get('centrocusto')
    setCentroCustos(response.data)
  }

  async function listSubGrupos() {
    const response = await api.get('subgrupos')
    setSubGrupos(response.data)
  }

  useEffect(() => {
    listCentroCusto()
    listSubGrupos()
  }, [])

  return (
    <div>
      <div className="print:hidden flex md:flex-col justify-start mb-4 gap-2">
        <h1 className="font-bold text-xl">ATIVOS:</h1>
        <div className="sm:flex-col">
          <label
            htmlFor="codcentrocusto"
            className="font-semibold text-lg print:hidden"
          >
            Centro de Custo:
          </label>
          <select
            id="codcentrocusto"
            className="ml-2 mr-8 border-[1px] border-gray-200 p-2 w-52 rounded print:hidden"
            onChange={handleTurnCentroCusto}
          >
            <option value={0}>Todos</option>
            {centroCustos.map((cc) => (
              <option key={cc.id} value={cc.id}>
                {cc.descricao}
              </option>
            ))}
          </select>

          <label
            htmlFor="codsubgrupo"
            className="font-semibold text-lg print:hidden"
          >
            Sub-Grupo:
          </label>
          <select
            id="codsubgrupo"
            className="ml-2 mr-8 border-[1px] border-gray-100 p-2 w-52 rounded print:hidden"
            onChange={handleTurnSubGrupo}
          >
            <option value={0}>Todos</option>
            {subGrupos.map((sg) => (
              <option key={sg.id} value={sg.id}>
                {sg.grupo} - {sg.descricao}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddNew}
            className="print:hidden p-2 w-32 h-10 bg-green-600 text-center text-white font-semibold hover:bg-green-500 transition-all rounded"
          >
            + Adicionar
          </button>

          <Link
            href="/movimentacoes/ativos"
            className="print:hidden p-2 mx-4 w-32 h-10 bg-blue-600 text-center text-white font-semibold hover:bg-blue-500 transition-all rounded"
          >
            Movimentações
          </Link>

          <button
            onClick={() => self.print()}
            className="print:hidden ml-2 pt-2 pb-2 pl-3 w-10 h-10 bg-gray-600 text-center text-white font-semibold hover:bg-gray-500 transition-all rounded"
          >
            <FiPrinter />
          </button>
        </div>
      </div>
      <ListActives pcentrocusto={codCentroCusto} psubgrupo={codSubGrupo} />

      <Modal style={customStylesModal} ariaHideApp={false} isOpen={isOpen}>
        <Adicionar setIsClose={setIsOpen} />
      </Modal>
    </div>
  )
}
