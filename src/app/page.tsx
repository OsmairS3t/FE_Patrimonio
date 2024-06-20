'use client'
import { api } from "@/lib/axios";
import { useEffect, useState } from "react"
import { Chart } from "react-google-charts";

interface QtdProps {
  ativo: string;
  qtde: string | number;
}

export default function Home() {
  let objTitle:string[] = ["Ativos", "Qtd por Centro de custo"]
  let itemsChart:string[] = []
  let objChart:string[] = []
  let combineArray:any[] = []
  const [qtdAtivos, setQtdAtivos] = useState([])
  const objeto = [
    ['Ativos', 'Qtd por Centro de custo'],
    ['CADEIRA PLASTICA S BRAÇO', 108],
    ['ARMARIO DE AÇO', 10],
    ['GELADEIRA SUPER LUXO', 1],
    ['ROÇADEIRA', 1],
    ['CADEIRA PLASTICA COM APOIO', 20],
    ['LAVADORA INDUSTRIAL ALTA VAZAO EL4000V2', 1],
    ['FREEZER', 1],
    ['TAMPO DE MESA', 15],
    ['FOGAREIRO 3 BOCAS', 1],
    ['CERVEJEIRA', 1],
    ['MESA BRANCA PLASTICO', 2]
  ]
  
  const options = {
    title: "Itens por Centro de Custo",
    is3D: true,
  };
  
  async function loadQtdAtivos() {
    let objTemp:[string, number][] = []
    try {
      const response = await api.get(`ativos/rel/8`)
      if(response.data) {
        const objeto:QtdProps[] = response.data
        objeto.map(item => {
          objTemp.push([item.ativo, Number(item.qtde)])
        })
      }
      console.log(objTemp)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadQtdAtivos()
  },[])

  return (
    <section>
      <div className="flex justify-center items-center p-2 my-2">
        <select>
          <option>Centro de custo...</option>
        </select>
      </div>

      <Chart
        chartType="PieChart"
        data={objeto}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </section>
  )
}
