'use client'

type AdicionarProps = {
  setIsClose: (isOpen: boolean) => void
}

export function Atualizar({ setIsClose }: AdicionarProps) {
  function handleClose() {
    setIsClose(false)
    // reset()
  }

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-semibold">Atualiza Ativos</h2>
        <button
          onClick={handleClose}
          className="px-2 bg-red-500 hover:bg-red-400 text-xl text-white rounded"
        >
          X
        </button>
      </div>
    </div>
  )
}
