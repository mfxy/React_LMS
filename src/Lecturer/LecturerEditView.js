import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Form, Input, Button, notification} from 'antd';
import {fetchLecturerById, saveLecturer, updateLecturer, deleteLecturerById} from '../api/lecturer';

export default class LecturerEditView extends React.Component{
    constructor(){
        super();
        this.state={
            lecturer:{LecturerDetail:{}}
        }
    }

    componentWillMount(){
        if('NEW'===this.props.match.params.id){
            this.setState({lecturer:{}});
        }else{
            fetchLecturerById(this.props.match.params.id)
                .then(response =>{
                    console.log(response.data);
                    this.setState({lecturer:response.data});
                })
                .catch(e =>{
                    alert(e);
                })
        }
    }

    handleSubmit(e){
        e.preventDefault();
        if('NEW'===this.props.match.params.id){
            saveLecturer(this.state.lecturer)
                .then(
                    notification.success({
                        message: 'Sucess',
                        description: 'Lecturer Added.',
                        duration: 0,
                        placement: 'topLeft',
                    })
                )
                .catch(e=>{
                    alert(e);
                })
        }else{
            updateLecturer(this.props.match.params.id,this.state.lecturer)
                .then(
                    notification.success({
                        message: 'Sucess',
                        description: 'Lecturer Updated.',
                        duration: 0,
                        placement: 'topLeft',
                    })
                )
                .catch(e=>{
                    alert(e);
                })     
        }
    }

    handleInputChange(e){
        const {name, value} = e.target;
        const lecturer = {...this.state.lecturer};
        lecturer[name] = value;
        this.setState({ lecturer });
        console.log(lecturer);
    }

    handleDelete(){
        deleteLecturerById(this.props.match.params.id)
            .then(
                notification.success({
                    message: 'Sucess',
                    description: 'Lecturer Deleted.',
                    duration: 0,
                    placement: 'topLeft',
                })
            )
            .catch(e =>{
                alert(e);
            })
    }
    
    render(){
        const {lecturer} = this.state;
        return(
            <Layout>
                <Layout.Content>
                    <Form style={{padding:"15px 35px"}}  onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Item>
                            <Input placeholder="Name" value={lecturer.Name} name='Name'
                                onChange={this.handleInputChange.bind(this)}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit"> Submit </Button>&nbsp;
                            <Button type="danger" onClick={this.handleDelete.bind(this)}> Delete </Button>&nbsp;
                            <Link to="/lecturers"><Button type="default"> Return </Button></Link>
                        </Form.Item>
                    </Form>
                </Layout.Content>
            </Layout>
        );
    }
}