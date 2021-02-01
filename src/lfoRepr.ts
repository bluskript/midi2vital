import { Note } from "@tonejs/midi/dist/Note";
import { Track } from "@tonejs/midi/dist/Track";
import { Lfo } from "./schema";

export function pitchToLFO(pitch: string) {
  const semitone = 0.00520833333;
  let outPitch = 0;
  const letter = pitch[0];
  let octave = 0;
  if (pitch.length === 3) {
    outPitch += 0.5 * semitone;
    octave = parseInt(pitch[2], 10);
  } else {
    octave = parseInt(pitch[1], 10);
  }
  outPitch += octave * 0.0625;
  switch (letter) {
    case "A":
      outPitch += 7 * semitone;
    case "B":
      outPitch += 6 * semitone;
    case "C":
      outPitch += 5 * semitone;
    case "D":
      outPitch += 4 * semitone;
    case "E":
      outPitch += 3 * semitone;
    case "F":
      outPitch += 2 * semitone;
    case "G":
      outPitch += 1 * semitone;
  }
  return outPitch;
}

export function applyNote(
  t: Track,
  rhythmLFO: Lfo,
  pitchLFO: Lfo,
  start: number,
  end: number,
  name: string
) {
  rhythmLFO.points.push(start, 1.0);
  rhythmLFO.points.push(start, 0.0);
  rhythmLFO.points.push(end, 0.0);
  rhythmLFO.points.push(end, 1.0);
  const pitch = pitchToLFO(name);
  console.log({ pitch, name });
  pitchLFO.points.push(start, 1.0);
  pitchLFO.points.push(start, pitch);
  pitchLFO.points.push(end, pitch);
  pitchLFO.points.push(end, 1.0);
}
