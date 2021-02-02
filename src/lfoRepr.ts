import { Note } from "@tonejs/midi/dist/Note";
import { Track } from "@tonejs/midi/dist/Track";
import { Lfo } from "./schema";

export function pitchToLFO(note: string) {
  let pitch = parseInt(note.substr(note.length - 1), 10) * 12;
  switch (note.slice(0,-1)) {
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

let lastPitch;

export function applyNote(
  t: Track,
  rhythmLFO: Lfo,
  pitchLFO: Lfo,
  start: number,
  end: number,
  name: string
) {
  rhythmLFO.points.push(start, 0.0);
  rhythmLFO.points.push(end, 1.0);
  const pitch = pitchToLFO(name);
  console.log({pitch, name});
  if (pitch == lastPitch)
    pitchLFO.points[pitchLFO.points.length - 2] = end
  else {
    pitchLFO.points.push(start, pitch);
    pitchLFO.points.push(end, pitch);
  }
  lastPitch = pitch;
}
