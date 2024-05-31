'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { IMark } from '@/utils/interface'

export default function ListMarks() {
  const [Marcas, setMarcas] = useState<IMark[]>([])

  async function loadMarcas() {
    const response = await api.get('marcas')
    setMarcas(response.data)
  }

  // async function handleDelete(id: number) {
  //   await api.delete(`marcas/${id}`)
  //   alert(`Excluido com sucesso!`)
  //   loadMarcas()
  // }

  useEffect(() => {
    loadMarcas()
  }, [])

  return (
    <table className="w-full border-[-1] border-gray-600">
      <thead>
        <tr>
          <th scope="col" className="w-10 text-left">
            Cod.
          </th>
          <th scope="col" className="w-max text-left">
            Marca
          </th>
          {/* <th scope="col" className="w-32 text-left">
            Opção
          </th> */}
        </tr>
      </thead>
      <tbody>
        {Marcas.map((marca) => (
          <tr key={marca.id} className="odd:bg-gray-100 h-9 hover:bg-gray-200">
            <td scope="row">{marca.id}</td>
            <td scope="row">{marca.descricao}</td>
            {/* <td scope="row">
              <button onClick={() => handleDelete(marca.id)}>Excluir</button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
