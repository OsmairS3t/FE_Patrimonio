'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { ICostCenter } from '@/utils/interface'

export default function ListCentroCusto() {
  const [centroCusto, setCentroCustos] = useState<ICostCenter[]>([])

  async function loadCentroCustos() {
    const response = await api.get('centrocusto')
    setCentroCustos(response.data)
  }

  // async function handleDelete(id: number) {
  //   await api.delete(`centrocusto/${id}`)
  //   alert(`Excluido com sucesso!`)
  //   loadCentroCustos()
  // }

  useEffect(() => {
    loadCentroCustos()
  }, [])

  return (
    <table className="w-full border-[-1] border-gray-600">
      <thead>
        <tr>
          <th scope="col" className="w-10 text-left">
            Cod.
          </th>
          <th scope="col" className="w-max text-left">
            Centro custo
          </th>
          {/* <th scope="col" className="w-32 text-left">
            Opção
          </th> */}
        </tr>
      </thead>
      <tbody>
        {centroCusto.map((cc) => (
          <tr key={cc.id} className="odd:bg-gray-100 h-9 hover:bg-gray-200">
            <td scope="row">{cc.id}</td>
            <td scope="row">{cc.descricao}</td>
            {/* <td scope="row">
              <button onClick={() => handleDelete(cc.id)}>Excluir</button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
