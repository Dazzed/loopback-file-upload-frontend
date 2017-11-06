import React, { Component } from 'react';

import { get, post } from '../../util';

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: true,
      current_user: null
    };
  }

  async componentWillMount() {
    const user_details = window.localStorage.getItem('user_details');
    if (!user_details) {
      this.props.router.replace('login');
    } else {
      try {
        const { id } = JSON.parse(user_details);
        const { data: users } = await get(`users?access_token=${id}`);
        this.setState({ users, loading: false, current_user: JSON.parse(user_details) });
      } catch (e) {
        window.location.reload();
      }
      
    }
  }

  handleUploadFile = (event, email) => {
    const { current_user } = this.state;
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('id', current_user.userId);
    data.append('user', email);
    post(`users/uploadfile?access_token=${current_user.id}`, data).then((response) => {
      window.location.reload();
    }, err => {
      alert(err.data.message);
    });
  }

  renderUsers = () => {
    const { users } = this.state;
    const userList = users.map((u, i) => {
      return (
        <div key={i}>
          <li style={{color:'#147CE0'}}>Email: {u.email}</li>
          <li style={{color:'#147CE0'}}>{u.description}</li>
          <li style={{color: u.eye}}>Eye: {u.eye}</li>
          <li><img src={u.fileurl} width={100} height={100} alt="Image not found" /></li>
          <br />
          <br />
          <input type="file" name="file" onChange={(evt) => this.handleUploadFile(evt, u.email)} />
          <hr />
        </div>
      );
    });
    return (
      <ul style={{width: '100%'}}>
        {userList}
      </ul>
    );
  }

  async logout () {
    try {
      const { current_user } = this.state;
      window.localStorage.removeItem('user_details');
      const { data } = await post(`users/logout?access_token=${current_user.id}`);
      this.props.router.push('login');
    } catch (e) {
      alert(e);
    }
  }

  renderLogout = () => {
    return (
      <div>
        <button onClick={this.logout.bind(this)}>Logout</button>
        <br />
        <br />
      </div>
    );
  }

  render() {
    const {
      loading
    } = this.state;
    if (loading) return <p>Loading...</p>;
    return (
      <div>
        {this.renderLogout()}
        {this.renderUsers()}
      </div>
    );
  }
}

export default UserList;
