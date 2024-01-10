'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { IActives } from '@/utils/interface'

type Props = {
  pcentrocusto: string
  psubgrupo: string
}

export default function ListActives({ pcentrocusto, psubgrupo }: Props) {
  const [ativos, setAtivos] = useState<IActives[]>([])

  function handleDelete(id: number) {
    console.log(id)
  }

  async function loadAtivos(codcentrocusto: string, codsubgrupo: string) {
    const response = await api.get(
      `ativos/list/${codcentrocusto}/${codsubgrupo}`,
    )
    setAtivos(response.data)
  }

  useEffect(() => {
    loadAtivos(pcentrocusto, psubgrupo)
  }, [pcentrocusto, psubgrupo])

  return (
    <>
      <table className="w-full border-[-1] border-gray-600">
        <tr>
          <td className="font-bold border-b-gray-300 border-b-[1px] w-56 text-left">
            Centro Custo
          </td>
          <td className="font-bold border-b-gray-300 border-b-[1px] w-56 text-left">
            Sub Grupo
          </td>
          <td className="font-bold border-b-gray-300 border-b-[1px] w-16 text-left">
            Código
          </td>
          <td className="font-bold border-b-gray-300 border-b-[1px] w-max text-left">
            Descrição
          </td>
          <td className="font-bold border-b-gray-300 border-b-[1px] w-max text-left">
            Situação
          </td>
          <td className="font-bold border-b-gray-300 border-b-[1px] w-32 text-left">
            Opção
          </td>
        </tr>
        {ativos.map((ativo) => (
          <tr key={ativo.id} className="odd:bg-gray-100 h-9 hover:bg-gray-200">
            <td className="text-left">{ativo.centrocusto}</td>
            <td className="text-left">{ativo.subgrupo}</td>
            <td className="text-left font-semibold">{ativo.codigo}</td>
            <td className="text-left">{ativo.descricao}</td>
            <td className="text-left">{ativo.status}</td>
            <td className="text-left">
              <button onClick={() => handleDelete(ativo.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </table>
    </>
  )
}
