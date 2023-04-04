import React, { Component } from "react";
import { connect } from "react-redux";

class HandBook extends Component {
  render() {
    return (
      <div className="section-handbook">
        <div className="specialty-content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-header">
                  <span className="title-section">Cẩm nang</span>
                  <button className="btn-section">Xem thêm</button>
                </div>
              </div>
              <div className="col-2">
                <div className="section-body">
                  <div className="bg-image"></div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className="col-2">
                <div className="section-body">
                  <div className="bg-image"></div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className="col-2">
                <div className="section-body">
                  <div className="bg-image"></div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className="col-2">
                <div className="section-body">
                  <div className="bg-image"></div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className="col-2">
                <div className="section-body">
                  <div className="bg-image"></div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className="col-2">
                <div className="section-body">
                  <div className="bg-image"></div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
