import React, { Component }                     from 'react'
import {Modal,Form}                             from 'react-bootstrap'
import {ArrowLeft}                              from 'react-bootstrap-icons'
import RegisterFormFooter                       from './RegisterFormFooter'
export  default class SignIn extends Component {
    
    render() {
        if(this.props.currentStep !==1){
            return null
        }
        else{
            return (
                <div>
                    <Modal.Header closeButton className="modal-header">
                        <div className="arrow-left">
                            <ArrowLeft onClick={()=> this.props.changeCurrentStep(0)}/>
                        </div>
                        <Modal.Title id="contained-modal-title-vcenter" className="modal-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                            <g id="account-icon" transform="translate(-453 -562)">
                                <path id="Icon" d="M0,16V14c0-2.2,3.6-4,8-4s8,1.8,8,4v2ZM4,4A4,4,0,1,1,8,8,4,4,0,0,1,4,4Z" transform="translate(453 562)" fill="#ff6a00"/>
                            </g>
                        </svg>
                        <h4>ورود/عضویت</h4>
                        <h6>{this.props.phoneNumber}</h6>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Control  id="code"  type="text" maxLength={5} placeholder="کد ارسالی" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>  
                    <RegisterFormFooter 
                        phoneNumber={this.props.phoneNumber}
                        isRegistered ={this.props.isRegistered}
                        />
                </div>
            )
        }

    }
}
       


 