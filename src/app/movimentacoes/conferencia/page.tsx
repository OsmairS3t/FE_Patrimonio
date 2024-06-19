'use client'

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi'
import { IActive, ICostCenter } from '@/utils/interface';

export default function ConfAtivos() {
  const [centroCustos, setCentroCustos] = useState<ICostCenter[]>([])
  const [codCentroCusto, setCodCentroCusto] = useState('0')
  const [ativos, setAtivos] = useState<IActive[]>([])

  async function handleTurnCentroCusto(id:string) {
    setCodCentroCusto(id)
    const response = await api.get(`ativos/listactive/${id}`)
    if(response.data) {
      setAtivos(response.data)
    }
  }

  async function listCentroCusto() {
    const response = await api.get('centrocusto')
    setCentroCustos(response.data)
  }

  async function updateActive(id: string, isFound: boolean) {
    const encontradoStr = !isFound
    const data = {
      encontrado: String(encontradoStr),
    }
    try {
      await api.put(`ativos/${id}`, data)
      handleTurnCentroCusto(codCentroCusto)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    listCentroCusto()
  }, [])

  return (
    <div>
      <div className='flex flex-row justify-between items-center mb-4'>
        <h1 className="font-bold text-xl">Conferencia de Ativos</h1>
        <Link href="/ativos"><FiArrowLeft size={28} /></Link>
      </div>

      <select
        id="codcentrocusto"
        className="border-[1px] border-gray-200 p-2 w-full lg:w-52 rounded print:hidden"
        onChange={(e) => handleTurnCentroCusto(e.target.value)}
      >
        <option value={0}>Todos</option>
        {centroCustos.map((cc) => (
          <option key={cc.id} value={cc.id}>
            {cc.descricao}
          </option>
        ))}
      </select>
      
      <div className='flex flex-col gap-2 my-2 p-2 '>
        { ativos &&
          ativos.map(a => (
          <div key={a.id} className='flex flex-row gap-2 pb-2 border-b-2 border-b-slate-100'>
            <input 
              type='checkbox' 
              onChange={() => updateActive(String(a.id), a.encontrado)}
              checked={a.encontrado}
              value={a.id} 
            />
            <label className='ml-2'>{a.codigo} - {a.descricao}</label>
          </div>
        ))}
      </div>

    </div>
  )
}