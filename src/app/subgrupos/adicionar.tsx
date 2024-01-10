'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'

interface Props {
  setIsClose: (isOpen: boolean) => void
}

const subGrupoSchema = z.object({
  codgrupo: z.string(),
  descricao: z
    .string()
    .min(3, { message: 'A descrição deve conter pelo menos 3 caracteres' }),
})

type SubGrupo = z.infer<typeof subGrupoSchema>
type GrupoProps = {
  id: number
  descricao: string
}

export function Adicionar({ setIsClose }: Props) {
  const [grupos, setGrupos] = useState<GrupoProps[]>([])
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SubGrupo>({
    resolver: zodResolver(subGrupoSchema),
  })

  async function handleSubmitSubGroup(data: SubGrupo) {
    await api.post('subgrupos', data)
    alert('Sub-Grupo incluído com sucesso!')
    reset()
    setIsClose(false)
  }

  function handleClose() {
    setIsClose(false)
    reset()
  }

  async function loadGroups() {
    const response = await api.get('grupos')
    setGrupos(response.data)
  }
  useEffect(() => {
    loadGroups()
  }, [])

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-semibold">Incluir Sub Grupo</h2>
        <button
          onClick={handleClose}
          className="px-2 bg-red-500 hover:bg-red-400 text-xl text-white rounded"
        >
          X
        </button>
      </div>

      <form
        onSubmit={handleSubmit(handleSubmitSubGroup)}
        className="flex flex-col gap-4 mt-4 p-4"
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="codgrupo">Grupo:</label>
          <select
            id="codgrupo"
            className="p-2 w-96 rounded border-[1px] border-gray-300 bg-gray-200"
            {...register('codgrupo')}
          >
            {grupos.map((grupo) => (
              <option key={grupo.id} value={grupo.id}>
                {grupo.descricao}
              </option>
            ))}
          </select>
          {errors.codgrupo && (
            <span className="text-red-500 font-light italic">
              {errors.codgrupo.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="descricao">Sub-Grupo:</label>
          <input
            className="p-2 w-96 rounded border-[1px] border-gray-300 bg-gray-200"
            type="text"
            id="descricao"
            placeholder="Nome do Sub-Grupo"
            {...register('descricao')}
          />
          {errors.descricao && (
            <span className="text-red-500 font-light italic">
              {errors.descricao.message}
            </span>
          )}
        </div>
        <button
          className="p-2 rounded text-white w-96 bg-green-600 hover:bg-green-500"
          type="submit"
        >
          Gravar
        </button>
      </form>
    </div>
  )
}
