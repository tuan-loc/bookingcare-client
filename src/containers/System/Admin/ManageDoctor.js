import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      hasOldData: false,
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
      selectedSpecialty: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchRequiredDoctorInfor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        listDoctors: this.props.allDoctors,
      });
    }

    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfor;
      this.setState({
        listPrice: resPrice,
        listPayment: resPayment,
        listProvince: resProvince,
        listSpecialty: resSpecialty,
        listClinic: resClinic,
      });
    }
  }

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctorData({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectedPrice: this.state.selectedPrice,
      selectedPayment: this.state.selectedPayment,
      selectedProvince: this.state.selectedProvince,
      selectedClinic: this.state.selectedClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.clinicId,
      specialtyId: this.state.specialtyId,
    });
  };

  handleEditorChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = async (event) => {
    this.setState({ selectedDoctor: event.target.value });

    let res = await getDetailInforDoctor(event.target.value);
    if (res && res.errorCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        selectedSpecialty = "",
        clinicId = "",
        selectedClinic = "",
        specialtyId = "";

      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        priceId = res.data.Doctor_Infor.priceId;
        paymentId = res.data.Doctor_Infor.paymentId;
        provinceId = res.data.Doctor_Infor.provinceId;
        specialtyId = res.data.Doctor_Infor.specialtyId;
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        selectedClinic: nameClinic,
        note: note,
        selectedPrice: priceId,
        selectedPayment: paymentId,
        selectedProvince: provinceId,
        specialtyId: specialtyId,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        selectedClinic: "",
        note: "",
        selectedSpecialty: "",
        specialtyId: "",
      });
    }
  };

  render() {
    let {
      listDoctors,
      hasOldData,
      listPrice,
      listPayment,
      listProvince,
      listSpecialty,
      listClinic,
    } = this.state;

    return (
      <div className="manage-doctor-container">
        <div className="container">
          <div className="manage-doctor-title">
            <FormattedMessage id="admin.manage-doctor.title" />
          </div>
          <div className="more-infor">
            <div className="content-left form-group my-3">
              <label>
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              </label>
              <select
                onChange={this.handleChange}
                className="form-control my-1"
                value={this.state.selectedDoctor}
                name="selectedDoctor"
              >
                <option>Chọn bác sĩ</option>
                {listDoctors &&
                  listDoctors.length > 0 &&
                  listDoctors.map((doctor) => {
                    let nameVi =
                      this.props.language === LANGUAGES.VI
                        ? `${doctor.lastName} ${doctor.firstName}`
                        : `${doctor.lastName} ${doctor.firstName}`;
                    return (
                      <option key={doctor.id} value={doctor.id}>
                        {nameVi}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="content-right my-3">
              <label>
                <FormattedMessage id="admin.manage-doctor.intro" />
              </label>
              <textarea
                onChange={this.handleEditorChange}
                value={this.state.description}
                name="description"
                className="form-control my-1"
              ></textarea>
            </div>
          </div>
          <div className="more-infor-extra row">
            <div className="col-4 form-group my-3">
              <label>
                <FormattedMessage id="admin.manage-doctor.price" />
              </label>
              <select
                onChange={this.handleEditorChange}
                className="form-control my-1"
                value={this.state.selectedPrice}
                name="selectedPrice"
              >
                <option>Chọn giá</option>
                {listPrice &&
                  listPrice.length > 0 &&
                  listPrice.map((payment) => {
                    let nameVi =
                      this.props.language === LANGUAGES.VI
                        ? `${payment.valueVi}`
                        : `${payment.valueEn} USD`;
                    return (
                      <option key={payment.id} value={payment.keyMap}>
                        {nameVi}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-4 form-group my-3">
              <label>
                <FormattedMessage id="admin.manage-doctor.payment" />
              </label>
              <select
                onChange={this.handleEditorChange}
                className="form-control my-1"
                value={this.state.selectedPayment}
                name="selectedPayment"
              >
                <option>Chọn phương thức thanh toán</option>
                {listPayment &&
                  listPayment.length > 0 &&
                  listPayment.map((price) => {
                    let nameVi =
                      this.props.language === LANGUAGES.VI
                        ? `${price.valueVi}`
                        : `${price.valueEn}`;
                    return (
                      <option key={price.id} value={price.keyMap}>
                        {nameVi}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-4 form-group my-3">
              <label>
                <FormattedMessage id="admin.manage-doctor.province" />
              </label>
              <select
                onChange={this.handleEditorChange}
                className="form-control my-1"
                value={this.state.selectedProvince}
                name="selectedProvince"
              >
                <option>Chọn tỉnh thành</option>
                {listProvince &&
                  listProvince.length > 0 &&
                  listProvince.map((province) => {
                    let nameVi =
                      this.props.language === LANGUAGES.VI
                        ? `${province.valueVi}`
                        : `${province.valueEn}`;
                    return (
                      <option key={province.id} value={province.keyMap}>
                        {nameVi}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-4 form-group my-3">
              <label>
                <FormattedMessage id="admin.manage-doctor.nameClinic" />
              </label>
              <input
                className="form-control"
                onChange={this.handleEditorChange}
                value={this.state.selectedClinic}
                name="selectedClinic"
              />
            </div>
            <div className="col-4 form-group my-3">
              <label>
                <FormattedMessage id="admin.manage-doctor.addressClinic" />
              </label>
              <input
                className="form-control"
                onChange={this.handleEditorChange}
                value={this.state.addressClinic}
                name="addressClinic"
              />
            </div>
            <div className="col-4 form-group my-3">
              <label>
                <FormattedMessage id="admin.manage-doctor.note" />
              </label>
              <input
                className="form-control"
                onChange={this.handleEditorChange}
                value={this.state.note}
                name="note"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.specialty" />
              </label>
              <select
                onChange={this.handleEditorChange}
                className="form-control my-1"
                value={this.state.specialtyId}
                name="specialtyId"
              >
                <option>Chọn chuyên khoa</option>
                {listSpecialty &&
                  listSpecialty.length > 0 &&
                  listSpecialty.map((specialty) => {
                    let nameVi =
                      this.props.language === LANGUAGES.VI
                        ? `${specialty.valueVi}`
                        : `${specialty.valueEn}`;
                    return (
                      <option key={specialty.id} value={specialty.id}>
                        {specialty.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.select-clinic" />
              </label>
              <select
                onChange={this.handleEditorChange}
                className="form-control my-1"
                value={this.state.clinicId}
                name="clinicId"
              >
                <option>Chọn phòng khám</option>
                {listClinic &&
                  listClinic.length > 0 &&
                  listClinic.map((clinic) => {
                    let nameVi =
                      this.props.language === LANGUAGES.VI
                        ? `${clinic.valueVi}`
                        : `${clinic.valueEn}`;
                    return (
                      <option key={clinic.id} value={clinic.id}>
                        {clinic.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="manage-doctor-editor">
            <div className="row">
              <div className="col-6 form-group my-3">
                <label>Content Markdown:</label>
                <textarea
                  value={this.state.contentMarkdown}
                  onChange={(event) => this.handleEditorChange(event)}
                  className="form-control my-1"
                  rows={20}
                  placeholder="Content Markdown"
                  name="contentMarkdown"
                ></textarea>
              </div>
              <div className="col-6 form-group my-3">
                <label>Content HTML:</label>
                <textarea
                  value={this.state.contentHTML}
                  onChange={(event) => this.handleEditorChange(event)}
                  className="form-control my-1"
                  rows={20}
                  placeholder="Content HTML"
                  name="contentHTML"
                ></textarea>
              </div>
            </div>
            <div className="col-12">
              <button
                className={
                  hasOldData
                    ? "save-content-doctor px-2"
                    : "create-content-doctor"
                }
                onClick={() => this.handleSaveContentMarkdown()}
              >
                {hasOldData ? (
                  <span>
                    <FormattedMessage id="admin.manage-doctor.save" />
                  </span>
                ) : (
                  <span>
                    <FormattedMessage id="admin.manage-doctor.add" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctorData: (data) =>
      dispatch(actions.saveDetailDoctorData(data)),
    fetchRequiredDoctorInfor: () =>
      dispatch(actions.fetchRequiredDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
