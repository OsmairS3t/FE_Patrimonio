'use client'

import { useState } from 'react'
import Modal from 'react-modal'
import { Adicionar } from './adicionar'
import ListCentroCusto from './listCostCenter'
import { customStylesModal } from '@/utils/styles'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  function handleAddNew() {
    setIsOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-xl">Centro de custo</h1>
        <button
          onClick={handleAddNew}
          className="p-2 bg-green-600 text-center text-white font-semibold hover:bg-green-500 transition-all rounded"
        >
          + Adicionar
        </button>
      </div>

      <ListCentroCusto />

      <Modal style={customStylesModal} ariaHideApp={false} isOpen={isOpen}>
        <Adicionar setIsClose={setIsOpen} />
      </Modal>
    </div>
  )
}
