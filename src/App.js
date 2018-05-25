import React, { Component } from 'react';
import './main.css';
import axios from 'axios';
import FaGithub from 'react-icons/lib/fa/github';
import FaBook from 'react-icons/lib/fa/book';
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle';
import { Route, Redirect, withRouter } from 'react-router';
import { Switch } from "react-router-dom";
import Issues from './components/Issues'
import RouteWithLayout from "./layouts/RouteWithLayout"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: [],
      filter: '',
      path: props.location.pathname.slice(1)
    }
  }

  componentDidMount = () => {
    axios({
      method: 'get',
      url: './data.json',
    })
    .then(res => {
      this.setState({
        issues: res.data,
      })
    })
    .catch(error => console.log('error:', error))
  }

  componentWillReceiveProps = (nextprops) => {
    if (this.props.location.pathname !== nextprops.location.pathname) {
      this.setState({
        filter: '',
        path: nextprops.location.pathname.slice(1)
      })
    }
  }

  addIssues = () => {
    const { issues } = this.state
    const newIssue ={
      "id": Math.random().toString(36).substr(2, 9),
      "title": "Slow production build",
      "state": "open"
    }
    const newIssues = issues.slice()
    newIssues.push(newIssue)
    this.setState({
      issues: newIssues,
      filter: '',
    })
  }

  closeIssue = item => {
    const { issues } = this.state
    const index = issues.findIndex(issue => issue.id === item.id)
    const newIssues = [
      ...issues.slice(0, index),
      {
        ...item,
        state: 'closed'
      },
      ...issues.slice(index + 1)
    ]
    this.setState({
      issues: newIssues,
      filter: '',
    })
  }

  findIssues = value => {
    this.setState({filter: value})
  }

  render() {
    const { issues, filter, path } = this.state
    const openIssues = []
    const closedIssues = []
    const findIssues = []
    issues.forEach((item, index) => {
      if (item.state === 'open') openIssues.push(item)
      else if (item.state === 'closed') closedIssues.push(item)
      if (path === item.state && item.title.toLowerCase().indexOf(filter) !== -1 ) findIssues.push(item)
    })
    const issuesObj = {
      issues,
      openIssues,
      closedIssues,
      findIssues,
    }
    return (
      <div>
        <header className="header">
          <div className="container">
            <a className="header-logo" href="https://github.com/">
              <FaGithub size={32} className="fab fa-github fa-3x" />
            </a>
          </div>
        </header>
        <main className="content">
          <div className="pagehead">
            <div className="container repohead-container">
              <h1 className="pagehead-title">
                <FaBook className="fa fa-book" />
                <a href="https://github.com/facebook"> captiv8io</a>
                <span> /</span>
                <b><a href="https://github.com/facebook/react"> interview</a></b>
              </h1>
            </div>
            <div className="container">
              <nav className="reponav">
                <a href="#" className="reponav-item selected">
                  <FaExclamationCircle height={16} className="fas fa-exclamation-circle" />
                  <span> Issues </span>
                  <span className="counter">{issues.length}</span>
                </a>
              </nav>
            </div>
          </div>
          <div className="container">
            <div className="issues-listing">
              <div className="issues-listing__subnav">
                <div className="subnav">
                  <form className="subnav__search">
                    <input value={filter} onChange={(e) => this.findIssues(e.target.value)} className="subnav__search-input" type="text" placeholder="Search" />
                  </form>
                  <button onClick={this.addIssues} className="btn btn-primary" type="button">
                    New issue
                  </button>
                </div>
              </div>
              <Switch>
                <RouteWithLayout path="/open" component={Issues} issuesObj={issuesObj} closeIssue={this.closeIssue}/>
                <RouteWithLayout path="/closed" component={Issues} issuesObj={issuesObj} closeIssue={this.closeIssue} />
                <Route path="/" render={() => <Redirect to="/open" />} />
              </Switch>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(App);
