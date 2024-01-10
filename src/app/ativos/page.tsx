'use client'

import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import ListActives from './listActives'
import { Adicionar } from './adicionar'
import { api } from '@/lib/axios'
import { ICostCenter, ISubGroups } from '@/utils/interface'
import { FiPrinter } from 'react-icons/fi'

export default function Active() {
  const [isOpenAddNew, setIsOpenAddNew] = useState(false)
  const [centroCustos, setCentroCustos] = useState<ICostCenter[]>([])
  const [subGrupos, setSubGrupos] = useState<ISubGroups[]>([])
  const [codCentroCusto, setCodCentroCusto] = useState('0')
  const [codSubGrupo, setCodSubGrupo] = useState('0')

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

  function handleAddNew() {
    setIsOpenAddNew(true)
  }

  useEffect(() => {
    listCentroCusto()
    listSubGrupos()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-xl">Ativos</h1>
        <div>
          <label htmlFor="codcentrocusto" className="font-semibold text-lg">
            Centro de Custo:
          </label>
          <select
            id="codcentrocusto"
            className="ml-2 mr-8 border-[1px] border-gray-200 p-2 w-52 rounded"
            onChange={handleTurnCentroCusto}
          >
            <option value={0}>Todos</option>
            {centroCustos.map((cc) => (
              <option key={cc.id} value={cc.id}>
                {cc.descricao}
              </option>
            ))}
          </select>
          <label htmlFor="codsubgrupo" className="font-semibold text-lg">
            Sub-Grupo:
          </label>
          <select
            id="codsubgrupo"
            className="ml-2 mr-8 border-[1px] border-gray-100 p-2 w-52 rounded"
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

          <button
            onClick={() => self.print()}
            className="print:hidden ml-2 pt-2 pb-2 pl-3 w-10 h-10 bg-gray-600 text-center text-white font-semibold hover:bg-gray-500 transition-all rounded"
          >
            <FiPrinter />
          </button>
        </div>
      </div>
      <ListActives pcentrocusto={codCentroCusto} psubgrupo={codSubGrupo} />

      <Modal ariaHideApp={false} isOpen={isOpenAddNew}>
        <Adicionar setIsClose={setIsOpenAddNew} />
      </Modal>
    </div>
  )
}
