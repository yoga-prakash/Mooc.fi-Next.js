import { notFound } from "next/navigation"
import { getNoteById } from "../../services/notes"
import { toggleNoteImportance } from "../../actions/notes";
import { Suspense } from "react";

export default function NotePage({ params }: { params: Promise<{ id: string }> }) {
    return <Suspense fallback={<div>loading...</div>}><Note params={params} /></Suspense>
}

async function Note({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const note = getNoteById(Number(id))

    if (!note) {
        notFound()
    }
    return (
        <div>
            <h2>{note.content}</h2>
            <p>{note.important ? "Important" : "Not important"}</p>
            <form action={toggleNoteImportance}>
                <input type="hidden" name="id" value={note.id} />
                <button type="submit">
                    {note.important ? "Mark as not important" : "Mark as important"}
                </button>
            </form>
        </div>
    );
};