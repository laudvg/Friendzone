import React, { Component } from "react";

export default class InputName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  createChatUser(e) {
    e.preventDefault();
    this.props.createChatUser(this.state.username);
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <Hero isColor="info" isSize="large" className="hero-section">
        <HeroBody>
          <Columns isCentered isVCentered>
            <Column isSize={{ mobile: 8, default: 4 }}>
              <form onSubmit={e => this.createChatUser(e)}>
                <Field isGrouped>
                  <Input
                    onChange={e => this.handleChange(e)}
                    type="text"
                    placeholder="your name..."
                    value={this.state.username}
                  />
                  <Control>
                    <Button
                      isColor="danger"
                      onClick={e => this.createChatUser(e)}
                    >
                      Chat!
                    </Button>
                  </Control>
                </Field>
              </form>
            </Column>
          </Columns>
        </HeroBody>
      </Hero>
    );
  }
}