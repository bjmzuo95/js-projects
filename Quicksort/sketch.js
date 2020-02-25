let values = [];
let states = [];
let w = 3;

function setup() {
  createCanvas(900, 300);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  quickSort(values, 0, values.length - 1);
}

function draw() {
  background(50);

  for (let i = 0; i < values.length; i++) {
    stroke(0);
    fill(255);
    if (states[i] == 0) {
      fill(28, 56, 234);
    } else if (states[i] == 1) {
      fill(114, 212, 155);
    }else {
      fill(255);
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }

  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ])
  // quickSort(arr, start, index - 1);
  // quickSort(arr, index + 1, end);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotIndex = start;
  let pivotValue = arr[end];
  states[pivotIndex] = 0;

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }

  await swap(arr, pivotIndex, end);
  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

async function swap(arr, idx1, idx2) {
  await sleep(20);
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
