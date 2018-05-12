import faker from 'faker'

export const getPlaceholder = () => {
  const reducer = (reducer, acc) => reducer + acc
  const line = () => `${faker.name.firstName()} ${Math.round(Math.random() * 10000) / 100}€\n`
  const rand = Math.round(Math.random() * 3 + 3)

  // return line() // return just a line as some browser dosnt suppoert multi-line placeholders
  return Array(rand).fill('').map(line).reduce(reducer)
}




/**
 *
 * @param number
 * @param precision
 *
 * see: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/round
 */
const round = (number, precision) => {
  var shift = function (number, precision) {
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, +precision)), -precision);
}


/**
 * Algorithm for Calculating
 */
export const parseAndCalculateDepts = (rawData) => {

  // initialization
  const names = []
  const payed = []
  let html = ''
  let text = ''

  const output = textOutput => {
    html += `<span>${textOutput}</span></br>`
    text += textOutput + '\n'
  }

  if (!rawData) return null

  // parse data
  const rawDataSplitted = rawData.split(/\s+/g)
  rawDataSplitted.forEach(elem => {

    // check for number
    const amount = Number(elem.replace(',', '.').replace('€', ''))
    if (amount) {
      payed.push(amount)
      return
    }

    // check for euro sign
    if (elem.match('€')) return

    if (elem) {
      // else push text
      names.push(elem)
    }
  })


  // check if data is correct
  if (names.length !== payed.length) return {
    html: '',
    text: '',
    error: `Somethings's not right... Please check data 😬`
  }


  // calc detla
  let average = payed.reduce((accumulator, currentValue) => accumulator + currentValue) / payed.length
  average = round(average, 2)

  // output(`Average: ${average}€`)
  // output(``)

  const delta = payed.map(payedpp => {
    return round(payedpp - average, 2)
  })

  // delta.forEach((d, i) =>
  //   output(`${names[i]} deviates
  //   ${d < 0 ?
  //       `<span class="negative">${d}</span>` :
  //       `<span class="positive">+${d}</span>`}€ from average`))
  // output('')

  // check sum
  let sum = 0
  delta.forEach(e => sum += e * 10)
  console.log(sum)
  // if (sum !== 0) return output('Sums don\'t add up :/')

  // calculate
  const length = delta.length
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      (function () {
        if (i === j) return
        if (delta[i] >= 0) return
        if (delta[j] <= 0) return

        if (Math.abs(delta[i]) >= delta[j]) {

          output(`${names[i]} 👉 ${names[j]} ${-(-delta[j])}€`)

          delta[i] = round(delta[i] + delta[j], 2)
          delta[j] = 0

        } else {

          output(`${names[i]} 👉 ${names[j]} ${-delta[i]}€`)

          delta[j] = round(delta[j] + delta[i], 2)
          delta[i] = 0
        }
      })()
    }
  }

  if (text) {
    return { html, text }
  }

  return {
    html: `It's all good, man!`,
    text: 'Saul Goodman',
  }
}
