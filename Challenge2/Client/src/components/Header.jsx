import React from 'react';

const Header = (props) => {
  return (
    <div>
      <H1 />
      <Toggle CPU={props.CPU} memory={props.memory} />
    </div>
  );
};

const H1 = (props) => {
  return (
    <h1 className="header">Operating System Monitor</h1>
  );
};

const Toggle = (props) => {
  return (
    <div className="toggle">
      <input onClick={e => props.CPU()}className="CPU" type="radio" name="Metric" value="CPU"></input>
      <label value="CPU">CPU</label><br></br>
      <input className="memory" type="radio" name="Metric" value="Memory" onClick={e => props.memory()}></input>
      <label value="Memory">Memory</label><br></br>
    </div>
  );
};

export default Header;