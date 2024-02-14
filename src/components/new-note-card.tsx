import * as Dialog from '@radix-ui/react-dialog';

import { X } from 'lucide-react'
import { useState } from 'react';

//import { Toaster } from 'sonner' // Serve para colocar mensagem no canto da tela após pressionar um botão por exemplo.

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

import { toast } from 'sonner';

export function NewNoteCard(props: NewNoteCardProps) {

  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)

  const [contentTextArea, setContentTextArea] = useState('')

  const [isRecording, setIsRecording] = useState<boolean>(false)

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContentTextArea(event.target.value)
    if (event.target.value === '') {
      setShouldShowOnboarding(true)
    }
  }

  function handleSaveNote(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault()
    console.log('Salvando nota...')
    console.log(contentTextArea)

    if (contentTextArea === '') {
      toast.error('Não é possível salvar uma nota vazia!')
      return
    }

    props.onNoteCreated(contentTextArea)
    toast.success('Nota salva com sucesso!')

    setContentTextArea('')
    setShouldShowOnboarding(true)

  }


  function handleStartRecording() {


    const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window

    if (!isSpeechRecognitionSupported) {
      toast.error('Seu navegador não suporta a funcionalidade de gravação de voz!')
      return
    }

    setShouldShowOnboarding(false)
    setIsRecording(true)


    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce(
        (acumulator, result) => {

          return acumulator.concat(result[0].transcript)
        }, '')


      setContentTextArea(transcription)

    }



    speechRecognition.onerror = (event) => {
      console.error(event.error)
      setIsRecording(false)

    }

    speechRecognition.start()

  }

  function handleStopRecording() {
    setIsRecording(false)

    if (speechRecognition != null) {
      speechRecognition.stop()
    }
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
        <Dialog.Content className='overflow-hidden  fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full outline-none
        md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col '> {/* Esse é o conteúdo que aparece ao clicar no Dialog.Trigger*/}
          {/* flex-1: ocupa o máximo de espaço possível mas se tiver outros elementos ele se ajusta com base no seu irmão e o 0% é o tamanho padrão */}

          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400'>
            <X className='size-5 text-slate-400 hover:text-slate-100' />
          </Dialog.Close>


          <form className='flex-1 flex flex-col'>


            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {shouldShowOnboarding ? (

                <p className="text-sm leading-6 ">
                  Comece <button type='button' onClick={handleStartRecording} className=' text-lime-400 hover:underline '>gravando uma nota em áudio</button> ou se preferir <button onClick={handleStartEditor} className=' text-lime-400 hover:underline '>utilize apenas texto</button>.
                </p>

              ) : (
                <textarea
                  autoFocus
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                  onChange={handleContentChange}
                  value={contentTextArea}
                />
              )

              }




            </div>


            {isRecording ? (
              <button
                type='button'
                onClick={handleStopRecording}
                className='w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100'


              >

                <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                Gravando... (clique p/ interromper)

              </button>
            ) : (
              <button
                type='button'
                onClick={handleSaveNote}
                className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'


              >
                <span className='text-lime-950 group-hover:underline'>Salvar nota</span>

              </button>
            )}




          </form>
        </Dialog.Content>
      </Dialog.Portal>


    </Dialog.Root>
  );
}
