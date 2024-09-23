'use client'

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { ICostCenter } from '@/utils/interface';
import Modal from 'react-modal'
import RelCostCenter from './relCostCenter';

export type RelProps = {
  centrocusto: string;
  tipo: number;
}

export default function Relatorios() {
  const [centroCustos, setCentroCustos] = useState<ICostCenter[]>([])
  const [objRel, setObjRel] = useState<RelProps>({
    centrocusto: '',
    tipo: 0
  })
  const [isOpen, setIsOpen] = useState(false)
  const styleModal = {
    content: {
      width: '60%',
      height: '70%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

  function closeModal() {
    setIsOpen(false)
  }

  async function LoadCentroCusto() {
    const response = await api.get('centrocusto')
    setCentroCustos(response.data)
  }

  function handleListForCC() {
    event?.preventDefault()
    const centrocusto = document.getElementById('centrocusto')  as HTMLSelectElement
    const tipo = document.getElementById('tipo')  as HTMLSelectElement
    setObjRel({
      centrocusto: centrocusto.value,
      tipo: Number(tipo.value)
    })
    setIsOpen(true)
  }

  useEffect(() => {
    LoadCentroCusto()
  },[])

  return (
    <div>
      <h2>Relatorios</h2>
      <div className='my-2 w-1/4 p-6 rounded-lg border-[1px] border-slate-100 hover:border-[1px] hover:border-slate-300 hover:shadow-xl'>
        <h2 className='font-semibold mb-2'>Ativos Por Centro de Custo:</h2>
        <form>
          <div className='flex flex-row flex-wrap gap-2'>
            <select id="centrocusto" name="centrocusto" className="p-2 w-full md:w-96 rounded border-[1px] border-gray-300 bg-gray-200"> 
              <option value={0}>Centro de custo</option>
              {centroCustos.map((cc) => (
                <option key={cc.id} value={cc.id}>{cc.descricao}</option>
              ))}
            </select>

            <select id='tipo' name='tipo' className="p-2 w-full md:w-96 rounded border-[1px] border-gray-300 bg-gray-200">
              <option value={0}>Tipo</option>
              <option value={1}>Analitico</option>
              <option value={2}>Sintético</option>
            </select>

            <button type='submit' onClick={handleListForCC} className='w-40 p-2 bg-blue-500 hover:bg-blue-600 transition:all font-semibold text-white rounded'>
                Listar
            </button>
          </div>
        </form>
      </div>

      <div className='my-2 w-1/4 p-6 rounded-lg border-[1px] border-slate-100 hover:border-[1px] hover:border-slate-300 hover:shadow-xl'>
        <h2 className='font-semibold mb-2'>Ativos encontrados na conferência:</h2>
        <form>
          <div className='flex flex-row flex-wrap gap-2'>
            <select id='tipo' name='tipo' className="p-2 w-full md:w-96 rounded border-[1px] border-gray-300 bg-gray-200">
              <option value={0}>Tipo</option>
              <option value={1}>Analitico</option>
              <option value={2}>Sintético</option>
            </select>

            <button type='submit' onClick={handleListForCC} className='w-40 p-2 bg-blue-500 hover:bg-blue-600 transition:all font-semibold text-white rounded'>
                Listar
            </button>
          </div>
        </form>
      </div>

      <Modal 
        isOpen={isOpen}
        ariaHideApp={false} 
        onRequestClose={closeModal}
        style={styleModal}
      >
        <RelCostCenter objRel={objRel} setIsClose={setIsOpen} />
      </Modal>

    </div>
  )
}