import {GO_FORWARD_ONE, GO_BACK_ONE, FETCH_ENTRIES, RECIEVE_ENTRIES, CHANGE_ENTRY} from './actions';

function blog(state = {
    loading: true,
    entries: [],
    currentEntry: {}
}, action) {
    let entries = state.entries;
    let currentIndex;
    switch(action.type) {
        case GO_FORWARD_ONE:
            for(var i = 0; i < entries.length; i++) {
                if(entries[i].title === state.currentEntry.title) {
                    currentIndex = i;
                }
            }
            return Object.assign({}, state, {
                currentEntry: entries[currentIndex+1]
            });
        case GO_BACK_ONE:
            for(var i = 0; i < entries.length; i++) {
                if(entries[i].title === state.currentEntry.title) {
                    currentIndex = i;
                }
            }
            return Object.assign({}, state, {
                currentEntry: entries[currentIndex-1]
            });
        case CHANGE_ENTRY:
            return Object.assign({}, state, {
                currentEntry: action.currentEntry
            });
        case RECIEVE_ENTRIES:
            entries = action.entries;
            if(action.currentEntry) {
                return Object.assign({}, state, {
                    loading: action.loading,
                    entries: entries,
                    currentEntry: action.currentEntry
                });
            }
            else {
                return Object.assign({}, state, {
                    loading: action.loading,
                    entries: entries,
                    currentEntry: entries[entries.length-1]
                });
            }
        default:
            return state;
    }
}

export default blog;
