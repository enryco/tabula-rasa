import React, { Component } from 'react';
import Button from './elements/Button';
import Input from './elements/Input';
import TitleBar from './elements/TitleBar';
import Result from './elements/Result';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { parseAndCalculateDepts } from '../functions'


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
    const result = parseAndCalculateDepts(this.state.data)
    if (result.error) return alert(result.error)
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
          <TitleBar text="Got to Source Code!" onClick={() => window.open("https://github.com/enryco/tabula-rasa")} />
          <Result html={'<br /><div>😌<br />☕️</div>Copied. Enjoy!'} />
          <Button
            onClick={() => this.setState({ step: 'start' })}
            firstline={""}
            secondline="Restart"
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



