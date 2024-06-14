import { api } from "@/lib/axios";
import { ICostCenter, INote } from "@/utils/interface";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { FiTrash2 } from "react-icons/fi";

interface Props{
  handleClose: () => void;
}

const schemaNote = z.object({
  active: z.string(),
  costcenter: z.string(),
  obs: z.string()
})

type typeNote = z.infer<typeof schemaNote>

export default function Notes({ handleClose }: Props) {
  const [listNotes, setListNotes] = useState<INote[]>([])
  const [centroCustos, setCentroCustos] = useState<ICostCenter[]>([])
  const { register, handleSubmit, reset } = useForm<typeNote>({
    resolver: zodResolver(schemaNote)
  })

  async function LoadNotes() {
    const response = await api.get('notes')
    setListNotes(response.data)
  }

  async function LoadCentroCusto() {
    const response = await api.get('centrocusto')
    setCentroCustos(response.data)
  }

  async function handleSubmitNote(formData: typeNote) {
    const data = {
      costcenterorigin: Number(formData.costcenter),
      active: formData.active,
      obs: formData.obs
    }
    await api.post('notes', data)
    alert('Anotação incluída com sucesso!')
    LoadNotes()
    reset()
  }

  async function handleDelete(id: number) {
    await api.delete(`notes/${id}`)
    alert('Anotação excluída com sucesso!')
    LoadNotes()
  }

  useEffect(() => {
    LoadCentroCusto()
    LoadNotes()
  },[])

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="font-bold">ANOTAÇÕES</h1>
        <button onClick={handleClose} className="w-10 h-10 p-2 bg-red-500 hover:bg-red-400 transition-all rounded-md text-white font-semibold">
          X
        </button>
      </div>

      <form onSubmit={handleSubmit(handleSubmitNote)}
        className="flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2"
      >
        <label htmlFor="codigoAtivo">Código do Ativo:</label>
        <input
          className="border-[1px] w-28 border-gray-300 pr-2 rounded p-2 bg-gray-100"
          autoFocus={true}
          type="text"
          id="codigoAtivo"
          placeholder="0000001"
          {...register('active')}
        />

        <label>Onde está:</label>
        <select id="costcenter"
          className="p-2 w-full md:w-96 rounded border-[1px] border-gray-300 bg-gray-200"
          {...register('costcenter')}
        >
          <option value={0}>Selecione..</option>
          {centroCustos.map((cc) => {
            return (
              <option key={cc.id} value={cc.id}>
                {cc.descricao}
              </option>
            )
          })}
        </select> 

        <label>Observação:</label>
        <input 
          className="border-[1px] w-full h-10 rounded-md"
          type='text' 
          id='obs' 
          {...register('obs')}
        />

        <button 
          type="submit" 
          className="mt-4 ml-4 p-2 w-full rounded text-white lg:w-52 bg-blue-600 hover:bg-blue-500"
        >
          Salvar
        </button>
      </form>

      {listNotes.map(note => (
        <div key={note.id} className="flex flex-row justify-between border-[1px] rounded-sm">
          <ul className='flex-1 list-none mt-2 p-2'>
            <li>{note.active}</li>
            <li>{note.centrocusto}</li>
            <li>{note.obs}</li>
          </ul>
          <button 
            className="ml-2 p-4 rounded-md "
            onClick={() => handleDelete(note.id)}
          >
            <FiTrash2 />
          </button>
        </div>
      ))}

    </div>
  )
}