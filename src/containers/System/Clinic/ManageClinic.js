import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { createNewClinic } from "../../../services/userService";

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionMarkdown: "",
      descriptionHTML: "",
      name: "",
      imageBase64: "",
      address: "",
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleEditorChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOnChangeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({ imageBase64: base64 });
    }
  };

  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errorCode === 0) {
      toast.success("Add new clinic succeeds !");
      this.setState({
        descriptionMarkdown: "",
        descriptionHTML: "",
        name: "",
        imageBase64: "",
        address: "",
      });
    } else {
      toast.error("Something wrongs ...");
    }
  };

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý phòng khám</div>
        <div className="add-new-specialty">
          <div className="row">
            <div className="col-6 form-group">
              <label>Tên phòng khám</label>
              <input
                className="form-control"
                type="text"
                value={this.state.name}
                name="name"
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
            <div className="col-6 form-group">
              <label>Ảnh phòng khám</label>
              <input
                className="form-control"
                type="file"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>
            <div className="col-6 form-group">
              <label>Địa chỉ phòng khám</label>
              <input
                className="form-control"
                type="text"
                value={this.state.address}
                name="address"
                onChange={(event) => this.handleOnChangeInput(event)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 form-group my-3">
              <label>Content Markdown:</label>
              <textarea
                value={this.state.descriptionMarkdown}
                onChange={(event) => this.handleEditorChange(event)}
                className="form-control my-1"
                rows={20}
                placeholder="Content Markdown"
                name="descriptionMarkdown"
              ></textarea>
            </div>
            <div className="col-6 form-group my-3">
              <label>Content HTML:</label>
              <textarea
                value={this.state.descriptionHTML}
                onChange={(event) => this.handleEditorChange(event)}
                className="form-control my-1"
                rows={20}
                placeholder="Content HTML"
                name="descriptionHTML"
              ></textarea>
            </div>
          </div>
          <div className="col-12">
            <button
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewClinic()}
            >
              Save
            </button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
