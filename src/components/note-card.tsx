export function NoteCard() {
  return (
    <button className="text-left rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
      <span className="text-sm font-medium text-slate-300">há 4 dias</span>
      <p className="text-sm leading-6 text-slate-400">
        Grave uma nota em áudio que será convertida em texto automaticamente.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis,
        repellendus voluptate beatae aliquid magni ratione a vitae, debitis
        architecto quod repellat autem illo nulla voluptates ullam ipsam
        possimus error sint harum consequatur rerum! Nesciunt culpa laboriosam
        ratione rerum dolore consectetur, accusantium sequi doloribus aliquid
        voluptatum id tempora, tempore illum! Voluptas perspiciatis et ipsa sunt
        obcaecati, assumenda, pariatur suscipit voluptatibus inventore, fugit
        quasi praesentium. Sunt, porro impedit quas deleniti eos doloribus
        dolorem vero, doloremque quam corporis quisquam, odio aperiam animi fuga
        aut magni dignissimos ea facilis eius ab cumque? Itaque, mollitia?
      </p>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-black/0 h-1/2 pointer-events-none" />
    </button>
  );
}
