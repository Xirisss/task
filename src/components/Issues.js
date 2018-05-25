import React, { Component } from 'react';
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle';
import FaCheck from 'react-icons/lib/fa/check';
import { Link } from "react-router-dom";

const Issues = ({
  issuesObj,
  closeIssue,
  location
}) => (
  <div>
    <div className="issues-listing__header">
      <div className="issues-listing__states">
        <Link className={location.pathname === '/open' ? "btn-link btn-link--selected" : "btn-link"} type="button" to="open" style={{color: '#24292e'}}>
          <FaExclamationCircle height={16} className="fas fa-exclamation-circle" style={{marginRight: '5px'}} />
          {issuesObj.openIssues.length} Open
        </Link>
        <Link className={location.pathname === '/closed' ? "btn-link btn-link--selected" : "btn-link"} type="button" to="closed" style={{color: '#24292e'}}>
          <FaCheck className="fas fa-check" style={{marginRight: '5px'}} />
          {issuesObj.closedIssues.length} Closed
        </Link>
      </div>
    </div>
    <div className="issues-listing__body">
      <ul className="issues">
        { issuesObj.findIssues && issuesObj.findIssues.map((item, index) => {
          return(
            <li key={index} className="issues__item">
              <div className="issues__status issues__status--open">
                { item.state === 'open' ? <FaExclamationCircle height={16} className="fas fa-exclamation-circle" />
                  : item.state === 'closed' ? <FaCheck height={16} className="fas fa-exclamation-circle" />
                  : <div />
                }
              </div>
              <div className="issues__title">
                <a href="#" className="issues__link">
                  {item.title}
                </a>
              </div>
              { item.state === 'open' ? <button onClick={() => closeIssue(item)} className="btn issue__close" type="button">
                  Close issue
                </button>
                : <div />
              }
            </li>
          )
        }) }
      </ul>
    </div>
  </div>
)

export default Issues;
