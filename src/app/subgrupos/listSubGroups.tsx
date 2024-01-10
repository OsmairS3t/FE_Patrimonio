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

  async function handleDeleteSubGrupo(id: number) {
    await api.delete(`subgrupos/${id}`)
    alert(`Excluido com sucesso!`)
    loadSubGrupos()
  }

  useEffect(() => {
    loadSubGrupos()
  }, [])

  return (
    <table className="w-full border-[-1] border-gray-600">
      <thead>
        <th className="w-52 text-left">Grupo</th>
        <th className="w-32 text-left">Cod.Sub</th>
        <th className="w-max text-left">Subgrupo</th>
        <th className="w-32 text-left">Opção</th>
      </thead>
      <tbody>
        {subGrupos.map((subgrupo) => (
          <tr
            key={subgrupo.id}
            className="odd:bg-gray-100 h-9 hover:bg-gray-200"
          >
            <td>{subgrupo.grupo}</td>
            <td>{subgrupo.id}</td>
            <td>{subgrupo.descricao}</td>
            <td>
              <button onClick={() => handleDeleteSubGrupo(subgrupo.id)}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
