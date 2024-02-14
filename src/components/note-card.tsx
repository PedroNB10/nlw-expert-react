import * as Dialog from '@radix-ui/react-dialog';

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

// Aqui ao importar toda a biblioteca do radix foi usado o asterisco e para qualquer elemento precisa usar o Dialog. antes do nome do componente.


interface NoteCardProps {
  note: {
    id: string;
    date: Date;
    content: string;
  },
  onNoteDeleted: (id: string) => void
}

export function NoteCard(props: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-left flex flex-col gap-3 rounded-md bg-slate-800 p-5  overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-300">{formatDistanceToNow(props.note.date, { locale: ptBR, addSuffix: true })}</span>
        <p className="text-sm leading-6 text-slate-400">
          {props.note.content}
        </p>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-black/0 h-1/2 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal> {/* Esse é o portal que aparece ao clicar no Dialog.Trigger e fica fora desse elemento Notecard mas dentro do body*/}
        <Dialog.Overlay className="inset-0 fixed  bg-black/50" />
        {/* fixed left-1/2 top-1/2 w-[300px] h-[200px] bg-white */}
        <Dialog.Content className='overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full outline-none
        md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col '> {/* Esse é o conteúdo que aparece ao clicar no Dialog.Trigger*/}
          {/* flex-1: ocupa o máximo de espaço possível mas se tiver outros elementos ele se ajusta com base no seu irmão e o 0% é o tamanho padrão */}

          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400'>
            <X className='size-5 text-slate-400 hover:text-slate-100' />
          </Dialog.Close>

          <div className='flex flex-1 flex-col gap-3 p-5'>
            <span className="text-sm font-medium text-slate-300">{formatDistanceToNow(props.note.date, { locale: ptBR, addSuffix: true })}</span>
            <p className="text-sm leading-6 ">
              {props.note.content}
            </p>

          </div>


          <button
            type='button'
            className='w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group'
            onClick={() => {
              props.onNoteDeleted(props.note.id)
            }}
          >

            Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota?</span>

          </button>
        </Dialog.Content>
      </Dialog.Portal>

    </Dialog.Root>


  );
}
