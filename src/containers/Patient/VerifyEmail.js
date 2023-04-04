import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { postVerifyBookingAppointment } from "../../services/userService";
import HomeHeader from "../../containers/HomePage/HomeHeader";
import "./VerifyEmail.scss";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = { statusVerify: false, errCode: 0 };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifyBookingAppointment({ token, doctorId });
      if (res && res.errorCode === 0) {
        this.setState({ statusVerify: true, errCode: res.errorCode });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errorCode ? res.errorCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { statusVerify, errCode } = this.state;

    return (
      <>
        <HomeHeader />
        <div className="verify-email-container">
          {!statusVerify ? (
            <div>Loading data ...</div>
          ) : (
            <div>
              {errCode === 0 ? (
                <div className="infor-booking">
                  Xác nhận lịch hẹn thành công!
                </div>
              ) : (
                <div className="infor-booking">
                  Lịch hẹn không tồn tại hoặc đã được xác nhận!
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
