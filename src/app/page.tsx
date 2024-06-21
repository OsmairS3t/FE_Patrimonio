'use client'
import { api } from "@/lib/axios";
import { ICostCenter } from "@/utils/interface";
import { useEffect, useState } from "react"
import { DonutChart } from '@tremor/react';

interface QtdProps {
  ativo: string;
  qtde: string;
}

type TChart = {
  name: string;
  value: number;
}

export default function Home() {
  const [centroCustos, setCentroCustos] = useState<ICostCenter[]>([])
  const [dataChart, setDataChart] = useState<TChart[]>([])

  async function listCentroCusto() {
    const response = await api.get('centrocusto')
    setCentroCustos(response.data)
  }

  async function handleTurnCentroCusto(id:string) {
    try {
      const response = await api.get(`ativos/rel/${id}`)
      const objTemp:QtdProps[] = response.data
      const obj:TChart[] = objTemp.map(i => {
        return {
          name: i.ativo,
          value: Number(i.qtde)
        }
      })
      setDataChart(obj)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    listCentroCusto()
  },[])

  return (
    <section>
      <div className="flex justify-center items-center p-2 my-2">
        <select
          id="codcentrocusto"
          className="border-[1px] border-gray-200 p-2 w-full lg:w-52 rounded print:hidden"
          onChange={(e) => handleTurnCentroCusto(e.target.value)}
        >
          <option value={0}>Selecione...</option>
          {centroCustos.map((cc) => (
            <option key={cc.id} value={cc.id}>
              {cc.descricao}
            </option>
          ))}
        </select>
      </div>
      <div>
        <DonutChart
          data={dataChart}
          noDataText="Sem lista de ativos, selecione acima"
          className="h-60 mt-4"
          index="name"
          showAnimation={true}
          animationDuration={5}
          variant="donut"
          colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia']}
          onValueChange={(v) => console.log(v)}
        />
      </div>
    </section>
  )
}
