'use client'

import ListGroups from './listGroups'
import { Adicionar } from './adicionar'
import Modal from 'react-modal'
import { useState } from 'react'
import { customStylesModal } from '@/utils/styles'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  function handleAddNew() {
    setIsOpen(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-xl">Grupos</h1>
        <button
          onClick={handleAddNew}
          className="p-2 bg-green-600 text-center text-white font-semibold hover:bg-green-500 transition-all rounded"
        >
          + Adicionar
        </button>
      </div>
      <ListGroups />

      <Modal style={customStylesModal} ariaHideApp={false} isOpen={isOpen}>
        <Adicionar setIsClose={setIsOpen} />
      </Modal>
    </div>
  )
}
