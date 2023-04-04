import React, { Component } from "react";
import { connect } from "react-redux";
import HomeFooter from "./HomeFooter";
import HomeHeader from "./HomeHeader";
import About from "./Section/About";
import Specialty from "./Section/Specialty";
import "./HomePage.scss";
import MedicalFacility from "./Section/MedicalFacility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/HandBook";

class HomePage extends Component {
  render() {
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty />
        <MedicalFacility />
        <OutStandingDoctor />
        <HandBook />
        <About />
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
