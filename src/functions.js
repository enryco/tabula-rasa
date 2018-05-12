import faker from 'faker'

export const getPlaceholder = () => {

  const currencies = ['€', '$', '¥']
  const currency = currencies[Math.round(Math.random() * (currencies.length - 1))]

  const line = () => `  ${faker.name.firstName()} ${Math.round(Math.random() * 100)}${currency}\n`

  const rand = Math.round(Math.random() * 3 + 3)

  const reducer = (reducer, acc) => reducer + acc

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
 *
 */

const sanitizeNumberInput = string => {

  string = string.replace(/[^\d\,\.]+/g, '') //strip everything non-number format specific away

  const hasDotAndCommaSeperators = Boolean(string.match(/\.+/g)) && Boolean(string.match(/\,+/g))
  const dreamnumber = string.replace(/\.+/g, '_').replace(/\,+/g, '_')

  if (!hasDotAndCommaSeperators) {
    if (dreamnumber.split('_').length === 2) {
      if (dreamnumber.split('_')[1].length !== 3) {
        // do nothing and continue
      } else {
        if (Boolean(string.match(/\.+/g))) {
          alert(`Interpreting ${string} as english SI style (1 234.56)`)
          return string
        } else {
          alert(`Interpreting ${string} as non-english SI style (1 234,56)`)
          return string.replace(/\,/g, '.')
        }

      }

    } else {
      // convert to plain number
      return string.replace(/\.+/g, '').replace(/\,+/g, '')
    }
  }

  const elements = string
    .replace(/\.+/g, '_')
    .replace(/\,+/g, '_')
    .split('_')
  const last = elements.pop()
  return elements.reduce((acc, curva) => acc + curva) + '.' + last
}


/**
 * Algorithm for Calculating
 */
export const parseAndCalculateDepts = (rawData) => {

  const currencies = /\€|\$|\¥/g
  let currency = '🦄'
  const match = rawData.match(currencies)
  if (match) {
    currency = match[0]
  }
  rawData = rawData.replace(currencies, '')


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
  console.log(rawDataSplitted)

  rawDataSplitted.forEach(elem => {

    // check for number
    const elemMightBeANumber = sanitizeNumberInput(elem)
    const amount = Number(elemMightBeANumber)
    console.log(amount)

    if (amount) {
      if (names.length === payed.length) {
        // whoops, there's another number
        payed[payed.length - 1] = Number(String(payed[payed.length - 1]) + String(amount))
        return

      } else {
        payed.push(amount)
        return
      }
    }

    if (elem) {
      if (names.length === payed.length) {
        // push next name
        names.push(elem)
      } else {
        // append to name
        names[names.length - 1] += ' ' + elem
      }
    }
  })

  console.log(names, payed)



  // check if data is correct
  if (names.length !== payed.length) return {
    html: '',
    text: '',
    error: `Somethings's not right... Please check data 😬 \nmake sure you use 1 234.56 or 1 234,56 notation 😏`
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

          output(`${names[i]} 👉 ${names[j]} ${-(-delta[j])} ${currency}`)

          delta[i] = round(delta[i] + delta[j], 2)
          delta[j] = 0

        } else {

          output(`${names[i]} 👉 ${names[j]} ${-delta[i]} ${currency}`)

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
