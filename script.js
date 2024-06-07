function calculateNeedMatrix() {
    var allocatedA = [
        parseInt(document.getElementById("p0a-allocated").value),
        parseInt(document.getElementById("p1a-allocated").value),
        parseInt(document.getElementById("p2a-allocated").value),
        parseInt(document.getElementById("p3a-allocated").value),
        parseInt(document.getElementById("p4a-allocated").value)
    ];

    var allocatedB = [
        parseInt(document.getElementById("p0b-allocated").value),
        parseInt(document.getElementById("p1b-allocated").value),
        parseInt(document.getElementById("p2b-allocated").value),
        parseInt(document.getElementById("p3b-allocated").value),
        parseInt(document.getElementById("p4b-allocated").value)
    ];

    var allocatedC = [
        parseInt(document.getElementById("p0c-allocated").value),
        parseInt(document.getElementById("p1c-allocated").value),
        parseInt(document.getElementById("p2c-allocated").value),
        parseInt(document.getElementById("p3c-allocated").value),
        parseInt(document.getElementById("p4c-allocated").value)
    ];

    var maxA = [
        parseInt(document.getElementById("p0a-max").value),
        parseInt(document.getElementById("p1a-max").value),
        parseInt(document.getElementById("p2a-max").value),
        parseInt(document.getElementById("p3a-max").value),
        parseInt(document.getElementById("p4a-max").value)
    ];

    var maxB = [
        parseInt(document.getElementById("p0b-max").value),
        parseInt(document.getElementById("p1b-max").value),
        parseInt(document.getElementById("p2b-max").value),
        parseInt(document.getElementById("p3b-max").value),
        parseInt(document.getElementById("p4b-max").value)
    ];

    var maxC = [
        parseInt(document.getElementById("p0c-max").value),
        parseInt(document.getElementById("p1c-max").value),
        parseInt(document.getElementById("p2c-max").value),
        parseInt(document.getElementById("p3c-max").value),
        parseInt(document.getElementById("p4c-max").value)
    ];

    var needA = maxA.map((max, index) => max - allocatedA[index]);
    var needB = maxB.map((max, index) => max - allocatedB[index]);
    var needC = maxC.map((max, index) => max - allocatedC[index]);

    document.getElementById("p0a-need").textContent = "Need: " + needA[0];
    document.getElementById("p0b-need").textContent = "Need: " + needB[0];
    document.getElementById("p0c-need").textContent = "Need: " + needC[0];

    document.getElementById("p1a-need").textContent = "Need: " + needA[5];
    document.getElementById("p1b-need").textContent = "Need: " + needB[5];
    document.getElementById("p1c-need").textContent = "Need: " + needC[5];

    document.getElementById("p2a-need").textContent = "Need: " + needA[2];
    document.getElementById("p2b-need").textContent = "Need: " + needB[2];
    document.getElementById("p2c-need").textContent = "Need: " + needC[2];

    document.getElementById("p3a-need").textContent = "Need: " + needA[3];
    document.getElementById("p3b-need").textContent = "Need: " + needB[3];
    document.getElementById("p3c-need").textContent = "Need: " + needC[3];

    document.getElementById("p4a-need").textContent = "Need: " + needA[4];
    document.getElementById("p4b-need").textContent = "Need: " + needB[4];
    document.getElementById("p4c-need").textContent = "Need: " + needC[4];
}

function checkSafety() {
    calculateNeedMatrix();

    var availableA = parseInt(document.getElementById("resourceA").value);
    var availableB = parseInt(document.getElementById("resourceB").value);
    var availableC = parseInt(document.getElementById("resourceC").value);

    var allocatedA = [
        parseInt(document.getElementById("p0a-allocated").value),
        parseInt(document.getElementById("p1a-allocated").value),
        parseInt(document.getElementById("p2a-allocated").value),
        parseInt(document.getElementById("p3a-allocated").value),
        parseInt(document.getElementById("p4a-allocated").value)
    ];

    var allocatedB = [
        parseInt(document.getElementById("p0b-allocated").value),
        parseInt(document.getElementById("p1b-allocated").value),
        parseInt(document.getElementById("p2b-allocated").value),
        parseInt(document.getElementById("p3b-allocated").value),
        parseInt(document.getElementById("p4b-allocated").value)
    ];

    var allocatedC = [
        parseInt(document.getElementById("p0c-allocated").value),
        parseInt(document.getElementById("p1c-allocated").value),
        parseInt(document.getElementById("p2c-allocated").value),
        parseInt(document.getElementById("p3c-allocated").value),
        parseInt(document.getElementById("p4c-allocated").value)
    ];

    var maxA = [
        parseInt(document.getElementById("p0a-max").value),
        parseInt(document.getElementById("p1a-max").value),
        parseInt(document.getElementById("p2a-max").value),
        parseInt(document.getElementById("p3a-max").value),
        parseInt(document.getElementById("p4a-max").value)
    ];

    var maxB = [
        parseInt(document.getElementById("p0b-max").value),
        parseInt(document.getElementById("p1b-max").value),
        parseInt(document.getElementById("p2b-max").value),
        parseInt(document.getElementById("p3b-max").value),
        parseInt(document.getElementById("p4b-max").value)
    ];

    var maxC = [
        parseInt(document.getElementById("p0c-max").value),
        parseInt(document.getElementById("p1c-max").value),
        parseInt(document.getElementById("p2c-max").value),
        parseInt(document.getElementById("p3c-max").value),
        parseInt(document.getElementById("p4c-max").value)
    ];

    var sequenceInput = document.getElementById("sequenceInput").value.trim();
    var sequence = sequenceInput.split(',');

    var needA = maxA.map((max, index) => max - allocatedA[index]);
    var needB = maxB.map((max, index) => max - allocatedB[index]);
    var needC = maxC.map((max, index) => max - allocatedC[index]);

    var workA = availableA;
    var workB = availableB;
    var workC = availableC;

    var finish = [false, false, false, false, false];

    var safeSequence = [];

    while (safeSequence.length < 5) {
        var found = false;
        for (var i = 0; i < 5; i++) {
            if (!finish[i] && needA[i] <= workA && needB[i] <= workB && needC[i] <= workC) {
                workA += allocatedA[i];
                workB += allocatedB[i];
                workC += allocatedC[i];
                finish[i] = true;
                safeSequence.push("P" + i);
                found = true;
            }
        }
        if (!found) {
            break;
        }
    }

    var output = document.getElementById("output");

    if (safeSequence.length == 5) {
        output.innerHTML = "<strong>Safe Sequence:</strong> " + safeSequence.join(" -> ");
    } else {
        output.innerHTML = "<strong>Unsafe Sequence:</strong> The system is in an unsafe state.";
    }
}
