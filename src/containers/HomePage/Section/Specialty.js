import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllSpecialty } from "../../../services/userService";
import "./Specialty.scss";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errorCode === 0) {
      this.setState({ dataSpecialty: res.data ? res.data : [] });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  render() {
    let { dataSpecialty } = this.state;

    return (
      <div className="section-specialty">
        <div className="specialty-content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-header">
                  <span className="title-section">
                    <FormattedMessage id="homepage.specialty-popular" />
                  </span>
                  <button className="btn-section">
                    <FormattedMessage id="homepage.more-infor" />
                  </button>
                </div>
              </div>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.slice(0, 6).map((item) => {
                  return (
                    <div
                      className="col-2"
                      key={item.id}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <div className="section-body">
                        <div
                          className="bg-image"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="specialty-name">{item.name}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
