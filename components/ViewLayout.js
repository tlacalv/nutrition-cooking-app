import HeaderView from './HeaderView.js';


export default function ViewLayout(props) {
  return (
    <div className="layout">
      <header>
        <HeaderView /> 
      </header>
      <div>
        {props.children}
      </div>
    </div>
  );
}
