import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctors: this.props.topDoctors,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };

  render() {
    let { arrDoctors } = this.state;
    let { language } = this.props;
    return (
      <div className="section-outstanding-doctor">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-header">
                <span className="title-section">
                  <FormattedMessage id="homepage.outstanding-doctor" />
                </span>
                <button className="btn-section">
                  <FormattedMessage id="homepage.more-infor" />
                </button>
              </div>
            </div>
            {arrDoctors &&
              arrDoctors.length > 0 &&
              arrDoctors.slice(0, 6).map((item) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                return (
                  <div
                    className="col-2"
                    key={item.id}
                    onClick={() => this.handleViewDetailDoctor(item)}
                  >
                    <div className="section-body">
                      <div className="section-border">
                        <div className="outer-bg">
                          <div
                            className="bg-image"
                            style={{
                              backgroundImage: `url(${imageBase64})`,
                            }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>Cơ xương khớp</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
    topDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
