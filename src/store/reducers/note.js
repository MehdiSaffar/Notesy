import actionTypes from "../actions/actionTypes"
import { produce } from "immer"

const initialState = {
    notes: [],
    currentNote: {},
    deletingNote: null,
    status: 'Ready'
}

export default (state = initialState, action) => {
    const map = {
        [actionTypes.RESET_NOTES]: resetNotes,
        [actionTypes.ADD_NOTE_SUCCESS]: addNote,
        [actionTypes.ADD_TAG_SUCCESS]: addTag,
        [actionTypes.REMOVE_NOTE_START]: removeNoteStart,
        [actionTypes.REMOVE_NOTE_SUCCESS]: removeNote,
        [actionTypes.REMOVE_TAG_SUCCESS]: removeTag,
        // [actionTypes.GET_NOTE]: getNote,
        [actionTypes.GET_NOTES_SUCCESS]: getNotes,
        [actionTypes.UPDATE_CURRENT_NOTE]: updateCurrentNote,
        [actionTypes.SET_CURRENT_NOTE]: setCurrentNote,
        [actionTypes.NOTE_UPDATE_STATUS]: updateNoteStatus,
    }
    const toCall = map[action.type]
    return toCall ? toCall(state, action) : state
}

const resetNotes = (state, action) => ({...initialState})

const addNote = (state, action) =>
    produce(state, draftState => {
        draftState.notes.push({
            id: action.id,
            title: action.title,
            content: action.content,
            tags: []
        })
    })

const removeNote = (state, action) => produce(state, draftState => {
    draftState.notes = draftState.notes.filter(note => note.id !== action.id)
    if(draftState.currentNote.id === action.id) {
        draftState.currentNote = {}
    }
    draftState.deletingNote = null;
})
const addTag = (state, action) => produce(state, draftState => {
    draftState.notes.find(el => el.id === action.id).tags = action.tags
    draftState.currentNote.tags = action.tags;
})
const removeTag = (state, action) => produce(state, draftState => {
    draftState.notes.find(el => el.id === action.id).tags = action.tags
    draftState.currentNote.tags = action.tags;
})
const removeNoteStart = (state, action) => produce(state, draftState => {
    draftState.deletingNote = action.id;
})

const getNotes = (state, action) =>
    produce(state, draftState => {
        draftState.notes = action.notes
    })

const setCurrentNote = (state, action) =>
    produce(state, draftState => {
        const id = action.id
        draftState.currentNote = state.notes.find(note => note.id === id)
    })

const updateCurrentNote = (state, action) =>
    produce(state, draftState => {
        draftState.currentNote.title = action.title
        draftState.currentNote.content = action.content
        draftState.notes.find(
            note => note.id === draftState.currentNote.id
        ).title = action.title
        draftState.notes.find(
            note => note.id === draftState.currentNote.id
        ).content = action.content
        // draftState.notes.find(
        //     note => note.id === draftState.currentNote.id
        // ).tags = action.tags
    })

    const updateNoteStatus = (state, action) => produce(state, draftState => {
        draftState.status = action.status === '' ? 'Ready' : action.status
    })
    
