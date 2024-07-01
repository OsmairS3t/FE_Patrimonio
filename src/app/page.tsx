'use client'
import { api } from "@/lib/axios";
import { ICostCenter } from "@/utils/interface";
import { useEffect, useState } from "react"
import { Chart } from "react-google-charts";

interface QtdProps {
  ativo: string;
  qtde: string;
}
type DataArray = [string, string | number][];

export default function Home() {
  const [idCostCenter, setIdCostCenter] = useState('0')
  const [centroCustos, setCentroCustos] = useState<ICostCenter[]>([])
  // let dataChart:[string, string|number][] = [["Centro de custo", "Quantidade"]]
  let dataChart: DataArray = [["Centro de custo", "Quantidade"]];
  let dataLast:string

  const data = [
    ["Task", "Hours per Day"],
    ["CADEIRA PLASTICA S BRAÇO", 108], 
    ["ARMARIO DE AÇO", 10], 
    ["GELADEIRA SUPER LUXO", 1], 
    ["ROÇADEIRA", 1], 
    ["CADEIRA PLASTICA COM APOIO", 20], 
    ["LAVADORA INDUSTRIAL ALTA VAZAO EL4000V2", 1], 
    ["FREEZER", 1] 
  ];

  async function listCentroCusto() {
    const response = await api.get('centrocusto')
    setCentroCustos(response.data)
  }

  async function LoadActives(id: string) {
    const response = await api.get(`ativos/rel/${id}`)
    let objeto:QtdProps[] = response.data
    objeto.map((obj) => {
      dataChart.push([obj.ativo, Number(obj.qtde)])
    })
  }

  useEffect(() => {
    listCentroCusto()
    LoadActives(idCostCenter)
    console.log(dataLast)
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
      <div>
        <Chart
          chartType="PieChart"
          data={dataChart}
          options={{is3D:true}}
          width={"100%"}
          height={"400px"}
        />
        
        {/* <DonutChart
          data={dataChart}
          noDataText="Sem lista de ativos, selecione um acima"
          className="h-60 mt-4"
          index="name"
          showAnimation={true}
          animationDuration={5}
          variant="donut"
          colors={['#64748b', '#756254', '#ef4444', '#f97316', '#eab308', '#84cc16', '#06b6d4']}
          onValueChange={(v) => console.log(v)}
        /> */}
      </div>
    </section>
  )
}



