'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { IGroups } from '@/utils/interface'

export default function ListGroups() {
  const [grupos, setGrupos] = useState<IGroups[]>([])

  async function loadGrupos() {
    const response = await api.get('grupos')
    setGrupos(response.data)
  }

  async function handleDelete(id: number) {
    await api.delete(`grupos/${id}`)
    alert(`Excluido com sucesso!`)
    loadGrupos()
  }

  useEffect(() => {
    loadGrupos()
  }, [])

  return (
    <table className="w-full border-[-1] border-gray-600">
      <thead>
        <th className="w-10 text-left">Cod.</th>
        <th className="w-max text-left">Grupo</th>
        <th className="w-32 text-left">Opção</th>
      </thead>
      <tbody>
        {grupos.map((grupo) => (
          <tr key={grupo.id} className="odd:bg-gray-100 h-9 hover:bg-gray-200">
            <td>{grupo.id}</td>
            <td>{grupo.descricao}</td>
            <td>
              <button onClick={() => handleDelete(grupo.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
