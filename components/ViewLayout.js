import HeaderView from './HeaderView.js';


export default function ViewLayout(props) {
  return (
    <div className="layout">
      <header>
        <HeaderView title={props.title} subtitle={props.subTitle} /> 
      </header>
      <div>
        {props.children}
      </div>
    </div>
  );
}
