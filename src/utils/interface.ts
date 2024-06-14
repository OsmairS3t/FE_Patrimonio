export interface IGroups {
  id: number
  descricao: string
}

export interface ISubGroups {
  id: number
  codgrupo: number
  grupo: string
  descricao: string
}

export interface IActive {
  id: number
  codigo: string
  status: string
  descricao: string
  aquisicao: string
  valor_aquisicao: string
  valor_atual: string
  depreciacao: string
  codsubgrupo: number
  codcentrocusto: number
  codmarca: number
}

export interface ICostCenter {
  id: number
  descricao: string
}

export interface IMark {
  id: number
  descricao: string
}

export interface IActives {
  id: number
  codigo: string
  status: string
  descricao: string
  aquisicao: string
  valor_aquisicao: string
  valor_atual: string
  depreciacao: string
  subgrupo: string
  centrocusto: string
  codmarca: number
  marca: string
}

export interface INote {
  id: number
  costcenter: number
  centrocusto: string
  active: string
  obs: string
}