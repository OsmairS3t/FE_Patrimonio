'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { ISubGroups } from '@/utils/interface'

export default function ListSubGroups() {
  const [subGrupos, setSubGrupos] = useState<ISubGroups[]>([])

  async function loadSubGrupos() {
    const response = await api.get('subgrupos')
    setSubGrupos(response.data)
  }

  // async function handleDeleteSubGrupo(id: number) {
  //   await api.delete(`subgrupos/${id}`)
  //   alert(`Excluido com sucesso!`)
  //   loadSubGrupos()
  // }

  useEffect(() => {
    loadSubGrupos()
  }, [])

  return (
    <table className="w-full border-[-1] border-gray-600">
      <thead>
        <tr>
          <th scope="col" className="w-52 text-left">
            Grupo
          </th>
          <th scope="col" className="w-32 text-left">
            Cod.Sub
          </th>
          <th scope="col" className="w-max text-left">
            Subgrupo
          </th>
          {/* <th scope="col" className="w-32 text-left">
            Opção
          </th> */}
        </tr>
      </thead>
      <tbody>
        {subGrupos.map((subgrupo) => (
          <tr
            key={subgrupo.id}
            className="odd:bg-gray-100 h-9 hover:bg-gray-200"
          >
            <td scope="row">{subgrupo.grupo}</td>
            <td scope="row">{subgrupo.id}</td>
            <td scope="row">{subgrupo.descricao}</td>
            {/* <td scope="row">
              <button onClick={() => handleDeleteSubGrupo(subgrupo.id)}>
                Excluir
              </button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
