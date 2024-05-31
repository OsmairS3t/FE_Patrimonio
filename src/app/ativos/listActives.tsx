'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { IActives, IMark } from '@/utils/interface'

type Props = {
  pcentrocusto: string
  psubgrupo: string
}

export default function ListActives({ pcentrocusto, psubgrupo }: Props) {
  const [ativos, setAtivos] = useState<IActives[]>([])

  async function handleMark(id: string) {
    const objMark: IMark = await api.get(`marcas/${id}`)
    return objMark.descricao
  }

  // function handleDelete(id: number) {
  //   console.log(id)
  // }

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
        <thead>
          <tr>
            <th
              scope="col"
              className="font-bold border-b-gray-300 border-b-[1px] w-56 text-left"
            >
              Centro Custo
            </th>
            <th
              scope="col"
              className="font-bold border-b-gray-300 border-b-[1px] w-56 text-left"
            >
              Sub Grupo
            </th>
            <th
              scope="col"
              className="font-bold border-b-gray-300 border-b-[1px] w-16 text-left"
            >
              Código
            </th>
            <th
              scope="col"
              className="font-bold border-b-gray-300 border-b-[1px] w-max text-left"
            >
              Descrição
            </th>
            <th
              scope="col"
              className="font-bold border-b-gray-300 border-b-[1px] w-max text-left"
            >
              Marca
            </th>
            <th
              scope="col"
              className="font-bold border-b-gray-300 border-b-[1px] w-max text-left"
            >
              Situação
            </th>
            {/* <th
              scope="col"
              className="font-bold border-b-gray-300 border-b-[1px] w-32 text-left print:hidden"
            >
              Opção
            </th> */}
          </tr>
        </thead>
        <tbody>
          {ativos.map((ativo) => (
            <tr
              key={ativo.id}
              className="odd:bg-gray-100 h-9 hover:bg-gray-200 border-b-[1px] border-b-gray-400 border-dotted"
            >
              <td scope="row" className="text-left">
                {ativo.centrocusto}
              </td>
              <td scope="row" className="text-left">
                {ativo.subgrupo}
              </td>
              <td scope="row" className="text-left font-semibold">
                {ativo.codigo}
              </td>
              <td scope="row" className="text-left">
                {ativo.descricao}
              </td>
              <td scope="row" className="text-left">
                {handleMark(ativo.codmarca.toString())}
              </td>
              <td scope="row" className="text-left">
                {ativo.status}
              </td>
              {/* <td scope="row" className="text-left print:hidden">
                <button onClick={() => handleDelete(ativo.id)}>Excluir</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
