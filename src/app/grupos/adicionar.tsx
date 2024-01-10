'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/axios'

interface Props {
  setIsClose: (isOpen: boolean) => void
}

const grupoSchema = z.object({
  descricao: z
    .string()
    .min(3, { message: 'A descrição deve conter pelo menos 3 caracteres' }),
})

type Grupo = z.infer<typeof grupoSchema>

export function Adicionar({ setIsClose }: Props) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Grupo>({
    resolver: zodResolver(grupoSchema),
  })

  async function handleSubmitGroup(data: Grupo) {
    await api.post('grupos', data)
    alert('Grupo incluído com sucesso!')
    reset()
    setIsClose(false)
  }

  function handleClose() {
    setIsClose(false)
    reset()
  }

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-semibold">Incluir Grupo</h2>
        <button
          onClick={handleClose}
          className="px-2 bg-red-500 hover:bg-red-400 text-xl text-white rounded"
        >
          X
        </button>
      </div>

      <form
        onSubmit={handleSubmit(handleSubmitGroup)}
        className="flex flex-col gap-4 mt-4"
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="descricao">Grupo:</label>
          <input
            className="p-2 w-96 rounded border-[1px] border-gray-300 bg-gray-200"
            type="text"
            id="descricao"
            placeholder="Nome do Grupo"
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
