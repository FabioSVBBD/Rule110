const canvas = document.getElementById('my-can');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
ctx.stroke();

const second = 1000; // milliseconds
const x = 4;
const width = Math.round(1920 / 1);
const height = Math.round(1080 / 1);

// implement probability
const createArray = (width, probability) => {
  let array = new Array(width);

  for (let i = 0; i < array.length; i++) {
    array[i] = Math.round(Math.random() * 100 / probability) === 1 ? 1 : 0;
  }

  return array;
};

const draw = (array, row) => {
  for (let i = 0; i < width; i += x) {
    ctx.fillStyle = array[i / x] ? 'black' : 'white';
    ctx.fillRect(i, row, x, x);
  }
};

let array = createArray(width, 1);
let row = 0;
draw(array, row);

setInterval(() => {
  row  = (row + x + height) % height;
  const oldArray = _.cloneDeep(array);
  let len = array.length;

  // checks
  for (let i = 0; i < len; i++) {
    let bitStr = '';

    bitStr += `${oldArray[(i - 1 + len) % len]}`;
    bitStr += `${oldArray[(i + len) % len]}`;
    bitStr += `${oldArray[(i + 1 + len) % len]}`;
    let newVal = 0;

    switch (bitStr) {
      case '111':
        newVal = 0;
        break;
      case '110':
        newVal = 1;
        break;
      case '101':
        newVal = 1;
        break;
      case '100':
        newVal = 0;
        break;
      case '011':
        newVal = 1;
        break;
      case '010':
        newVal = 1;
        break;
      case '001':
        newVal = 1;
        break;
      case '000':
        newVal = 0;
        break;
      default:
        break;
    }

    array[i] = newVal;
  }

  draw(array, row);
}, 0.0001 * second);

// Current pattern            111	  110	  101	  100	  011	  010	  001	  000
// New state for center cell	0	    1	    1	    0	    1	    1	    1	    0
