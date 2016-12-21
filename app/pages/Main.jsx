import React from 'react';
import { connect } from 'react-redux';
import PageLoading from '../shared/PageLoading';

function Main(props) {
  console.log('Main props');
  console.log(props);
  if (!props.profile) {
    return (<PageLoading />);
  }

  return (
    <div>
      <h1 className="sinc-page-header">CFT Membership System - Main page</h1>
      <p>
        {
          // Be mindful of JSX's painful handling of whitespace...
        }
        Welcome to the new CFT Online Membership System.
        You are logged in as
        {props.profile.first_name} {props.profile.last_name} CFT# {props.profile.id}.
      </p>
      <p>
        We hope you are enjoying being being part of Ireland&apos;s largest diving
        and snorkeling community. CFT is a not for profit organisation,
        we are here to support you and make your diving and snorkeling memorable
        and safe. Feel free to contact us anytime, we would love to hear how you are
        getting on. Keep an eye on our
        website <a href="http://www.diving.ie" target="_blank" rel="noopener noreferrer">www.diving.ie</a> for
        lists of upcoming courses and events as well as our Facebook and Twitter pages.
        We look forward to seeing you at a dive or snorkel site soon.
      </p>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
  };
}

export default connect(mapStateToProps)(Main);
