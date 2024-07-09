'use client'
import { api } from "@/lib/axios";
import { ICostCenter } from "@/utils/interface";
import { useEffect, useState } from "react"
import { Bar, VictoryBar, VictoryChart, VictoryLabel, VictoryLegend, VictoryTheme } from "victory";

interface QtdProps {
  ativo: string;
  qtde: string;
}

interface LegProps {
  name: string
}

export default function Home() {
  const [idCostCenter, setIdCostCenter] = useState('0')
  const [centroCustos, setCentroCustos] = useState<ICostCenter[]>([])
  const [dataChartVictory, setDataChartVictory] = useState<QtdProps[]>([])
  let ArrLabels = [{name: ''}]
  
  async function listCentroCusto() {
    const response = await api.get('centrocusto')
    setCentroCustos(response.data)
  }

  async function LoadActives(id: string) {
    const response = await api.get(`ativos/rel/${id}`)
    let objeto:QtdProps[] = response.data
    objeto.map(item => {
      ArrLabels.push({name: item.ativo})
    })
    setDataChartVictory(objeto)
  }

  useEffect(() => {
    listCentroCusto()
    LoadActives(idCostCenter)
  },[idCostCenter])

  return (
    <section>
      <div className="flex justify-center items-center p-2 my-2">
        <select
          id="codcentrocusto"
          className="border-[1px] border-gray-200 p-2 w-full lg:w-52 rounded print:hidden"
          onChange={(e) => setIdCostCenter(e.target.value)}
        >
          <option value={0}>Selecione...</option>
          {centroCustos.map((cc) => (
            <option key={cc.id} value={cc.id}>
              {cc.descricao}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full h-[600px]">
        <VictoryChart 
          theme={VictoryTheme.material} 
          height={400}
          title="Quantidade por centro de custo"
        >
          <VictoryBar horizontal
            data={dataChartVictory}
            x="ativo" y="qtde"
            labels={({ data, index }) => data[index].qtde}
            labelComponent={
              <VictoryLabel
                inline
                style={[
                  { 
                    fontFamily: 'Roboto',
                    fontSize: 10,
                    fill: "black" 
                  },
                ]}
              />
            }
            style={{
              data: {
                fill: "#055741", 
              }
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
          />
        </VictoryChart>
      </div>
    </section>
  )
}



