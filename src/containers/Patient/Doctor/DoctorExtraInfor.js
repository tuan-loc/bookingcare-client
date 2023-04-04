import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getExtraInforDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils/constant";
import "./DoctorExtraInfor.scss";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: true,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.detailDoctor);
      if (res && res.errorCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }

    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      let res = await getExtraInforDoctorById(this.props.detailDoctor);
      if (res && res.errorCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({ isShowDetailInfor: status });
  };

  render() {
    let { extraInfor } = this.state;
    let { language } = this.props;

    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-infor-doctor.text-address" />
          </div>
          <div className="name-clinic">
            {extraInfor && extraInfor.nameClinic}
          </div>
          <div className="detail-address">
            {extraInfor && extraInfor.addressClinic}
          </div>
        </div>
        <div className="content-down">
          {this.state.isShowDetailInfor ? (
            <>
              <div className="short-infor">
                <FormattedMessage id="patient.extra-infor-doctor.price" />
                <span className="currency">
                  {extraInfor &&
                    extraInfor.priceTypeData &&
                    language === LANGUAGES.VI &&
                    `${extraInfor.priceTypeData.valueVi} VND`}
                </span>
                <span className="currency">
                  {extraInfor &&
                    extraInfor.priceTypeData &&
                    language === LANGUAGES.EN &&
                    `${extraInfor.priceTypeData.valueEn} USD`}
                </span>
                <span
                  className="detail"
                  onClick={() => this.showHideDetailInfor(false)}
                >
                  <FormattedMessage id="patient.extra-infor-doctor.detail" />
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.extra-infor-doctor.price" />
              </div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">
                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                  </span>
                  <span className="right">
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.VI &&
                      `${extraInfor.priceTypeData.valueVi} VND`}
                    {extraInfor &&
                      extraInfor.priceTypeData &&
                      language === LANGUAGES.EN &&
                      `${extraInfor.priceTypeData.valueEn} USD`}
                  </span>
                </div>
                <div className="note">{extraInfor && extraInfor.note}</div>
              </div>
              <div className="payment">
                <FormattedMessage id="patient.extra-infor-doctor.payment" />
                {extraInfor &&
                extraInfor.paymentTypeData &&
                language === LANGUAGES.VI
                  ? extraInfor.paymentTypeData?.valueVi
                  : extraInfor.paymentTypeData?.valueEn}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(true)}>
                  <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                </span>
              </div>
            </>
          )}
          <div></div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
