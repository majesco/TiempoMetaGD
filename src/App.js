import React, { Component } from "react";
import { daysToGoal } from "./days";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { goal: 0, investment: 0, base: 0, days: 0, date: "" };
  }

  handleClick = () => {
    const daysObject = daysToGoal(
      Number(this.state.goal),
      Number(this.state.investment),
      Number(this.state.base)
    );

    this.setState({ days: daysObject.days });
    this.setState({ date: daysObject.date });
  };

  handleChangeGoal = (e) => {
    this.setState({ goal: e.target.value });
  };
  handleChangeInvestment = (e) => {
    this.setState({ investment: e.target.value });
  };
  handleChangeBase = (e) => {
    this.setState({ base: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <br />
            <h3>
              Cuántos días para alcanzar mi meta de inversión en Ganancias
              Deportivas?
            </h3>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4">
            <form>
              <div className="mb-3">
                <label className="form-label">
                  Meta de inversión en € Euros
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.goal}
                  onChange={this.handleChangeGoal}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Inversión Total Actual</label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.investment}
                  onChange={this.handleChangeInvestment}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Saldo Disponible Actual</label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.base}
                  onChange={this.handleChangeBase}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleClick}
              >
                Calcular
              </button>
            </form>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4">
            {this.state.date && (
              <div className="card border-success mb-3">
                <div className="card-header">Fecha para alcanzar meta!</div>
                <div className="card-body text-success">
                  <h5 className="card-title">
                    Dentro de {this.state.days} días
                  </h5>
                  <p className="card-text">
                    Alcanzaras la meta el {this.state.date.toString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
