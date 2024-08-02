'use client'

import { useEffect, useState } from 'react'
import { FiArrowLeft, FiSearch } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'
import { IActives, ICostCenter } from '@/utils/interface'
import { ZeroLeft } from '@/utils/function'
import ReactModal from 'react-modal'
import Notes from '@/components/notes'
import Link from 'next/link'

const schema = z.object({
  codigoAtivo: z
    .string()
    .min(2, { message: 'É necesário informar no mínimo 2 caracteres' }),
})

type SearchProps = {
  codigoAtivo: string
}

export default function MovAtivos() {
  const [isNoteOpen, setIsNoteOpen] = useState(false)
  const [codigo, setCodigo] = useState('')
  const [centroCustos, setCentroCustos] = useState<ICostCenter[]>([])
  const [listStatus, setListStatus] = useState<string[]>([
    'Incluido',
    'Alterado',
    'Baixado',
  ])
  const [search, setSeach] = useState<IActives>()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SearchProps>({
    resolver: zodResolver(schema),
  })

  async function LoadCentroCusto() {
    const response = await api.get('centrocusto')
    setCentroCustos(response.data)
  }

  async function loadSeach(codigo: string) {
    const response = await api.get(`ativos/${codigo}`)
    setSeach(response.data)
  }

  async function handleUpdate(id: number) {
    const st = document.getElementById('status') as HTMLInputElement
    const cc = document.getElementById('centrocusto') as HTMLInputElement
    const data = {
      id,
      status: st.value,
      codcentrocusto: Number(cc.value),
    }
    await api.put('ativos', data)
    // alert('Ativo atualizado com sucesso!' + JSON.stringify(data))
    alert('Ativo atualizado com sucesso!')
  }

  function handleSearch(data: SearchProps) {
    const codigoFormatado = ZeroLeft(data.codigoAtivo, 6)
    setCodigo(codigoFormatado)
    reset()
  }

  function handleOpenNote() {
    setIsNoteOpen(true)
  }

  function handleCloseNote() {
    setIsNoteOpen(false)
  }

  useEffect(() => {
    loadSeach(codigo)
    LoadCentroCusto()
  }, [codigo])

  return (
    <div>
      <div className='flex flex-row justify-start gap-4 items-center mb-4'>
        <Link href="/ativos"><FiArrowLeft size={24} /></Link>
        <h1 className="font-bold text-xl">Movimentação de Ativos</h1>
      </div>

      <form
        onSubmit={handleSubmit(handleSearch)}
        className="flex flex-row justify-start items-center gap-2"
      >
        <label htmlFor="codigoAtivo">Código do Ativo:</label>
        <input
          className="border-[1px] w-28 border-gray-300 pr-2 rounded p-2 bg-gray-100"
          autoFocus={true}
          type="number"
          pattern="[0-9]*"
          id="codigoAtivo"
          placeholder="0000001"
          {...register('codigoAtivo')}
        />
        <button type="submit">
          <FiSearch name="search" size={32} />
        </button>
        {errors.codigoAtivo && (
          <span className="text-red-500 font-light italic">
            {errors.codigoAtivo.message}
          </span>
        )}
      </form>

      <div className="mt-4">
        {
          <table className="w-auto">
            <tr>
              <td className="pr-2 font-semibold">CODIGO:</td>
              <td className="pl-2">{search?.codigo}</td>
            </tr>
            <tr>
              <td className="pr-2 font-semibold">CENTRO DE CUSTO:</td>
              <td className="pl-2">
                <select
                  id="centrocusto"
                  className="p-2 w-full md:w-96 rounded border-[1px] border-gray-300 bg-gray-200"
                >
                  <option value={0}>Selecione..</option>
                  {centroCustos.map((cc) => {
                    if (search?.centrocusto === cc.descricao) {
                      return (
                        <option selected key={cc.id} value={cc.id}>
                          {cc.descricao}
                        </option>
                      )
                    } else {
                      return (
                        <option key={cc.id} value={cc.id}>
                          {cc.descricao}
                        </option>
                      )
                    }
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td className="pr-2 font-semibold">SUB-GRUPO:</td>
              <td className="pl-2">{search?.subgrupo}</td>
            </tr>
            <tr>
              <td className="pr-2 font-semibold">DESCRIÇÃO:</td>
              <td className="pl-2">
                {search?.descricao}
                {/* <br />
                <input
                  className="p-2 w-full md:w-96 border-[1px] border-gray-300 pr-2 rounded bg-gray-100"
                  type="text"
                  id="descricao"
                  placeholder="Descrição"
                  {...register('descricao')}
                /> */}
              </td>
            </tr>
            <tr>
              <td className="pr-2 font-semibold">STATUS:</td>
              <td className="pl-2">
                <select
                  id="status"
                  className="p-2 w-full md:w-96 rounded border-[1px] border-gray-300 bg-gray-200"
                >
                  <option value="">Selecione..</option>
                  {listStatus.map((ls) => {
                    if (search?.status === ls) {
                      return (
                        <option selected key={ls} value={ls}>
                          {ls}
                        </option>
                      )
                    } else {
                      return (
                        <option key={ls} value={ls}>
                          {ls}
                        </option>
                      )
                    }
                  })}
                </select>
              </td>
            </tr>
          </table>
        }
        <div className='flex flex-col lg:flex-row lg:gap-2'>
          <button
            onClick={() => handleUpdate(Number(search?.id))}
            className="mt-4 p-2 rounded text-white w-full lg:w-52 bg-green-600 hover:bg-green-500"
          >
            Alterar
          </button>

          <button
            onClick={handleOpenNote}
            className="mt-4 p-2 rounded text-white w-full lg:w-52 bg-yellow-600 hover:bg-yellow-500"
          >
            Anotações
          </button>
        </div>
      </div>

      <ReactModal isOpen={isNoteOpen} onRequestClose={handleCloseNote}>
        <Notes handleClose={handleCloseNote} />
      </ReactModal>
    </div>
  )
}
