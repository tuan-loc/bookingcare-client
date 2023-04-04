import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";
import "./MedicalFacility.scss";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = { dataClinics: [] };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errorCode === 0) {
      this.setState({ dataClinics: res.data ? res.data : [] });
    }
  }

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };

  render() {
    let { dataClinics } = this.state;

    return (
      <div className="section-medical-falcility">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-header">
                <span className="title-section">Cơ sở y tế nổi bật</span>
                <button className="btn-section">Xem thêm</button>
              </div>
            </div>
            {dataClinics &&
              dataClinics.length > 0 &&
              dataClinics.map((item) => {
                return (
                  <div
                    className="col-2 clinic-child"
                    key={item.id}
                    onClick={() => this.handleViewDetailClinic(item)}
                  >
                    <div className="section-body">
                      <div
                        className="bg-image section-medical-facility"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="clinic-name">{item.name}</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
