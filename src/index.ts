import { Midi } from "@tonejs/midi";
import { readFileSync, writeFileSync } from "fs";
import { applyNote } from "./lfoRepr";
import { RootObject, Lfo } from "./schema";

const midiFile = readFileSync(process.argv.slice(2)[0] || "./old-macdonald-had-a-farm.mid");
const midi = new Midi(midiFile);
const strData = readFileSync("./initial-preset.vital", {
  encoding: "utf-8",
});
const data = JSON.parse(strData) as RootObject;
const lfoNotes = [];

for (let i = 0; i < 12; i++) {
  data.settings.modulations[i].line_mapping = {} as Lfo;
  data.settings.modulations[i].line_mapping.name = "generated" + i;
  data.settings.modulations[i].line_mapping.points = [];
  data.settings.modulations[i].line_mapping.num_points = 0;
  data.settings.modulations[i].line_mapping.powers = [];
  data.settings.modulations[i].line_mapping.points.push(0, 1);
  lfoNotes.push(0);
}

const targetTrack = midi.tracks[0];
targetTrack.notes.slice(0, 45).forEach((v) => {
  const noteStartPercent = v.time / targetTrack.duration;
  const noteEndPercent = (v.time + v.duration) / targetTrack.duration;
  for (let i = 0; i < 12; i += 2) {
    if (noteStartPercent < lfoNotes[i]) {
      continue;
    }
    lfoNotes[i] = noteEndPercent;

    applyNote(
      targetTrack,
      data.settings.modulations[i].line_mapping,
      data.settings.modulations[i + 1].line_mapping,
      noteStartPercent,
      noteEndPercent,
      v.name
    );
    break;
  }
});

for (let i = 0; i < 12; i++) {
  data.settings.modulations[i].line_mapping.points.push(1, 1);
  data.settings.modulations[i].line_mapping.num_points = data.settings.modulations[i].line_mapping.points.length / 2;
  data.settings.modulations[i].line_mapping.powers = new Array(data.settings.modulations[i].line_mapping.num_points).fill(20);
}

writeFileSync("./output.vital", JSON.stringify(data));
