import React from "react";
import './Landing.css';

class Landing extends React.Component{
    render() {
        return (
            <div>
                <div className="home-page">
                    <section className="section_body_head">
                      <div className="body-contain">
                        <div className="heading-title">
                          <h1 className="title">Welcome to SSH Manager</h1>
                        </div>
                        <div className="presentation1">
                          <p>Please SIGN UP or SIGN IN to start SSH Manager</p>
                        </div>
                        <div className="presentation">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer convallis ornare sollicitudin. Ut eget lacinia urna, mattis venenatis arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                          </p>
                        </div>
                      </div>
                      <div className="container">
                      </div>
                    </section>
                </div>
                <div>
                    
                </div>
                <div id="page-footer">
                    <span>FOOTER HERE WITH SOCIAL MEDIA TAGS, COPYRIGHT ETC.</span>
                </div>
            </div>
        );
    }
}

export default Landing;
