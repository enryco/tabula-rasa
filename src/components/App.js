import React, { Component } from 'react';
import Button from './elements/Button';
import Input from './elements/Input';
import TitleBar from './elements/TitleBar';
import InfoBar from './elements/InfoBar';
import Result from './elements/Result';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { parseAndCalculateDepts } from '../functions'


class App extends Component {

  state = {
    step: 'start',
    result: null,
    data: '',
    placeholder: '',
    window: {}
  }


  componentDidMount() {
    window.onresize = (e) => {
      this.setState({
        window: {
          innerHeight: e.target.innerHeight,
          innerWidth: e.target.innerWidth,
        }
      })
    }
  }

  updatePlaceholder = placeholder => this.setState({ placeholder })

  setData = data => {
    this.setState({ data })
  }

  getResults = () => {
    const { data, placeholder } = this.state

    const result = parseAndCalculateDepts(data ? data : placeholder)
    if (result.error) return alert(result.error)
    this.setState({ result, step: 'results' })
  }

  getInterface = (step) => {
    switch (step) {
      case 'start':
        return <div className="tr-app" >
          <TitleBar text="Who payed how much?" />
          <InfoBar text="Info" onClick={() => this.setState({ step: 'info' })} />
          <Input
            data={this.state.data}
            setData={this.setData}
            updatePlaceholder={this.updatePlaceholder}
          />
          <Button
            firstline="🤑"
            secondline="Tabula Rasa!"
            onClick={() => this.getResults()}
          />
        </div>

      case 'results':
        return <div className="tr-app" >
          <TitleBar text="Ok cool. Go back." onClick={() => this.setState({ step: 'start' })} />
          <InfoBar text="Info" onClick={() => this.setState({ step: 'info' })} />
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
          <TitleBar text="See Source Code!" onClick={() => window.open("https://github.com/enryco/tabula-rasa")} />
          <InfoBar text="Info" onClick={() => this.setState({ step: 'info' })} />
          <Result html={'<br /><div>😌<br />☕️</div>Copied. Enjoy!'} />
          <Button
            onClick={() => this.setState({ step: 'start' })}
            firstline={""}
            secondline="Restart"
          />
        </div>

      case 'info':
        return <div style={{
          width: "100%",
          height: "100%",
          padding: "10vw",
          overflow: "auto",
        }} >
          <div style={{ width: 150 }}>
            <Button secondline="BACK" onClick={() => this.setState({ step: 'start' })} />
          </div>
          <br />
          <div>{INFOTEXT}</div>
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




const INFOTEXT = <div> <p>You are on a trip with three friends.
  You want to split the costs of the whole trip among each other equally.
  So you sum up how much everyone has payed during the trip, for example:
 </p>
  <p>
    Peter 5€ <br />
    Simone 10€ <br />
    Alfred 30€ <br />
  </p>
  <p>So… who pays who how much to equalize the trip costs?</p>
  <p>Copy & Paste into this App and a hit on <span style={{ background: "#FFD300" }}> 🤑 Tabula Rasa! </span> reveals the solution:</p>
  <p>
    Peter 👉 Alfred 10 € <br />
    Simone 👉 Alfred 5 € <br />
  </p>
  <p>
    So everyone payed 15€ in total and everyone is happy 🙂 <br />
  </p>
  <p>***</p>
  <p>
    <a href="https://enricoscherlies.com">enricoscherlies.com/</a><br />
    <a href="https://github.com/enryco/tabula-rasa">github.com/enryco/tabula-rasa</a>
  </p>
  <p>***</p>
  <p>
    No 🍪  in this app.
  </p>
</div>
