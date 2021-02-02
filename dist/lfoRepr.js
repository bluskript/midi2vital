"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pitchToLFO(note) {
    let pitch = parseInt(note.substr(note.length - 1), 10) * 12;
    switch (note.slice(0, -1)) {
        case "C":
            pitch += 0;
            break;
        case "C#":
            pitch += 1;
            break;
        case "D":
            pitch += 2;
            break;
        case "D#":
            pitch += 3;
            break;
        case "E":
            pitch += 4;
            break;
        case "F":
            pitch += 5;
            break;
        case "F#":
            pitch += 6;
            break;
        case "G":
            pitch += 7;
            break;
        case "G#":
            pitch += 8;
            break;
        case "A":
            pitch += 9;
            break;
        case "A#":
            pitch += 10;
            break;
        case "B":
            pitch += 11;
            break;
    }
    return 1 - pitch / 12 / 8;
}
exports.pitchToLFO = pitchToLFO;
let lastPitch;
function applyNote(t, rhythmLFO, pitchLFO, start, end, name) {
    rhythmLFO.points.push(start, 0.0);
    rhythmLFO.points.push(end, 1.0);
    const pitch = pitchToLFO(name);
    console.log({ pitch, name });
    if (pitch == lastPitch)
        pitchLFO.points[pitchLFO.points.length - 2] = end;
    else {
        pitchLFO.points.push(start, pitch);
        pitchLFO.points.push(end, pitch);
    }
    lastPitch = pitch;
}
exports.applyNote = applyNote;
//# sourceMappingURL=lfoRepr.js.map