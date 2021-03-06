import React, { Component } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './common.css';
import CreateImg from './images/create_model.svg';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border: '3px solid #7096C9',
    backgroundColor: '#E5ECFF',
    padding: '0'
  }
};


class CreateNewModel extends Component {
  constructor(props) {
    super();
    this.state = {
      modalIsOpen: false,
      name: '',
      dataset: null,
      description: '',
      datasetList: [],
      nonCategorical: '',
      targetVariable: '',
      target_var_alias: '',
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.clickCancel = this.clickCancel.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.staticDatasetList) {
      this.setState({
        datasetList: this.props.staticDatasetList
      });
    } else {
      fetch ("/api/dataset/?format=json", {
        method: "GET",
        headers: {"Content-Type" : "application/json;charset=UTF-8"},
      }).then( res => res.json()).then(data => {
        this.setState({
          datasetList: data.map(x => ({value: x.id, label: x.name}))
        });
      }).catch(error => console.error("Request failed:", error));
    }
  }
  
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  clickCancel() {
    this.setState({
      name: '',
      dataset: null,
      description: '',
      nonCategorical: '',
      targetVariable: '',
      target_var_alias: '',
    });
    this.closeModal();
  }

  handleChange(event) {
    var key = event.target.name;
    this.setState({[key]: event.target.value});
  }

  handleSelectChange(newOption) {
    this.setState({dataset: newOption});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name.length === 0) {alert("Please input a name."); return;}
    let newModel = {
      name: this.state.name,
      description: this.state.description,
      dataset_id: this.state.dataset.value,
      non_categorical_columns: this.state.nonCategorical,
      target_variable: this.state.targetVariable,
      target_var_alias: this.state.target_var_alias,
    }
    fetch ("/api/newmodel/", {
      method: "POST",
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(newModel)
    }).then(res => {
      this.closeModal();
      this.props.onChange();
    }).catch(error => {
      console.error('Request failed: ', error);
      alert('Request failed: ' + error);
    });
  }

  render() {
    const { dataset } = this.state;
    const datasetValue = dataset && dataset.value;

    return (
      <span>
        <div className="toolbar" onClick={this.openModal}>
          <img src={CreateImg} className="icon_btn" alt="icon"/>
          New...
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Create New Model">
          <div className="modal_label">
            Create a new model based on a dataset
          </div>
          <div className="modal_main">
            <form method="post" onSubmit={this.handleSubmit}>
              <label>Dataset</label>
              <Select
                name="dataset"
                value={datasetValue}
                onChange={this.handleSelectChange}
                options={this.state.datasetList}
                required={true}
              />
              <br/>
              <label>Name</label>
              <br/>
              <input className="edit_box" type="text" id="name" name="name" value={this.state.name} onChange={this.handleChange} required/>
              <br/> <br/>
              <label>Description</label>
              <br/>
              <input className="edit_box" type="text" id="description" name="description" value={this.state.description} onChange={this.handleChange}/>
              <br/> <br/>
              <label>Non-categorical variables, as a comma-separated list</label>
              <br/>
              <input className="edit_box" type="text" name="nonCategorical" value={this.state.nonCategorical} onChange={this.handleChange}/>
              <br/> <br/>
              <label>Target variable (must be binary)</label>
              <br/>
              <input className="edit_box" type="text" name="targetVariable" value={this.state.targetVariable} onChange={this.handleChange} required/>
              <br/> <br/>
              <label>Meaning of the target variable being true</label>
              <br/>
              <input className="edit_box" type="text" name="target_var_alias" value={this.state.target_var_alias} onChange={this.handleChange} required/>
              <br/> <br/>
              <div className="dialog_bottom_buttons">
                <input type="submit" className="btn" value="Create"/>
                <button onClick={this.clickCancel} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </Modal>
      </span>
    );
  }
}

export default CreateNewModel;
