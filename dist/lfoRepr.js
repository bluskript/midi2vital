"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let notes = { 'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11 };
function pitchToLFO(note) {
    let pitch = parseInt(note.substr(note.length - 1), 10) * 12 + notes[note[0]];
    if (note[1] == '#')
        pitch++;
    return 1 - pitch / 12 / 8;
}
exports.pitchToLFO = pitchToLFO;
function applyNote(t, rhythmLFO, pitchLFO, start, end, name, lastName) {
    rhythmLFO.points.push(start, 0.0);
    rhythmLFO.points.push(end, 1.0);
    const pitch = pitchToLFO(name);
    console.log({ pitch, name });
    if (name === lastName)
        pitchLFO.points[pitchLFO.points.length - 2] = end;
    else {
        pitchLFO.points.push(start, pitch);
        pitchLFO.points.push(end, pitch);
    }
}
exports.applyNote = applyNote;
//# sourceMappingURL=lfoRepr.js.map