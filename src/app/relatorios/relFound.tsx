import { api } from '@/lib/axios';
import React, { useEffect, useState } from 'react';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { GrDocumentPdf, GrClose } from 'react-icons/gr'
import { RelProps } from './page';
import { ICostCenter } from '@/utils/interface';

interface Props {
  setIsClose: (isOpen:boolean) => void;
  objRel: RelProps;
}

type SinteticoListProps = {
  ativo: string;
  qtde: string;
}

type AnaliticoListProps = {
  id: number;
  codigo: string;
  status: string;
  descricao: string;
  aquisicao: string;
  valor: number;
  depreciacao: number;
  subgrupo: string;
  centrocusto: string;
  marca: string;
}

type Options = {
  method?: 'open' | 'save' | 'build';
  resolution: Resolution;
  page: {
    margin: Margin;
    format: string;
    orientation?: 'portrait' | 'p' | 'l' | 'landscape';
  };
  canvas: {
    mimeType: 'image/jpeg' | 'image/png';
    qualityRatio: number;
  };
  overrides: {
    pdf: { compress: boolean };
    canvas: { useCORS: boolean };
  };
};

export default function RelEncontrados({ setIsClose, objRel }:Props) {
  const [sintetico, setSintetico] = useState<SinteticoListProps[]>([])
  const [analitico, setAnalitico] = useState<AnaliticoListProps[]>([])
  const [descricaoCC, setDescricaoCC] = useState('')
  const [total, setTotal] = useState(0)
  
  const options:Options = {
    method: 'open',
    resolution: Resolution.HIGH,
    page: {
       margin: Margin.SMALL,
       format: 'A4',
       orientation: 'portrait',
    },
    canvas: {
       mimeType: 'image/png',
       qualityRatio: 1
    },
    overrides: {
       pdf: {
          compress: true
       },
       canvas: {
          useCORS: true
       }
    },
  };
  const getTargetElement = () => document.getElementById('content-id');

  async function loadRel(objeto: RelProps) {
    const responseCC = await api.get(`centrocusto/${objeto.centrocusto}`)
    const dataCC:ICostCenter = responseCC.data[0]
    setDescricaoCC(dataCC.descricao)
    if(objeto.tipo===1) {
      const response = await api.get(`ativos/listactive/${objeto.centrocusto}`)
      const data = response.data
      setAnalitico(data)
    } else {
      const response = await api.get(`ativos/rel/${objeto.centrocusto}`)
      const data:SinteticoListProps[] = response.data
      let soma=0
      data.map(item => {
        soma += Number(item.qtde)
      })
      setTotal(soma)
      setSintetico(data)
    }
  }

  useEffect(()=> {
    loadRel(objRel)
  },[])

  return (
    <>
      <div className='flex flex-row w-full justify-between items-center mb-4 p-2 bg-blue-300'>
        <h2 className='font-semibold'>Lista Patrimonial - Por Centro de Custo</h2>
        <button onClick={() => generatePDF(getTargetElement, options)}><GrDocumentPdf size={20} className="hover:text-white" /></button>
        <button onClick={()=>setIsClose(false)}><GrClose size={20} className="hover:text-white" /></button>
      </div>

      { (objRel.tipo === 1) ?
        <div id="content-id">
          <h3 className='font-semibold py-4'>Centro de custo: {descricaoCC}</h3>
          <div className='flex flex-row w-full gap-4 bg-slate-300 border-b-2 border-b-solid border-b-slate-400'>
            <div className='w-32 p-2'>Sub-Grupo</div>
            <div className='w-24 p-2'>Código</div>
            <div className='flex-1 p-2'>Descrição</div>
            <div className='w-52 p-2'>Marca</div>
            <div className='w-24 p-2'>Status</div>
          </div>
          {
            analitico.map(item => (
              <div key={item.id} className='flex flex-row w-full gap-4 odd:bg-slate-100'>
                <div className='w-32 p-2'>{item.subgrupo}</div>
                <div className='w-24 p-2'>{item.codigo}</div>
                <div className='flex-1 p-2'>{item.descricao}</div>
                <div className='w-52 p-2'>{item.marca}</div>
                <div className='w-24 p-2'>{item.status}</div>
              </div>
            ))
          }
        </div>
      :
        <div id="content-id">
          <div>
            <h3 className='font-semibold py-4'>Centro de custo: {descricaoCC}</h3>
          </div>
          <div className='flex flex-row w-full gap-4 bg-slate-300 border-b-2 border-b-solid border-b-slate-400'>
            <div className='flex-1 p-2'>Ativo</div>
            <div className='w-24 p-2'>Quantidade</div>
          </div>
          {
            sintetico.map(item => (
              <div key={item.ativo} className='flex flex-row w-full gap-4 odd:bg-slate-100'>
                <div className='flex-1 p-2'>{item.ativo}</div>
                <div className='w-24 p-2 text-center'>{item.qtde}</div>
              </div>
            ))
          }
          <div className='flex flex-row w-full gap-4'>
            <div className='flex-1 p-2 text-right font-semibold'>Total:</div>
            <div className='w-24 p-2 text-center font-semibold'>{total}</div>
          </div>
        </div>
       }
    </>
  )
}