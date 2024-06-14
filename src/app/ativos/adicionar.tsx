'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { IActive, ICostCenter, IMark, ISubGroups } from '@/utils/interface'
import { api } from '@/lib/axios'

const activeSchema = z.object({
  codigo: z.string(),
  status: z.string(),
  descricao: z.string(),
  aquisicao: z.string(),
  valor_aquisicao: z.string(),
  valor_atual: z.string(),
  depreciacao: z.string(),
  codsubgrupo: z.string(),
  codcentrocusto: z.string(),
  codmarca: z.string(),
})

interface Props {
  setIsCloseActive: (isOpen: boolean) => void
}

export function Adicionar({ setIsCloseActive }: Props) {
  // const [subGrupo, setSubGrupo] = useState(0)
  // const [cCusto, setCCusto] = useState(0)
  const [subGrupos, setSubGrupos] = useState<ISubGroups[]>([])
  const [centroCusto, setCentroCusto] = useState<ICostCenter[]>([])
  const [marcas, setMarcas] = useState<IMark[]>([])
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<IActive>({
    resolver: zodResolver(activeSchema),
  })

  function handleClose() {
    setIsCloseActive(false)
    reset()
  }

  async function handleSubmitActive(data: IActive) {
    // setSubGrupo(data.codsubgrupo)
    // setCCusto(data.codcentrocusto)
    const dataFormatted = {
      codigo: data.codigo,
      status: data.status,
      descricao: data.descricao,
      aquisicao: data.aquisicao,
      valor_aquisicao: data.valor_aquisicao,
      valor_atual: data.valor_atual,
      depreciacao: data.depreciacao,
      codsubgrupo: Number(data.codsubgrupo),
      codcentrocusto: Number(data.codcentrocusto),
      codmarca: Number(data.codmarca),
    }

    await api.post('ativos', dataFormatted)
    // console.log(dataFormatted)
    // document.getElementById('codigo')?.focus()
    alert('Ativo incluído com sucesso!')
    reset()
    setIsCloseActive(false)
  }

  async function LoadSubGroup() {
    const response = await api.get('subgrupos')
    setSubGrupos(response.data)
    // console.log(subGrupos)
  }

  async function LoadCentroCusto() {
    const response = await api.get('centrocusto')
    setCentroCusto(response.data)
    // console.log(centroCusto)
  }

  async function LoadMarcas() {
    const response = await api.get('marcas')
    setMarcas(response.data)
    // console.log(marcas)
  }

  useEffect(() => {
    LoadSubGroup()
    LoadCentroCusto()
    LoadMarcas()
  }, [])

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-semibold">Incluir Ativos</h2>
        <button
          type='button'
          onClick={handleClose}
          className="px-2 bg-red-500 hover:bg-red-400 text-xl text-white rounded"
        >
          X
        </button>
      </div>

      <form
        onSubmit={handleSubmit(handleSubmitActive)}
        className="flex flex-row flex-wrap gap-4 mt-4 p-4 border-2"
      >
        <div className="flex flex-row gap-4 w-full flex-wrap">
          <div className="flex flex-col gap-2 w-96 md:full">
            <label htmlFor="codsubgrupo">Grupo - Sub Grupo:</label>
            <select
              id="codsubgrupo"
              className="p-2 w-full md:w-96 rounded border-[1px] border-gray-300 bg-gray-200"
              {...register('codsubgrupo')}
            >
              <option value={0}>Selecione..</option>
              {subGrupos.map((sg) => (
                <option
                  key={sg.id}
                  value={sg.id}
                >{`${sg.grupo} - ${sg.descricao}`}</option>
              ))}
            </select>
            {errors.codsubgrupo && (
              <span className="text-red-500 font-light italic">
                {errors.codsubgrupo.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-96 md:full">
            <label htmlFor="centrocusto">Centro Custo:</label>
            <select
              id="centrocusto"
              className="p-2 w-full md:w-96 rounded border-[1px] border-gray-300 bg-gray-200"
              {...register('codcentrocusto')}
            >
              <option value={0}>Selecione..</option>
              {centroCusto.map((cc) => (
                <option key={cc.id} value={cc.id}>
                  {cc.descricao}
                </option>
              ))}
            </select>
            {errors.codcentrocusto && (
              <span className="text-red-500 font-light italic">
                {errors.codcentrocusto.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-96 md:full">
            <label htmlFor="codmarca">Marca:</label>
            <select
              id="codmarca"
              className="p-2 w-full md:w-96 rounded border-[1px] border-gray-300 bg-gray-200"
              {...register('codmarca')}
            >
              <option value={0}>Selecione..</option>
              {marcas.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.descricao}
                </option>
              ))}
            </select>
            {errors.codmarca && (
              <span className="text-red-500 font-light italic">
                {errors.codmarca.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-4 w-full flex-wrap">
          <div className="flex flex-col gap-2 w-52">
            <label htmlFor="codigo">Código:</label>
            <input
              className="p-2 w-52 rounded border-[1px] border-gray-300 bg-gray-200"
              type="text"
              autoFocus={true}
              id="codigo"
              placeholder="Código"
              {...register('codigo')}
            />
            {errors.codigo && (
              <span className="text-red-500 font-light italic">
                {errors.codigo.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-52">
            <label htmlFor="status">Status:</label>
            <input
              className="p-2 w-52 rounded border-[1px] border-gray-300 bg-gray-200"
              type="text"
              id="status"
              placeholder="Status"
              {...register('status')}
            />
            {errors.status && (
              <span className="text-red-500 font-light italic">
                {errors.status.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-96">
            <label htmlFor="descricao">Descrição:</label>
            <input
              className="p-2 w-96 rounded border-[1px] border-gray-300 bg-gray-200"
              type="text"
              id="descricao"
              placeholder="Descrição"
              {...register('descricao')}
            />
            {errors.descricao && (
              <span className="text-red-500 font-light italic">
                {errors.descricao.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-4 w-full flex-wrap">
          <div className="flex flex-col gap-2 w-52">
            <label htmlFor="aquisicao">Aquisição:</label>
            <input
              className="p-2 w-52 rounded border-[1px] border-gray-300 bg-gray-200"
              type="text"
              id="aquisicao"
              placeholder="dd/mm/aaaa"
              {...register('aquisicao')}
            />
            {errors.aquisicao && (
              <span className="text-red-500 font-light italic">
                {errors.aquisicao.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-52">
            <label htmlFor="valor_aquisicao">Vlr. Aquisição:</label>
            <input
              className="p-2 w-52 rounded border-[1px] border-gray-300 bg-gray-200"
              type="text"
              id="valor_aquisicao"
              placeholder="0,00"
              {...register('valor_aquisicao')}
            />
            {errors.valor_aquisicao && (
              <span className="text-red-500 font-light italic">
                {errors.valor_aquisicao.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-52">
            <label htmlFor="valor_atual">Vlr. Atual:</label>
            <input
              className="p-2 w-52 rounded border-[1px] border-gray-300 bg-gray-200"
              type="text"
              id="valor_atual"
              placeholder="0,00"
              {...register('valor_atual')}
            />
            {errors.valor_atual && (
              <span className="text-red-500 font-light italic">
                {errors.valor_atual.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 w-52">
            <label htmlFor="depreciacao">Depreciação:</label>
            <input
              className="p-2 w-40 rounded border-[1px] border-gray-300 bg-gray-200"
              type="text"
              id="depreciacao"
              placeholder="0"
              {...register('depreciacao')}
            />
            {errors.depreciacao && (
              <span className="text-red-500 font-light italic">
                {errors.depreciacao.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full justify-center items-center">
          <button
            className="p-2 rounded text-white w-52 bg-green-600 hover:bg-green-500"
            type="submit"
          >
            Gravar
          </button>
        </div>
      </form>
    </div>
  )
}
