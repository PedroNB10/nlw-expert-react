import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react'
import { useState } from 'react';

//import { Toaster } from 'sonner' // Serve para colocar mensagem no canto da tela após pressionar um botão por exemplo.
import { toast } from 'sonner';

export function NewNoteCard() {

  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)

  const [contentTextArea, setContentTextArea] = useState('')

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContentTextArea(event.target.value)
    if (event.target.value === '') {
      setShouldShowOnboarding(true)
    }
  }

  function handleSaveNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('Salvando nota...')
    console.log(contentTextArea)
    toast.success('Nota salva com sucesso!')
  }


  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md bg-slate-700 p-5 flex flex-col gap-3 text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200">Adicionar nota</span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida em texto automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal> {/* Esse é o portal que aparece ao clicar no Dialog.Trigger e fica fora desse elemento Notecard mas dentro do body*/}
        <Dialog.Overlay className="inset-0 fixed  bg-black/50" />
        {/* fixed left-1/2 top-1/2 w-[300px] h-[200px] bg-white */}
        <Dialog.Content className='overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full outline-none
        h-[60vh] bg-slate-700 rounded-md flex flex-col '> {/* Esse é o conteúdo que aparece ao clicar no Dialog.Trigger*/}
          {/* flex-1: ocupa o máximo de espaço possível mas se tiver outros elementos ele se ajusta com base no seu irmão e o 0% é o tamanho padrão */}

          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400'>
            <X className='size-5 text-slate-400 hover:text-slate-100' />
          </Dialog.Close>


          <form onSubmit={handleSaveNote} className='flex-1 flex flex-col'>


            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {shouldShowOnboarding ? (

                <p className="text-sm leading-6 ">
                  Comece <button className=' text-lime-400 hover:underline '>gravando uma nota em áudio</button> ou se preferir <button onClick={handleStartEditor} className=' text-lime-400 hover:underline '>utilize apenas texto</button>.
                </p>

              ) : (
                <textarea
                  autoFocus
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                  onChange={handleContentChange}
                />
              )

              }




            </div>


            <button
              type='submit'
              className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'


            >
              <span className='text-lime-950 group-hover:underline'>Salvar nota</span>

            </button>

          </form>
        </Dialog.Content>
      </Dialog.Portal>


    </Dialog.Root>
  );
}
