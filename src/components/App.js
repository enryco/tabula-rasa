import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';
import TitleBar from './TitleBar';
import Result from './Result';
import { CopyToClipboard } from 'react-copy-to-clipboard';



class App extends Component {

  state = {
    step: 'start',
    result: null,
    data: ''
  }


  componentDidMount() {
  }

  setData = data => {
    this.setState({ data })
  }

  getResults = () => {
    const result = calc(this.state.data)
    this.setState({ result, step: 'results' })
  }

  getInterface = (step) => {
    switch (step) {
      case 'start':
        return <div className="tr-app" >
          <TitleBar text="Who payed how much?" />
          <Input setData={this.setData} />
          <Button
            firstline="🤑"
            secondline="Tabula Rasa!"
            onClick={() => this.getResults()}
          />
        </div>

      case 'results':
        return <div className="tr-app" >
          <TitleBar text="Ok cool." />
          <Result html={this.state.result.html} />
          <CopyToClipboard
            text={this.state.result.text}
            onCopy={() => this.setState({ step: 'copied' })}
          >
            <Button
              firstline="💁‍"
              secondline="Copy!"
            />
          </CopyToClipboard>
        </div>

      case 'copied':
        return <div className="tr-app" >
          <TitleBar text="Copied!" />
          <Result html={'<br /><div>😌<br />☕️</div>Enjoy!'} />
          <Button
            onClick={() => this.setState({ step: 'start' })}
            firstline={"🤪"}
            secondline="Start Over."
          />
        </div>

      default:
        break;
    }
  }

  render() {
    return (
      <div className="tr-app-container" >
        {this.getInterface(this.state.step)}
      </div>
    );
  }
}

export default App;



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
const calc = (rawData) => {

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

    // else push text
    names.push(elem)
  })

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

  return { html, text }
}
