import React, { Component } from 'react';
import './welcome.css';

interface WelcomeProps {
  onComplete: () => void;
}
interface WelcomeState {
  showFirstGif: boolean;
  showFirstGifpart2:boolean;
  showSecondGif: boolean;
  answer: string;
  liar: boolean;
  noIdentity: boolean;
  setShowWelcome: boolean;
}

class Welcome extends Component<WelcomeProps, WelcomeState> {
  state: WelcomeState = {
    showFirstGif: true,
    showFirstGifpart2:false,
    showSecondGif: false,
    answer: '',
    liar: false,
    noIdentity: false,
    setShowWelcome:false,
  };

  notConfirmIndentity = () => {
    this.setState({ showFirstGif: false,showFirstGifpart2: false ,noIdentity: true });
  };

  confirmIdentity = () => {
    this.setState({ showFirstGif: false, showFirstGifpart2: true });
  };

  confirmIdentityPart2 = () => {
    this.setState({ showFirstGifpart2: false, showSecondGif: true });
  };

  submitAnswer = () => {
    if (this.state.answer.toLowerCase() === 'bangaram@171223') {
      this.props.onComplete();
    } else {
      this.setState({
        showFirstGif: false,
        showFirstGifpart2:false,
        showSecondGif: false,
        liar: true,
      });
    }
  };

  liarFun = () => {
    this.setState({ liar: false, noIdentity: false, showFirstGif: true });
  };

  render() {
    const {
      showFirstGif,
      showFirstGifpart2,
      showSecondGif,
      liar,
      noIdentity,
    } = this.state;

    return (
      <div className="login-container">
        {showFirstGif && (
          <div className="top-gif">
            <img src="./src/assets/cute-love-bear-roses.gif" alt="First GIF" />
            <h1>Are you Ankitha?</h1>
            <div className="button-container">
              <button className="yes-button" onClick={this.confirmIdentity}>
                Yes
              </button>
              <button className="no-button" onClick={this.notConfirmIndentity}>
                No
              </button>
            </div>
          </div>
        )}
        {showFirstGifpart2 && (
          <div className="top-gif">
            <img src="./src/assets/hmm-suspect.gif" alt="First GIF" />
            <h1>Are you My Ankitha?</h1>
            <div className="button-container">
              <button className="yes-button" onClick={this.confirmIdentityPart2}>
                Yes
              </button>
              <button className="no-button" onClick={this.notConfirmIndentity}>
                No
              </button>
            </div>
          </div>
        )}
        {showSecondGif && (
          <div className="second-gif">
            <img src="./src/assets/favorite-person-i-see-you.gif" alt="Second GIF" />
            <h2>Then Enter the Password.</h2>
            <input
              type="password"
              value={this.state.answer}
              onChange={(e) => this.setState({ answer: e.target.value })}
              placeholder="Enter your amazing secret"
              className="input-field"/>
            <div className="button-container">
              <button className="submit-button" onClick={this.submitAnswer}>
                Submit
              </button>
            </div>
          </div>
        )}
        {liar && (
          <div className="liar">
            <img src="./src/assets/tkthao219-bunny.gif" alt="Liar GIF" />
            <h2>You are a Liar!</h2>
            <div className="button-container">
              <button className="bye-button" onClick={this.liarFun}>
                Bye!
              </button>
            </div>
          </div>
        )}
        {noIdentity && (
          <div className="noIdentity">
            <img src="./src/assets/cute-dog.gif" alt="No Identity GIF" />
            <h2>This is not for you then</h2>
            <div className="button-container">
              <button className="bye-button" onClick={this.liarFun}>
                Bye!
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Welcome;
