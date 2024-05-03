function check(id) {
    const content = document.getElementById(id);
    content.style.display = content.style.display === "none" ? "block" : "none";
}


//create a synth and connect it to the main output (your speakers)
const s = new Tone.Synth({volume : -10}).toDestination();
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

function startNote() {

    // Get the note value from the input field with id 'noteInput'
    const noteDropdown = document.getElementById('noteDropdown');
    const selectedNote = noteDropdown.options[noteDropdown.selectedIndex].value;

    // Trigger the attack with the specified note
    s.triggerAttack(selectedNote);
}

// Function to stop playing the note
function stopNote() {
    s.triggerRelease();
}

function playDrum(id) {
    synth.triggerAttackRelease(document.getElementById(id).value, "3");
}

function randomizeSliders() {
    document.getElementById("32slider").min = Tone.Frequency("C2").toFrequency() - Math.floor(Math.random() * 5);
    document.getElementById("32slider").max = Tone.Frequency("C3").toFrequency() + Math.floor(Math.random() * 6);
    document.getElementById("32slider").value = document.getElementById("32slider").min;

    document.getElementById("29slider").min = Tone.Frequency("D2").toFrequency() - Math.floor(Math.random() * 6);
    document.getElementById("29slider").max = Tone.Frequency("E3").toFrequency() + Math.floor(Math.random() * 7);
    document.getElementById("29slider").value = document.getElementById("29slider").min;

    document.getElementById("26slider").min = Tone.Frequency("F2").toFrequency() - Math.floor(Math.random() * 7);
    document.getElementById("26slider").max = Tone.Frequency("G3").toFrequency() + Math.floor(Math.random() * 8);
    document.getElementById("26slider").value = document.getElementById("26slider").min;

    document.getElementById("23slider").min = Tone.Frequency("B2").toFrequency() - Math.floor(Math.random() * 8);
    document.getElementById("23slider").max = Tone.Frequency("B3").toFrequency() + Math.floor(Math.random() * 10);
    document.getElementById("23slider").value = document.getElementById("23slider").min;

    document.getElementById("20slider").min = Tone.Frequency("C3").toFrequency() - Math.floor(Math.random() * 10);
    document.getElementById("20slider").max = Tone.Frequency("C4").toFrequency() + Math.floor(Math.random() * 12);
    document.getElementById("20slider").value = document.getElementById("20slider").min;
}



function changePitch(id) {
    const newNote = document.getElementById(id).value
    synth.set({ frequency: newNote });

    idd = id.substring(0, 2) + "pitch";

    pitch = Tone.Frequency(newNote).toNote();


    nnote = Tone.Frequency(pitch).toFrequency();

    cents = (1200 * Math.log2(newNote / 440)) - (1200 * Math.log2(nnote / 440));
    if (cents >= 0) {
        sign = "+";
    }
    else {
        sign = "-";
    }
    document.getElementById(idd).textContent = "Pitch: " + pitch + "\n" + sign + Math.abs(Number(cents.toFixed(1))) + "\ncents";
    const colorit = document.getElementById(idd);

    if (Math.abs(cents)<5) {
        colorit.style.color = 'green';
    } else if (Math.abs(cents) < 20) {
        colorit.style.color = 'orange';
    } else {
        colorit.style.color = 'red';
    }
}
